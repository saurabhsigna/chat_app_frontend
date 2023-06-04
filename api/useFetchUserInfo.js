import axios from "axios";
import { useCookies } from "react-cookie";

const useFetchUserInfo = () => {
  const [cookies] = useCookies(["accessToken", "refreshToken"]);
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URI + "/users",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return { data: response.data, error: null };
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const refreshResponse = await axios.post("/refresh-token", {
            refreshToken,
          });

          const newAccessToken = refreshResponse.data.accessToken;
          document.cookie = `accessToken=${newAccessToken}`; // Update the access token in the cookie

          // Retry the API request with the new access token
          return fetchUserInfo();
        } catch (refreshError) {
          console.error("Failed to refresh access token:", refreshError);
          return { data: null, error: refreshError.message };
        }
      }

      console.error("Failed to fetch user info:", error);
      return { data: null, error: error.message };
    }
  };

  return { fetchUserInfo };
};

export default useFetchUserInfo;

import axios from "axios";
import useReactCookie from "../utils/useReactCookie";

const useFetchUserInfo = () => {
  const { setAccessToken } = useReactCookie();

  const fetchUserInfo = async (retryCount = 0) => {
    const cookies = document.cookie.split(";");
    const accessToken = cookies
      .find((cookie) => cookie.trim().startsWith("accessToken="))
      ?.split("=")[1];
    const refreshToken = cookies
      .find((cookie) => cookie.trim().startsWith("refreshToken="))
      ?.split("=")[1];

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
        if (retryCount < 3) {
          try {
            const refreshResponse = await axios.post(
              process.env.NEXT_PUBLIC_BACKEND_URI + "/refreshtoken",
              {
                hello: refreshToken,
              }
            );

            const newAccessToken = refreshResponse.data.accessToken;
            console.log("giving");
            console.log(refreshResponse.data);
            setAccessToken(newAccessToken);
            return fetchUserInfo(retryCount + 1);
          } catch (refreshError) {
            console.error("Failed to refresh access token:", refreshError);
            return { data: null, error: refreshError.message };
          }
        } else {
          console.error("Maximum retry count exceeded");
          return { data: null, error: "Maximum retry count exceeded" };
        }
      }

      console.error("Failed to fetch user info:", error);
      return { data: null, error: error.message };
    }
  };

  return { fetchUserInfo };
};

export default useFetchUserInfo;

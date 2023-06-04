import axios from "axios";
import useReactCookie from "../utils/useReactCookie";

const useLoginUser = () => {
  const { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } =
    useReactCookie();

  const loginUser = async (email, password) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    try {
      const postData = {
        email,
        password,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/login`,
        postData
      );
      setAccessToken(response.data.message.access_token);
      setRefreshToken(response.data.message.refresh_token);
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Failed to login user:", error);
      return { data: null, error: error.message };
    }
  };

  return { loginUser };
};

export default useLoginUser;

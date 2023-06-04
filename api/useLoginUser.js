import axios from "axios";
import useReactCookie from "../utils/useReactCookie";

const useLoginUser = () => {
  const { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } =
    useReactCookie();

  const loginUser = async (email, password) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URI + "/login",
        {
          data: {
            email,
            password,
          },
        }
      );

      return { data: response.data, error: null };
    } catch (error) {
      console.error("Failed to login user:", error);
      return { data: null, error: error.message };
    }
  };

  return { loginUser };
};

export default useLoginUser;

import { useCookies } from "react-cookie";
import axios from "axios";

const useRegisterUser = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  const registerUser = async (fullName, email, password, imgUri) => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URI + "/register",
        {
          data: {
            fullName,
            email,
            password,
            imgUri,
          },
        }
      );

      return { data: response.data, error: null };
    } catch (error) {
      console.error("Failed to register user:", error);
      return { data: null, error: error.message };
    }
  };

  return { registerUser };
};

export default useRegisterUser;

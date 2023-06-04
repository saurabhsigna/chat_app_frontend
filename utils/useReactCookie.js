"use client";
import { useCookies } from "react-cookie";

const useReactCookie = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  const setAccessToken = (accessToken) => {
    setCookie("accessToken", accessToken, { path: "/" });
  };

  const setRefreshToken = (refreshToken) => {
    setCookie("refreshToken", refreshToken, { path: "/" });
  };

  const getAccessToken = () => cookies.accessToken;
  const getRefreshToken = () => cookies.refreshToken;

  const removeTokens = () => {
    removeCookie("accessToken", { path: "/" });
    removeCookie("refreshToken", { path: "/" });
  };

  return {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    removeTokens,
  };
};

export default useReactCookie;

"use client";
import React, { useEffect } from "react";
import useFetchUserInfo from "../../api/useFetchUserInfo";
export default function App() {
  const { fetchUserInfo } = useFetchUserInfo(); // Call the custom hook

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchUserInfo();
      if (error) {
        console.error("Failed to fetch user info:", error);
        // Handle the error condition
      } else {
        console.log("User Info:", data);
        // Process the user info
      }
    };

    fetchData();
  }, []);

  return <div>hello chats</div>;
}

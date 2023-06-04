"use client";
import React, { useState } from "react";
import useRegisterUser from "../../api/useRegisterUser";

export default function App() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { registerUser } = useRegisterUser(); // Call the custom hook

  const submitRegisterUser = async (e) => {
    e.preventDefault();
    const { data, error } = await registerUser(fullName, email, password); // Call the registerUser function from the custom hook

    // Handle the response
    if (error) {
      console.error("Registration error:", error);
    } else {
      console.log("Registration successful:", data);
    }
  };

  return (
    <div>
      <form onSubmit={submitRegisterUser}>
        <input
          placeholder="full name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

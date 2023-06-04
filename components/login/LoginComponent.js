"use client";
import React, { useState } from "react";
import useLoginUser from "../../api/useLoginUser";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useLoginUser();
  const submitLoginUser = async (e) => {
    e.preventDefault();
    const { data, error } = await loginUser(email, password);
  };
  return (
    <div>
      <form onSubmit={submitLoginUser}>
        <input
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

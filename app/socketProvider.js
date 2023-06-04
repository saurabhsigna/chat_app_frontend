"use client";

import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import socket from "../utils/socket";
export default function App() {
  useEffect(() => {
    if (socket) {
      socket.emit("connected");
      //   socket.on("everyLiveUser", liveUserFunction);
    }

    return () => {
      //   socket.off("everyLiveUser", liveUserFunction);
    };
  }, [socket]);
  return <div>hello</div>;
}

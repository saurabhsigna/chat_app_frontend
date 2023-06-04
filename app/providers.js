"use client";

import React from "react";
import { RecoilRoot } from "recoil";
import SocketProvider from "./socketProvider";


export default function App({ children }) {

  return (
    <RecoilRoot>
      <SocketProvider/>

      {children}
    </RecoilRoot>
  );
}

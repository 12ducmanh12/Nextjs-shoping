"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
interface Props {
  children: ReactNode;
}
function Provider(Props: Props) {
  return <SessionProvider>{Props.children}</SessionProvider>;
}

export default Provider;

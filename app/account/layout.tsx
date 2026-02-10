import { HomeIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";
import AccountNav from "../_components/AccountNav";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode; //type of children
}>) {
  return (
    <div className="text-white/70 pt-25 flex md:flex-row flex-col h-screen">
      <div className="w-full md:w-[20%] bg-white/10">
        <AccountNav/>
        
      </div>
      <div className="w-full md:w-[80%] p-10 text-lg">
        {children}
      </div>
    </div>
  );
}

export default layout;

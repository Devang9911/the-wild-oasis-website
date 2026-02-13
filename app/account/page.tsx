import React from "react";
import type { Metadata } from "next";
import { auth } from "../_lib/auth";

export const metadata: Metadata = {
  title: "Guest area",
};

async function page() {
  const session = await auth()
  return (
    <div>
      <h1 className="text-xl md:text-3xl tracking-widest text-orange-400 font-medium">
        Welcome, {session?.user?.name?.split(" ")[0]}
      </h1>
    </div>
  );
}

export default page;

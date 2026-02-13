import React from "react";
import { title } from "process";
import { Metadata } from "next";
import { auth } from "@/app/_lib/auth";

export const metadata : Metadata = {
    title : "Update profile"
}

async function page() {
  const session = await auth()
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl md:text-3xl tracking-widest text-orange-400 font-medium">
        Guest profile
      </h2>
      <h3 className="text-xl md:text-3xl tracking-widest text-white/70 font-medium">
        FullName : {session?.user?.name}
      </h3>
      <h3 className="text-xl md:text-3xl tracking-widest text-white/70 font-medium">
        Email : {session?.user?.email}
      </h3>
    </div>
  );
}

export default page;

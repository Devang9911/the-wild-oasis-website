import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest area",
};

function page() {
  return (
    <div>
      <h1 className="text-xl md:text-3xl tracking-widest text-orange-400 font-medium">
        Welcome, User
      </h1>
    </div>
  );
}

export default page;

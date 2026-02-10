import React from "react";
import { title } from "process";
import { Metadata } from "next";

export const metadata : Metadata = {
    title : "Update profile"
}

function page() {
  return (
    <div>
      <h2 className="text-xl md:text-3xl tracking-widest text-orange-400 font-medium">
        Update you guest profile
      </h2>
    </div>
  );
}

export default page;

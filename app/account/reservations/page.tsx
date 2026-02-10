import { Metadata } from "next";
import React from "react";

export const metadata : Metadata = {
    title : "Reservations"
}

function page() {
  return (
    <div>
      <h2 className="text-xl md:text-3xl tracking-widest text-orange-400 font-medium">
        Your reservations
      </h2>
    </div>
  );
}

export default page;

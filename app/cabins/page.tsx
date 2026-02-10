import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cabins",
};

function page() {
  return (
    <div className="pt-25 text-white/70">
      <div className="p-10 flex flex-col gap-5">
        <h1 className="text-4xl font-medium text-yellow-600">
          Our Luxury Cabins
        </h1>
        <p className="tracking-wide">
          Cozy yet luxurious cabins, located right in the heart of the Italian
          Dolomites. Imagine waking up to beautiful mountain views, spending
          your days exploring the dark forests around, or just relaxing in your
          private hot tub under the stars. Enjoy nature's beauty in your own
          little home away from home. The perfect spot for a peaceful, calm
          vacation. Welcome to paradise.
        </p>
        
      </div>
    </div>
  );
}

export default page;

import React from "react";
import type { Metadata } from "next";
import about1 from "@/public/about-1.jpg";
import about2 from "@/public/about-2.jpg";
import Image from "next/image";
import Link from "next/link";
import { getCabins } from "../_lib/services";

export const revalidate = 86400

export const metadata: Metadata = {
  title: "About",
};

async function page() {
  const cabin = await getCabins()
  return (
    <div className="text-white/70 pt-25 ">
      <div className="p-10 flex flex-col gap-10 md:gap-15">
        {/* first row */}
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          {/* Information box */}
          <div className="flex flex-col gap-5 max-w-2xl font-medium">
            <h1 className="text-3xl sm:text-5xl  text-yellow-600">
              Welcome to The Wild Oasis
            </h1>

            <p className="md:text-lg">
              Where nature's beauty and comfortable living blend seamlessly.
              Hidden away in the heart of the Italian Dolomites, this is your
              paradise away from home.
            </p>

            <p className="md:text-lg">
              Our {cabin.length} luxury cabins provide a cozy base, but the real freedom and
              peace you'll find in the surrounding mountains.
            </p>

            <p className="md:text-lg">
              This is where memorable moments are made, surrounded by nature's
              splendor. A place to slow down, relax, and reconnect.
            </p>
          </div>

          {/* Photo box */}
          <div className="w-full  lg:max-w-lg">
            <Image
              src={about1}
              alt="About our cabins"
              className="w-full h-auto rounded-lg object-cover shadow-md"
              priority
            />
          </div>
        </div>
        {/* second row */}
        <div className="flex flex-col lg:flex-row-reverse gap-10 items-center justify-center">
          {/* Information box */}
          <div className="flex flex-col gap-5 max-w-2xl font-medium">
            <h1 className="text-3xl sm:text-5xl  text-yellow-600">
              Managed by our family since 1962
            </h1>

            <p className="md:text-lg">
              Since 1962, The Wild Oasis has been a cherished family-run
              retreat. Started by our grandparents, this haven has been nurtured
              with love and care, passing down through our family as a testament
              to our dedication to creating a warm, welcoming environment.
            </p>

            <p className="md:text-lg">
              Over the years, we've maintained the essence of The Wild Oasis,
              blending the timeless beauty of the mountains with the personal
              touch only a family business can offer. Here, you're not just a
              guest; you're part of our extended family. So join us at The Wild
              Oasis soon, where tradition meets tranquility, and every visit is
              like coming home.
            </p>

            <Link href={"/cabins"}>
              <button className="bg-yellow-800 rounded shadow-2xl hover:bg-yellow-700 p-2 md:p-5 text-md md:text-xl text-white/95 cursor-pointer">
                Explore Luxary Cabins
              </button>
            </Link>
          </div>
          {/* Photo box */}
          <div className="w-full  lg:max-w-lg">
            <Image
              src={about2}
              alt="About our cabins"
              className="w-full h-auto rounded-lg object-cover shadow-md"
              priority
            />
          </div>
          
          
        </div>
      </div>
    </div>
  );
}

export default page;

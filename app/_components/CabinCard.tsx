import React from "react";
import { Database } from "../_lib/database.types";
import Link from "next/link";
import { Users } from "lucide-react";
import Image from "next/image";

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

function CabinCard({ cabin }: { cabin: Cabin }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition hover:shadow-xl hover:shadow-black/30 flex">
      {/* Image */}
      <div className="relative h-full w-[40%] overflow-hidden">
        <Image
          src={cabin.image ?? ""}
          alt={"Cabin image"}
          sizes="(max-width: 768px) 100vw, 50vw"
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-white/70">Cabin {cabin.name}</h3>

        <div className="flex items-center gap-2 text-white/70 text-lg">
          <Users size={16} />
          <span>Up to {cabin.max_capacity} guests</span>
        </div>

        <div className="flex items-end justify-between gap-5">
          <p className="text-white/70 text-lg">Price per night</p>
          <p className="text-xl font-bold text-white">₹{cabin.regular_price}</p>
        </div>

        {/* Buttons */}
        <Link
          href={`/cabins/${cabin.id}`}
          className="flex-1 rounded-lg border border-white/20 px-4 py-2 text-center text-sm text-white/80 transition hover:bg-white/10"
        >
          Details & Reservations
        </Link>
      </div>
    </div>
  );
}

export default CabinCard;

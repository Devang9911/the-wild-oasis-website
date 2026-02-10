"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

type Capacity = "all" | "small" | "medium" | "large";

const CAPACITY_LABELS: Record<Capacity, string> = {
  all: "All Cabins",
  small: "2-3 Guests",
  medium: "4-7 Guests",
  large: "8-12 Guests",
};

export default function CabinFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCapacity = (searchParams.get("capacity") || "all") as Capacity;

  const handleClick = (capacity: Capacity) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("capacity", capacity);

    router.replace(`/cabins?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 md:gap-0">
      {(Object.keys(CAPACITY_LABELS) as Capacity[]).map((capacity) => (
        <button
          key={capacity}
          onClick={() => handleClick(capacity)}
          className={`px-5 py-2 font-medium transition
            ${
              currentCapacity === capacity
                ? "bg-yellow-600 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
        >
          {CAPACITY_LABELS[capacity]}
        </button>
      ))}
    </div>
  );
}

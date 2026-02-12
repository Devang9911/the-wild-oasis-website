import React, { Suspense } from "react";
import type { Metadata } from "next";
import CabinsList from "./CabinsList";
import Spinner from "../_components/Spinner";
import CabinFilter from "../_components/CabinFilter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Cabins",
};

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};
type Filter = "all" | "small" | "medium" | "large";

//search param gives promise so we have to resolve first
export default async function page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const filter: Filter =
    typeof resolvedSearchParams?.capacity === "string" &&
    ["all", "small", "medium", "large"].includes(resolvedSearchParams.capacity)
      ? (resolvedSearchParams.capacity as Filter)
      : "all";

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
        <div className="flex items-center justify-end">
          <CabinFilter/>
        </div>
        <Suspense fallback={<Spinner />} key={filter}>
          <CabinsList filter={filter} />
          <ReservationReminder/>
        </Suspense>
      </div>
    </div>
  );
}


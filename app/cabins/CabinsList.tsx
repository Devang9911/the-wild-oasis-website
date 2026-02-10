import { getCabins } from "../_lib/services";
import CabinCard from "../_components/CabinCard";
import { Database } from "../_lib/database.types";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];
type Filter = "all" | "small" | "medium" | "large";

export default async function CabinsList({ filter }: { filter: Filter }) {
  const cabins = await getCabins();

  let displayedCabins: Cabin[] = cabins; // default fallback

  if (filter === "small") {
    displayedCabins = cabins.filter(
      (cabin) => cabin.max_capacity !== null && cabin.max_capacity <= 3,
    );
  } else if (filter === "medium") {
    displayedCabins = cabins.filter(
      (cabin) =>
        cabin.max_capacity !== null &&
        cabin.max_capacity >= 4 &&
        cabin.max_capacity <= 7,
    );
  } else if (filter === "large") {
    displayedCabins = cabins.filter(
      (cabin) => cabin.max_capacity !== null && cabin.max_capacity >= 8,
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {displayedCabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </ul>
  );
}

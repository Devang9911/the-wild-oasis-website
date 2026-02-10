import { getCabins } from "../_lib/services";
import CabinCard from "../_components/CabinCard";

export default async function CabinsList() {
  const cabins = await getCabins();

  return (
    <ul className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </ul>
  );
}

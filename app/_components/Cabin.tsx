import { Suspense } from "react";
import { Database } from "../_lib/database.types";
import { getCabin } from "../_lib/services";
import Reserve from "./Reserve";
import Spinner from "./Spinner";
import CabinPoster from "./CabinPoster";

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

async function Cabin({ cabinId }: { cabinId: string }) {
  
  const cabin: Cabin = await getCabin(Number(cabinId));
  const { name } = cabin;

  return (
    <section className="text-white/70">
      <CabinPoster cabin={cabin} />
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl lg:text-6xl font-black text-accent-100 text-yellow-600 text-center mb-10">
          Reserve {name} today. Pay on arrival
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reserve cabin={cabin} />
        </Suspense>
      </div>
    </section>
  );
}

export default Cabin;

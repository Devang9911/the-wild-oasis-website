import Cabin from "@/app/_components/Cabin";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/services";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{
    cabinId: string;
  }>;
};

//alaways do this generation on page file so that it will gives meta title to pass on
export async function generateMetadata({ params }: PageProps) {
  const { cabinId } = await params;
  const { name } = await getCabin(Number(cabinId));
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({
    cabinId: cabin.id.toString(),
  }));
}

export default async function Page({ params }: PageProps) {
  const { cabinId } = await params;

  return (
    
    <div className="pt-40 px-20">
      <Suspense fallback={<Spinner />}>
        <Cabin cabinId={cabinId} />
      </Suspense>
    </div>
  );
}

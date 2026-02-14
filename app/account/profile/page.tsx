import ProfileInfo from "@/app/_components/ProfileInfo";
import Spinner from "@/app/_components/Spinner";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Update profile",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl md:text-3xl tracking-widest text-orange-400 font-medium">
        Guest profile
      </h2>

      <Suspense fallback={<Spinner />}>
        <ProfileInfo />
      </Suspense>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";

export default function ProfileInfo() {
  const { data: session, status } = useSession();

  return (
    <>
      <h3 className="text-xl md:text-3xl tracking-widest text-white/70 font-medium">
        FullName : {session?.user?.name}
      </h3>
      <h3 className="text-xl md:text-3xl tracking-widest text-white/70 font-medium">
        Email : {session?.user?.email}
      </h3>
    </>
  );
}

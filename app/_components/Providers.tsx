"use client";

import { SessionProvider } from "next-auth/react";
import { ReservationProvider } from "./ReservationContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ReservationProvider>{children}</ReservationProvider>
    </SessionProvider>
  );
}

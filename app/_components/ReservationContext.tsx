"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

type ReservationContextType = {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
};

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const resetRange = ()=> {
    setRange(undefined)
  }

  return (
    <ReservationContext.Provider value={{ range, setRange , resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error("useReservation must be used inside ReservationProvider");
  }

  return context;
}

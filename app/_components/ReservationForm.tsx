"use client";

import { differenceInDays } from "date-fns";
import { Database } from "../_lib/database.types";
import { useReservation } from "./ReservationContext";
import type { Session } from "next-auth";

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

type Prop = {
  cabin: Cabin
  session : Session | null
}

function ReservationForm({ cabin , session }: Prop) {
    const { range, resetRange } = useReservation();
  const { max_capacity, discount, id } = cabin;

  //   const startDate = range.from;
  //   const endDate = range.to;

  //   const numNights = differenceInDays(endDate, startDate);
  //   const cabinPrice = 2500

  //   const bookingData = {
  //     startDate,
  //     endDate,
  //     numNights,
  //     cabinPrice,
  //     cabinId: id,
  //   };

  //   const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="bg-[#0f1c24] lg:w-[30%] w-full">
      <div className="bg-white/20 text-white/70 px-16 py-3 flex justify-center items-center">
        <div className="flex gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={session?.user?.image || ""}
            alt={session?.user?.name || ""}
          />
          <p>{session?.user?.name}</p>
        </div>
      </div>
      {/* <p>{range?.from?.toLocaleDateString()} to {range?.to?.toLocaleDateString()}</p> */}

      <form
        // action={createBookingWithData}
        // action={async (formData) => {
        //   await createBookingWithData(formData);
        //   resetRange();
        // }}
        className="bg-[#0f1c24] py-5 px-5 text-lg flex gap-5 flex-col rounded-xl"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 text-white/70 w-full shadow-sm rounded-sm bg-[#0f1c24] border"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: max_capacity ?? 0 }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm bg-white/10"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;

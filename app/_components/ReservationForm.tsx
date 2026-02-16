"use client";

import { differenceInDays } from "date-fns";
import type { Session } from "next-auth";
import { useTransition } from "react";
import { createBooking } from "../_lib/actions";
import { Database } from "../_lib/database.types";
import { useReservation } from "./ReservationContext";
import { toast } from "react-toastify";

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

type Prop = {
  cabin: Cabin;
  session: Session | null;
};

function ReservationForm({ cabin, session }: Prop) {
  const { range } = useReservation();
  const { max_capacity, discount, regular_price } = cabin;
  const [isPending, startTransition] = useTransition();

  const startDate = range?.from;
  const endDate = range?.to;

  const numNights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const cabinPrice = numNights * ((regular_price ?? 0) - (discount ?? 0));

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await createBooking(formData);

      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res?.message || "Failed");
      }
    });
  }

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

      <form
        action={handleSubmit}
        className="bg-[#0f1c24] py-5 px-5 text-lg flex gap-5 flex-col rounded-xl"
      >
        {/* Hidden fields */}
        <input type="hidden" name="cabinId" value={cabin.id} />
        <input
          type="hidden"
          name="startDate"
          value={startDate?.toISOString()}
        />
        <input type="hidden" name="endDate" value={endDate?.toISOString()} />
        <input type="hidden" name="numNights" value={numNights} />
        <input type="hidden" name="cabinPrice" value={cabinPrice} />

        {/* Guests */}
        <div className="flex flex-col gap-3">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            required
            className="px-5 py-3 text-white/70 w-full shadow-sm rounded-sm bg-[#0f1c24] border"
          >
            <option value="">Select number of guests...</option>
            {Array.from({ length: max_capacity ?? 0 }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ),
            )}
          </select>
        </div>

        {/* Observations */}
        <div className="flex flex-col gap-3">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-white/10 text-white w-full rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        {range ? (
          <button
            disabled={isPending}
            className="bg-yellow-600 p-2 hover:bg-yellow-700 disabled:opacity-50"
          >
            {isPending ? "Booking..." : `Book now for ₹${cabinPrice}`}
          </button>
        ) : (
          <p className="text-primary-300 text-base">Start by selecting dates</p>
        )}
      </form>
    </div>
  );
}

export default ReservationForm;

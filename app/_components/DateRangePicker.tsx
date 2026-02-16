"use client";

import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Database } from "../_lib/database.types";
import { useReservation } from "./ReservationContext";
import { differenceInDays, isPast, isSameDay } from "date-fns";

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];
type Settings = Database["public"]["Tables"]["settings"]["Row"];

type Props = {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
};

export function isAlreadyBooked(
  range: DateRange | undefined,
  datesArr: (string | Date)[],
): boolean {
  if (!range?.from || !range?.to) return false;

  const selectedStart = new Date(range.from);
  const selectedEnd = new Date(range.to);

  return datesArr.some((date) => {
    const bookedDate = new Date(date);

    return bookedDate >= selectedStart && bookedDate <= selectedEnd;
  });
}

export default function DateRangePicker({
  settings,
  bookedDates,
  cabin,
}: Props) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range;
  //cabin
  const { regular_price, discount } = cabin;
  const numNights =
    range?.from && range?.to ? differenceInDays(range.to, range.from) : 0;
  const cabinPrice = numNights * ((regular_price ?? 0) - (discount ?? 0));
  //settings
  const { min_booking_length, max_booking_length } = settings;

  return (
    <div className="bg-[#0f1c24] p-6 lg:w-[30%] w-full text-white space-y-4 flex flex-col items-center">
      <DayPicker
        mode="range"
        numberOfMonths={1}
        min={(min_booking_length ?? 0) + 1}
        max={max_booking_length ?? 0}
        onSelect={setRange}
        selected={displayRange}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
        classNames={{
          months: "flex gap-10",
          month: "space-y-4",
          caption: "flex justify-between items-center font-semibold text-lg",
          head_row: "flex justify-between",
          row: "flex justify-between mt-2",
          cell: "h-10 w-10 text-center",
          day: "h-10 w-10 rounded-full hover:bg-[#c49a63] hover:text-black transition",
          day_selected: "bg-[#c49a63] text-black font-semibold rounded-full",
          day_range_middle: "bg-[#c49a63]/70 text-black",
          day_range_start: "bg-[#c49a63] text-black rounded-l-full",
          day_range_end: "bg-[#c49a63] text-black rounded-r-full",
          day_disabled: "text-gray-500 line-through cursor-not-allowed",
        }}
      />

      <p className="text-sm text-gray-300">
        Stay between{" "}
        <span className="font-semibold">{settings.min_booking_length}</span> and{" "}
        <span className="font-semibold">{settings.max_booking_length}</span>{" "}
        nights
      </p>

      <div className="bg-[#c49a63] text-black p-4 flex justify-between items-center w-full">
        <div className="space-y-1">
          <div className="text-lg font-bold">₹{regular_price} / night</div>
          <div className="text-sm">
            {numNights} nights • TOTAL ₹{cabinPrice}
          </div>
        </div>

        {range && (
          <button
            className="bg-yellow-600 p-3 text-white/70 cursor-pointer border border-black"
            onClick={resetRange}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

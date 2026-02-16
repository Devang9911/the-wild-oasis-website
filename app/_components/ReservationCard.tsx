import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Database } from "../_lib/database.types";
import DeleteReservation from "./DeleteReserve";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

export type BookingWithCabin = Booking & {
  cabins: Cabin;
};

export const formatDistanceFromNow = ({ dateStr }: { dateStr: string }) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking }: { booking: BookingWithCabin }) {
  const {
    id,
    start_date,
    end_date,
    num_nights,
    total_price,
    num_guests,
    created_at,
    cabins: { name, image },
  } = booking;

  const isPastBooking = start_date && isPast(new Date(start_date));

  return (
    <div className="flex flex-col sm:flex-row rounded-xl overflow-hidden border border-primary-800 bg-primary-900/40 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      {image && (
        <div className="relative w-full sm:w-48 h-48 sm:h-auto">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className="object-cover sm:rounded-l-xl"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-semibold">
            {num_nights} nights in Cabin {name}
          </h3>

          <span
            className={`h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm w-fit
              ${
                isPastBooking
                  ? "bg-yellow-800 text-yellow-200"
                  : "bg-green-800 text-green-200"
              }`}
          >
            {isPastBooking ? "Past" : "Upcoming"}
          </span>
        </div>

        <p className="text-sm sm:text-base text-primary-300 mt-2">
          {start_date && format(new Date(start_date), "EEE, MMM dd yyyy")} (
          {start_date && isToday(new Date(start_date))
            ? "Today"
            : start_date && formatDistanceFromNow({ dateStr: start_date })}
          ) &mdash; {end_date && format(new Date(end_date), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-wrap gap-3 mt-4 items-center text-sm sm:text-base">
          <p className="text-lg font-semibold text-accent-400">
            ₹{total_price}
          </p>

          <span className="text-primary-400">&bull;</span>

          <p className="text-primary-300">
            {num_guests} guest{num_guests && num_guests > 1 && "s"}
          </p>

          <p className="ml-0 sm:ml-auto text-xs sm:text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy")}
          </p>
        </div>
      </div>

      {/* Actions */}
      {!isPastBooking && (
        <div className="border flex flex-col justify-around">
          <DeleteReservation bookingId={Number(id)} />
        </div>
      )}
    </div>
  );
}

export default ReservationCard;

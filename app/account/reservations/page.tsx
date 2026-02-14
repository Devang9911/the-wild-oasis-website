import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservations",
};

async function page() {
  const session = await auth();
  const bookings = await getBookings(Number(session?.user?.id));
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl md:text-3xl tracking-widest text-orange-400 font-medium">
        Your reservations
      </h2>
      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}

export default page;

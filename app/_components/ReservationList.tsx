import { Database } from '../_lib/database.types';
import ReservationCard from './ReservationCard';

type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

export type BookingWithCabin = Booking & {
  cabins: Cabin;
};

function ReservationList({bookings} : {bookings : BookingWithCabin[]}) {
  return (
   <ul className="space-y-6">
      {bookings.map((booking)=>(
        <ReservationCard booking={booking} key={booking.id}/>
      ))}
    </ul>

  )
}

export default ReservationList
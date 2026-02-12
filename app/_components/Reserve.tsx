import { auth } from "../_lib/auth";
import { Database } from "../_lib/database.types";
import { getBookedDatesByCabinId, getSettings } from "../_lib/services";
import DateRangePicker from "./DateRangePicker";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

async function Reserve({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(Number(cabin.id)),
  ]);

  const session = await auth();

  return (
    <div className="flex flex-col lg:flex-row mb-10">
      <DateRangePicker
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} session={session} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reserve;

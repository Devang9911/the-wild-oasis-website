"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./services";

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  });
}

export async function deleteReservation(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logges in");

  const guestBookings = await getBookings(Number(session.user?.id));
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error("Delete booking error:", error.message);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

//-------------------------------------create booking
export async function createBooking(formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user) {
      return { success: false, message: "Please login first." };
    }

    const cabinId = Number(formData.get("cabinId"));
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const numNights = Number(formData.get("numNights"));
    const numGuests = Number(formData.get("numGuests"));
    const cabinPrice = Number(formData.get("cabinPrice"));
    const observations = formData.get("observations") as string;

    const { error } = await supabase.from("bookings").insert({
      cabin_id: cabinId,
      guest_id: session.user.id,
      start_date: startDate,
      end_date: endDate,
      num_nights: numNights,
      num_guests: numGuests,
      cabin_price: cabinPrice,
      extra_price: 0,
      total_price: cabinPrice,
      status: "unconfirmed",
      has_breakfast: false,
      is_paid: false,
      observations,
    });

    if (error) {
      return { success: false, message: "Booking failed." };
    }

    revalidatePath("/account");

    return { success: true, message: "Booking created successfully 🎉" };
  } catch (err) {
    return { success: false, message: "Something went wrong." };
  }
}

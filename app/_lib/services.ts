import { supabase } from "./supabase";
import { Database } from "./database.types";
import { notFound } from "next/navigation";
import { eachDayOfInterval } from "date-fns";
import { signIn } from 'next-auth/react';

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];
type Booking = Database["public"]["Tables"]["bookings"]["Row"];
type Settings = Database["public"]["Tables"]["settings"]["Row"];

//---------------------------------------------------------------------------
export async function getCabin(id: number): Promise<Cabin> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) notFound();

  return data;
}

//-------------------------------------------------------------------------
export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("name");

  if (error) {
    if (error) notFound();
  }
  return data as Cabin[];
}

//----------------------------------------------------------------------
export async function getBookedDatesByCabinId(
  cabinId: number
): Promise<Date[]> {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const todayISO = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("start_date, end_date")
    .eq("cabin_id", cabinId)
    .gte("end_date", todayISO)
    .neq("status", "cancelled");

  if (error) {
  console.error("Supabase error:", error);
  throw new Error(error.message);
}


  const bookedDates = data
    ?.map((booking) =>
      eachDayOfInterval({
        start: new Date(booking.start_date),
        end: new Date(booking.end_date),
      })
    )
    .flat() ?? [];

  return bookedDates;
}

//-------------------------------------------------------------------------------
export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error("Settings could not be loaded");
  }

  if (!data) {
    throw new Error("Settings not found");
  }

  return data;
}

//---------------------------------------------------------------------------------
export async function getGuest(email : string){
  const {data } = await supabase
    .from("guests")
    .select("*")
    .eq("email",email)
    .single()

    return data
}

//----------------------------------------------------------------------------
type newGuest = {
  email : string
  name : string
}
export async function createGuest(newGuest : newGuest){
  const {data , error} = await supabase
    .from("guests")
    .insert([newGuest])

  if(error){
    console.log(error)
    throw new Error("Guest could not be created")
  }

  return data
}
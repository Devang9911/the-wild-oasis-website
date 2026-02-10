import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { Database } from "./database.types";

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

export async function getCabin(id: string): Promise<Cabin> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data as Cabin;
}

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("name");

  if (error) {
    throw new Error(error.message);
  }
  return data as Cabin[];
}

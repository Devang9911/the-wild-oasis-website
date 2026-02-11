import { supabase } from "./supabase";
import { Database } from "./database.types";
import { notFound } from "next/navigation";

type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

export async function getCabin(id: number): Promise<Cabin> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) notFound();

  return data;
}

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



import { notFound } from "next/navigation"
import { supabase } from "./client"

export async function getEmpleadoById(id) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) {
    notFound()
  }

  return data
}

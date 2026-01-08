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

export const crearUsuario = async () => {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    console.error("No hay sesión de usuario:", authError);
    return;
  }

  const { data: existingUser, error: selectError } = await supabase
    .from("empleados")
    .select("id")
    .eq("auth_id", user.id)
    .maybeSingle();

  if (selectError) {
    console.error("Error al buscar usuario:", selectError);
    return;
  }

  if (!existingUser) {
    const { data, error: insertError } = await supabase
      .from("empleados")
      .insert({ 
        auth_id: user.id,
        
      })
      .select(); // Agregamos .select() para confirmar la inserción

    if (insertError) {
      console.error("❌ Error de inserción:", insertError.message, insertError.details);
    } else {
      console.log("✅ Usuario creado con éxito:", data);
    }
  } else {
    console.log("ℹ️ Usuario ya existe en la tabla empleados");
  }
}
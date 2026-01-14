export async function getEmpleadoByAuthId(supabase, user_id) {
  
  const { data, error } = await supabase
    .from("test_table")
    .select("*")
    .eq("auth_id", user_id)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getEmpleadoByEmpleadoId(supabase, user_id) {
  
  const { data, error } = await supabase
    .from("empleados")
    .select("*")
    .eq("id", user_id)
    .single();

  if (error || !data) return null;
  return data;
}

export const crearEmpleado = async (supabase, user) => {
  if (!user) return;

  const { data: existing } = await supabase
    .from("test_table")
    .select("id")
    .eq("auth_id", user.id)
    .single();

  if (existing) return;
  
  const { error } = await supabase
    .from("test_table")
    .insert({ 
      auth_id: user.id,
      nombre: user.user_metadata.full_name,
      email: user.email,
    }); 

  if (error) throw new Error("Error al registrar.");
};

export const obtenerEmpleados = async (supabase) => {
  const {data: empleados, error} = await supabase
  .from("empleados")
  .select("*")

  if(error) {
    throw new Error(error.message);
  }

  return empleados
}
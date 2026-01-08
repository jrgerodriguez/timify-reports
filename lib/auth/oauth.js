import { supabase } from "../supabase/client";

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
        redirectTo: "http://localhost:3000/dashboard",
    }
  });

  if (error) throw error;
  return data; // contiene info para redirigir
};
import { supabase } from "../supabase/client";

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
        redirectTo: `https://timify-reports.vercel.app/auth/callback`,
    }
  });

  if (error) throw error;
  return data; 
};
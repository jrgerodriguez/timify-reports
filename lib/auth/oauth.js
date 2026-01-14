import { supabase } from "../supabase/client";

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
        redirectTo: process.env.NODE_ENV === 'production'
        ? "https://timify-reports.vercel.app/auth/callback"
        : "http://localhost:3000/auth/callback",
    }
  });

  if (error) throw error;
  return data; 
};
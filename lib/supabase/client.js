import { createBrowserClient  } from "@supabase/ssr";

// En el componente donde se va a usar se puede importar como supabase

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
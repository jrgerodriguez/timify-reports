import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({ name, value, ...options });
        },
        remove: (name, options) => {
          res.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // 1. ❌ Si no está autenticado y trata de entrar al dashboard
  if (!user && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. 🛡️ Protección de rutas de Admin
  const adminOnlyPaths = ["/dashboard/empleados", "/dashboard/eventos"];
  const isPathAdminOnly = adminOnlyPaths.some((path) => 
    req.nextUrl.pathname.startsWith(path)
  );

  if (user && isPathAdminOnly) {
    // Consultamos el rol en la tabla empleados
    const { data: empleado } = await supabase
      .from("empleados")
      .select("rol")
      .eq("auth_id", user.id) 
      .single();

    // Si no existe el empleado o su rol no es admin, lo rebotamos
    if (!empleado || empleado.rol !== "admin") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard"; // Lo mandamos a la página principal permitida
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
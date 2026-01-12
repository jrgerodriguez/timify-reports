import AttendanceButtons from "@/app/components/tracker/AttendanceButtons";
import ResumenActividades from "@/app/components/tracker/ResumenActividad";
import { createClient } from "@/lib/supabase/server"; 
import { getEmpleadoByAuthId } from "@/lib/supabase/empleados";
import { notFound } from "next/navigation";

export default async function Tracker() {
    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser();
    
    if (!user) {
        redirect("/login");
    }

    const empleado = await getEmpleadoByAuthId(supabase, user.id)

    if (!empleado) {
        notFound()
    }

    const userId = empleado.id

    return (
        <section className="p-6 md:p-10">


                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Tracker
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Click para marcar tu actividad.
                    </p>
                </div>

                <main className="w-full flex-1 flex flex-col items-center justify-center gap-5 px-6">
                    <div className="relative bg-white shadow-xl rounded-2xl p-10 space-y-6 font-sans w-full max-w-lg">
                        <AttendanceButtons userId={userId} />
                    </div>

                    <div className="w-full max-w-4xl mt-6">
                        <ResumenActividades userId={userId} />
                    </div>
                </main>
        </section>
    );
}

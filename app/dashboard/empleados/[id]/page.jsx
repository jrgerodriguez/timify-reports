import {getEmpleadoByEmpleadoId} from "@/lib/supabase/empleados"
import { createClient } from "@/lib/supabase/server"
import ResumenActividades from "../../../components/ResumenActividades"
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

export default async function EmpleadoPage({ params }) {
    const supabase = await createClient()
    const { id } = await params
    const empleado = await getEmpleadoByEmpleadoId(supabase, id)


    return (
        
        <section className="p-6 md:px-10 py-6">

            <div className="flex items-start gap-6 mt-6">

                <Link
                href="/dashboard/empleados"
                className="text-gray-500 hover:text-black mt-1"
                >
                    <ArrowLeftCircle   size={35} strokeWidth={1.5} />
                </Link>


                <div className="mb-8 flex flex-col">
                    <h1 className="text-3xl font-semibold text-gray-800">
                    {empleado.nombre}
                    </h1>
                    <p className="text-gray-500 mt-1">
                    {empleado.email}
                    </p>
                </div>

            </div>

            <div className="w-full max-h-150">
                <ResumenActividades userId={id} />
            </div>
        </section>
    )
}

import EmpleadosTabla from "../../components/EmpleadosTabla"
import { createClient } from "@/lib/supabase/server"
import {obtenerEmpleados} from "@/lib/supabase/empleados"

export const dynamic = 'force-dynamic'

export default async function EmpleadosPage() {

    const supabase = await createClient()
    const empleados = await obtenerEmpleados(supabase)    

    return (

        <section className="p-6 md:p-10">
        <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">
            Empleados
            </h1>
            <p className="text-gray-500 mt-1">
            Listado general de empleados registrados.
            </p>
        </div>


        <EmpleadosTabla empleados={empleados || []} />

        </section>
    )
}
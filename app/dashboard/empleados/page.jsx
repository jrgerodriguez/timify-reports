import EmpleadosTabla from "../../components/EmpleadosTabla"
import { supabase } from '@/lib/supabase/client.js'
export const dynamic = 'force-dynamic'

export default async function EmpleadosPage() {
    const { data: empleados = [], error } = await supabase
        .from('users')
        .select('*')
        .order("nombre", { ascending: true })

    if (error) {
        console.error(error)
    }

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
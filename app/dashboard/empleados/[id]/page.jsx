import { getEmpleadoById } from "@/lib/supabase/empleados"
import ResumenActividades from "../../../components/ResumenActividades"

export default async function EmpleadoPage({ params }) {
    const { id } = await params
    const empleado = await getEmpleadoById(id)

    return (
        <section className="p-6 md:px-10 py-6">
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-gray-800">
                {empleado.nombre} {empleado.apellido}
                </h1>
                <p className="text-gray-500 mt-1">
                {empleado.email}
                </p>
            </div>

            <div className="w-full mt-6 max-h-150">
                <ResumenActividades userId={id} />
            </div>
        </section>
    )
}

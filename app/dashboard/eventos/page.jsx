import ResumenActividades from "../../components/EventosTabla"

export default async function EventosPage() {
    // const { data: empleados, error } = await supabase
    //     .from('users')
    //     .select('*')
    //     .order("nombre", { ascending: true })

    // if (error) {
    //     console.error(error)
    //     return <pre>Error: {error.message}</pre>
    // }

    return (

        <section className="p-6 md:p-10">
        <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">
            Eventos
            </h1>
            <p className="text-gray-500 mt-1">
            Listado de eventos por día.
            </p>
        </div>

        <ResumenActividades/>
        </section>
    )
}
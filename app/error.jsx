"use client"

export default function DashboardError({ error, reset }) {
  console.error(error)

  return (
    <section className="p-6 md:p-10 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">
        Algo salió mal.
      </h2>

      <p className="text-gray-500 mt-2">
        Hubo un problema al cargar la información.
        Por favor intenta nuevamente.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition font-semibold"
      >
        Reintentar
      </button>
    </section>
  )
}

export default function NotFoundEmpleado() {
  return (
    <section className="p-6 md:p-10 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">
        Empleado no encontrado
      </h2>
      <p className="text-gray-500 mt-2">
        El empleado que buscas no existe o fue eliminado.
      </p>
    </section>
  )
}

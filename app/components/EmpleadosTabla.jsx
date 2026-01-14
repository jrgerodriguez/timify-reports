'use client'

import Link from "next/link"
import { FiChevronRight  } from 'react-icons/fi'
import { useState, useEffect, useMemo } from "react"

export default function EmpleadosTabla({empleados}) {
    const [search, setSearch] = useState("");
    
    const filtered = useMemo(() => {
        const safeEmpleados = Array.isArray(empleados) ? empleados : [];
        const term = search.toLowerCase().trim();

        const result = term 
        ? safeEmpleados.filter(e => {
            const fullName = `${e.nombre ?? ""}`.toLowerCase()
            const email = `${e.email ?? ""}`.toLowerCase()
            return fullName.includes(term) || email.includes(term)
        })
        : safeEmpleados;

        return [...result].sort((a, b) => (a.nombre ?? "").localeCompare(b.nombre ?? ""))
    }, [search, empleados])

     return (
        <>

        <input
          type="text"
          placeholder="Buscar empleados..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white"
        />

        <div className="bg-white rounded-md border border-gray-300">
            <div className="max-h-150 overflow-y-auto">
                <ul className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                    <li className="px-6 py-6 text-center text-gray-500">
                    No se encontró ningún empleado.
                    </li>
                ) : (
                    [...filtered]
                    .sort((a, b) =>
                        a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase())
                    )
                    .map(e => (
                        <li key={e.id}>
                        <Link
                            href={`/dashboard/empleados/${e.id}`}
                            className="flex items-center justify-between px-6 py-4
                                    hover:bg-gray-50 transition"
                        >
                            <span className="text-gray-800 font-medium">
                            {e.nombre}
                            </span>

                            <span className="text-gray-500 text-sm">
                            {e.email}
                            </span>

                            <span className="text-sm text-gray-400">
                            <FiChevronRight size={18} />
                            </span>
                        </Link>
                        </li>
                    ))
                )}
                </ul>
            </div>
        </div>
        </>
     )
}
'use client'
import { FiHome, FiUsers, FiCalendar, FiLogOut, FiClock } from 'react-icons/fi'
import Link from "next/link"

export default function Sidebar() {

  const links = [
    {
      href: '/dashboard',
      label: 'Home',
      icon: FiHome
    },
    {
      href: '/dashboard/tracker',
      label: 'Tracker',
      icon: FiClock
    },
    {
      href: '/dashboard/empleados',
      label: 'Empleados',
      icon: FiUsers
    },
    {
      href: '/dashboard/eventos',
      label: 'Eventos',
      icon: FiCalendar
    },
  ]
  
    return (
      <aside className="w-64 bg-gray-900/95 backdrop-blur-sm text-white p-4 font-sans flex flex-col gap-10">

        <h2 className="text-2xl font-semibold tracking-wide">
          Dashboard
        </h2>

        <nav className="flex flex-col gap-2 font-medium">
          {links.map(({href, label, icon: Icon}) => (
            <Link
              key={label}
              href={href}
              className="
                text-md font-medium
                px-3 py-2
                rounded
                text-gray-300
                hover:text-white
                hover:bg-gray-800
                transition-colors
                flex items-center gap-3
              "
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <button
          className="
          border-t border-gray-700
            mt-auto
            flex items-center gap-3
            px-3 py-2
            rounded
            text-gray-400
            hover:text-red-400
            hover:bg-gray-800
            transition-colors
          "
        >
          
          <span className="text-md font-medium">
            Cerrar sesión
          </span>
          <FiLogOut size={18} />
        </button>

      </aside>
    )
}
'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { FiHome, FiUsers, FiCalendar, FiLogOut, FiClock } from 'react-icons/fi'
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const router = useRouter()
  const [rol, setRol] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data, error } = await supabase
          .from('empleados')
          .select('rol')
          .eq('auth_id', user.id) 
          .single()

        if (data) {
          setRol(data.rol)
        }
      }
      setLoading(false)
    }

    fetchUserRole()
  }, [])

const links = [
    {
      href: '/dashboard',
      label: 'Home',
      icon: FiHome,
      roles: ['admin', 'user']
    },
    {
      href: '/dashboard/tracker',
      label: 'Tracker',
      icon: FiClock,
      roles: ['admin', 'user']
    },
    {
      href: '/dashboard/empleados',
      label: 'Empleados',
      icon: FiUsers,
      roles: ['admin']
    },
    {
      href: '/dashboard/eventos',
      label: 'Eventos',
      icon: FiCalendar,
      roles: ['admin']
    },
  ]

  // Si está cargando, puedes mostrar un esqueleto o nada
  if (loading) return <aside className="w-64 bg-gray-900/95 p-4" />

  // Filtramos los links: si el rol es 'admin', ve todo. Si no, solo los de 'user'
  const filteredLinks = links.filter(link => link.roles.includes(rol))

  return (
    <aside className="w-64 bg-gray-900/95 backdrop-blur-sm text-white p-4 font-sans flex flex-col gap-10">
      <h2 className="text-2xl font-semibold tracking-wide">
        Dashboard
      </h2>

      <nav className="flex flex-col gap-2 font-medium">
        {filteredLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="text-md font-medium px-3 py-2 rounded text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center gap-3"
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <button
        className="border-t border-gray-700 mt-auto flex items-center gap-3 px-3 py-2 rounded text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
      >
        <span className="text-md font-medium">Cerrar sesión</span>
        <FiLogOut size={18} />
      </button>
    </aside>
  )
}
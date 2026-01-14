'use client'

import { supabase } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { crearEmpleado } from "@/lib/supabase/empleados"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const init = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
        await crearEmpleado(supabase, user)
      } else {
        router.push("/login")
      }

    } catch (err) {
      setError(err?.message ?? "Error inesperado.")
    } finally {
      setLoading(false)
    }
  }

  init()
}, [router])

    if (loading) {
      return <p className="text-center mt-10 text-gray-500">Loading...</p>
    }

    if (error) {
      return <p className="text-center mt-10 text-red-500">{error}</p>
    }

  return (
    <div className="flex flex-col items-center justify-center mt-10 space-y-4 bg-white p-6 rounded-xl shadow-md max-w-sm mx-auto">
      {user.user_metadata.avatar_url && (
        <Image
          src={user.user_metadata.avatar_url}
          width={150}
          height={150}
          alt="User Avatar"
          className="rounded-full border-4 border-indigo-500"
        />
      )}
      <h2 className="text-lg text-indigo-600 font-medium">¡Bienvenido!</h2>
      <h1 className="text-xl font-semibold text-gray-800">{user.user_metadata.full_name}</h1>
    </div>
  )
}
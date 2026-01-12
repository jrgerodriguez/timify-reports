'use client'

import { supabase } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { crearEmpleado } from "@/lib/supabase/empleados"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      console.log(user)
      if (user) {
        setUser(user)
        try {
          await crearEmpleado(supabase, user)
        } catch (error) {
          console.error("Error al sincronizar empleado:", error.message)
        } 
      } else {
          router.push("/login")
        }
    }

    init()
  }, [router])

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading...</p>

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

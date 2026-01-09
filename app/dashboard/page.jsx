'use client'

import { supabase } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { crearEmpleado } from "@/lib/supabase/empleados"
import Image from 'next/image'

export default function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // console.log(user)
        setUser(user)
        await crearEmpleado(user)
      }
    }

    init()
  }, [])

  if (!user) return <p>Loading...</p>

  return (
    <div>
      <p>Name: {user.user_metadata.full_name}</p>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>

      {user.user_metadata.avatar_url && (
        <Image
          src={user.user_metadata.avatar_url}
          width={150}
          height={150}
          alt="User Avatar"
        />
      )}
    </div>
  )
}

'use client'

import { supabase } from "supabase"
import {useEffect, useState} from "react"

export default function Home() {
  
const [ info, setInfo ]=useState([])

useEffect(()=>{
    const fetchData = async ()=>{
    const { data } = await supabase
    .from("test_table")
    .select("*")

    setInfo(data)
    }
    fetchData()
  }, []
)

return(
  <pre>
  {
    JSON.stringify(info,null,2)
  }
  </pre>
)
}
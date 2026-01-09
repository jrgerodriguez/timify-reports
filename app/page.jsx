'use client' //Indica que el componente es un Client Component. Es decir que se ejecuta del lado del cliente, no en el servidor.

import { supabase } from "supabase" //Se importa la instancia del cliente de Supabase
import {useEffect, useState} from "react" //Importa las herramientas básicas de React para manejar el estado y los efectos secundarios (como llamadas a APIs).

export default function Home() {
  
  //Se crea una variable llamada info donde se guardarán los datos traidos de la base de datos.
const [ info, setInfo ]=useState([])

useEffect(()=>{
    const fetchData = async ()=>{
<<<<<<< Updated upstream
    const { data, error } = await supabase
    .from("test_table") //Se selecciona la tabla de la cual se extraerán los datos.
=======
    const { data } = await supabase
    .from("empleados") //Se selecciona la tabla de la cual se extraerán los datos.
>>>>>>> Stashed changes
    .select("*") //Llama a todos los elementos de la tabla.

    if (error) {
      console.error("Error fetching data:", error)
      setInfo([]) // Opcional: puedes dejar info vacío si hay error
    } else {
      setInfo(data)
    }
  }
  
    fetchData()
  }, []
)

return(
  //pre: Etiqueta HTML que mantiene el formato del texto (espacios y saltos de línea). Es ideal para mostrar código o datos JSON.
  <pre>
  {
    JSON.stringify(info,null,2) //Convierte el objeto "info" en una cadena de texto.
  }
  </pre>
)
}
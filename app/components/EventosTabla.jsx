"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { LogIn, LogOut, Hamburger, Coffee, RefreshCw } from "lucide-react";

export default function ResumenActividades() {


 const today = new Date().toISOString().split("T")[0];


  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState("");

  /* ================= HELPERS ================= */

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (isoString) => {
    if (!isoString) return "Pendiente";

    let clean = isoString
      .replace("+00:00", "")
      .replace("Z", "")
      .split(".")[0];

    if (clean.includes("T")) {
      clean = clean.split("T")[1];
    }

    const [hour, minute, second] = clean.split(":");
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    if (h === 0) h = 12;

    return `${h}:${minute}:${second} ${ampm}`;
  };

    const getEventLabel = (type) => {
    switch (type) {
        case "clock_in":
        return "Entrada";
        case "clock_out":
        return "Salida";
        case "lunch_in":
        return "Lunch Iniciado";
        case "lunch_out":
        return "Lunch Terminado";
        case "break_in":
        return "Break Iniciado";
        case "break_out":
        return "Break Terminado";
        default:
        return type;
    }
    };

  const getIcon = (type) => {
    switch (type) {
      case "Entrada":
        return <LogIn className="w-4 h-4 text-green-600" />;
      case "Salida":
        return <LogOut className="w-4 h-4 text-red-600" />;
      case "Lunch Iniciado":
      case "Lunch Terminado":
        return <Hamburger className="w-4 h-4 text-yellow-600" />;
      case "Break Iniciado":
      case "Break Terminado":
        return <Coffee className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case "Entrada":
        return "bg-green-100";
      case "Salida":
        return "bg-red-100";
      case "Lunch Iniciado":
      case "Lunch Terminado":
        return "bg-yellow-100";
      case "Break Iniciado":
      case "Break Terminado":
        return "bg-blue-100";
      default:
        return "bg-gray-100";
    }
  };

  /* ================= DATA ================= */

  const fetchActivities = async () => {
    setLoading(true);

    let query = supabase
      .from("attendance_events")
      .select(`*,
        users(*)`
      )
      .order("event_time", { ascending: false });

    if (fromDate) {
      query = query.gte("date", fromDate);
    }

    if (toDate) {
      query = query.lte("date", toDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const events = data.map((act) => {
        const user = act.users;
        
        return {
        id: act.id,
        time: act.event_time,
        date: act.date,
        type: getEventLabel(act.event_type),
        empleado: user 
        ? `${act.users.nombre} ${act.users.apellido}`
        : "Usuario desconocido"
        }
    })

    setActivities(events);
    setLoading(false);
  };

  useEffect(() => {
    fetchActivities();
  }, [fromDate, toDate]);

  /* ================= UI ================= */

  return (
    <div className="bg-white p-6 rounded-md w-full border border-gray-300">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={fetchActivities}
          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm transition"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="flex flex-wrap items-end gap-4 mb-5">
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-500 mb-1">
            Desde
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="
              h-10
              px-3
              rounded-md
              border border-gray-300
              bg-gray-50
              text-sm
              text-gray-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
            "
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-500 mb-1">
            Hasta
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="
              h-10
              px-3
              rounded-md
              border border-gray-300
              bg-gray-50
              text-sm
              text-gray-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
            "
          />
        </div>

        <button
          onClick={() => {
            setFromDate(today);
            setToDate("");
          }}
          className="h-10 px-4 rounded-md bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 transition"
        >
          Hoy
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400 text-center text-sm">
          Cargando actividades...
        </p>
      ) : activities.length === 0 ? (
        <p className="text-gray-400 text-center text-sm">
          No hay eventos registrados.
        </p>
      ) : (
        <div className="overflow-y-auto max-h-[500px]">
          <table className="min-w-full text-sm text-gray-700 border-collapse">
            <thead className="sticky top-0 bg-gray-50">
              <tr className="text-left">
                <th className="px-4 py-2">Empleado</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Evento</th>
                <th className="px-4 py-2">Hora</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {activities.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition">

                  <td className="px-4 py-2 font-medium">
                    {event.empleado}
                  </td>

                  <td className="px-4 py-2 text-gray-600">
                    {formatDate(event.date)}
                  </td>

                  <td className="px-4 py-2 flex items-center gap-2">
                    <div
                      className={`w-6 h-6 flex items-center justify-center ${getIconBg(
                        event.type
                      )} rounded-md`}
                    >
                      {getIcon(event.type)}
                    </div>
                    <span>{event.type}</span>
                  </td>

                  <td className="px-4 py-2 text-gray-500">
                    {formatTime(event.time)}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

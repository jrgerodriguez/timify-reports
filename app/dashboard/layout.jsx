import Sidebar from "../components/Sidebar"

export default async function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      
      <Sidebar />      

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>

    </div>
  )
}

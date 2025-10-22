import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-sidebar text-foreground overflow-hidden">      
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="my-2 mr-2 flex flex-1 flex-col rounded-2xl bg-card shadow-sm border border-border overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 bg-background">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}




import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLocation } from "react-router-dom"

export default function Header() {
  const location = useLocation()
  const user = { name: "Prajwal Baluni", role: "owner" }

  const getTitle = () => {
    if (location.pathname.includes("properties")) return "My Properties"
    if (location.pathname.includes("events")) return "My Events"
    if (location.pathname.includes("managers")) return "Managers"
    if (location.pathname.includes("bookings")) return "Bookings"
    if (location.pathname.includes("settings")) return "Settings"
    return "Dashboard Overview"
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background border-b border-border">
      <h1 className="text-lg font-semibold tracking-tight text-foreground">
        {getTitle()}
      </h1>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="hover:bg-muted">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </Button>

        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center font-medium text-primary">
            {user.name[0]}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-foreground">
              {user.name}
            </span>
            <span className="text-xs text-muted-foreground capitalize">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

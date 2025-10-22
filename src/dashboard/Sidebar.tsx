import { NavLink } from "react-router-dom"
import {
  Home,
  Building,
  Users,
  CalendarDays,
  Settings,
  LogOut,
  CalendarCheck,
  Banknote,
} from "lucide-react"

export default function Sidebar() {
  const role:string = "owner"

  
  const sections =
    role === "agency"
      ? [
          {
            title: "Management",
            links: [
              { label: "Browse Properties", to: "/dashboard/browse", icon: Building },
              { label: "Event Requests", to: "/dashboard/event-requests", icon: CalendarCheck },
              { label: "My Properties", to: "/dashboard/properties", icon: Building },
            ],
          },
          {
            title: "Finance",
            links: [{ label: "Earnings", to: "/dashboard/earnings", icon: Banknote }],
          },
          {
            title: "Settings",
            links: [{ label: "Settings", to: "/dashboard/settings", icon: Settings }],
          },
        ]
      : [
          {
            title: "Main",
            links: [{ label: "Dashboard", to: "/dashboard/owner", icon: Home }],
          },
          {
            title: "Management",
            links: [
              { label: "My Properties", to: "/dashboard/properties", icon: Building },
              { label: "My Events", to: "/dashboard/events", icon: CalendarCheck },
              { label: "Managers", to: "/dashboard/managers", icon: Users },
            ],
          },
          {
            title: "Operations",
            links: [
              { label: "Bookings", to: "/dashboard/bookings", icon: CalendarDays },
              { label: "Settings", to: "/dashboard/settings", icon: Settings },
            ],
          },
        ]

  return (
    <aside className="w-72 h-screen bg-sidebar text-sidebar-foreground p-5 flex flex-col justify-between">
      {/* Brand */}
      <div>
        <h1 className="text-2xl font-bold text-sidebar-primary mb-8 tracking-tight">Eventify</h1>

        {/* Navigation */}
        <nav className="space-y-7">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="text-sm font-semibold text-sidebar-accent-foreground/70 mb-2 px-3 tracking-wide">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.links
                  .filter((link) => !(role === "manager" && link.label === "Managers"))
                  .map(({ label, to, icon: Icon }) => (
                    <NavLink
                      key={label}
                      to={to}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-sidebar-primary"
                            : "text-sidebar-accent-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
                              isActive
                                ? "bg-sidebar-primary/10 text-sidebar-primary"
                                : "text-sidebar-accent-foreground group-hover:text-sidebar-foreground"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="truncate">{label}</span>
                        </>
                      )}
                    </NavLink>
                  ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="pt-6 text-xs text-sidebar-accent-foreground/70 flex items-center justify-between border-t border-sidebar-border">
        <span>
          Logged in as{" "}
          <span className="font-medium capitalize text-sidebar-foreground">{role}</span>
        </span>
        <button className="flex items-center gap-1 text-sidebar-accent-foreground/70 hover:text-sidebar-foreground transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}


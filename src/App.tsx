import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "@/dashboard/DashboardLayout"
import OwnerDashboard from "@/dashboard/owner/OwnerDashboard"
import OwnerProperties from "@/dashboard/owner/OwnerProperties"
import OwnerEvents from "@/dashboard/shared/Events"
import OwnerManagers from "@/dashboard/owner/OwnerManagers"
import Bookings from "@/dashboard/shared/Bookings"
import { Toaster } from "@/components/ui/sonner"
import ManagerDashboard from "./dashboard/manager/ManagerDashboard"
import ManagerProperties from "./dashboard/manager/ManagerProperties"
import BrowseProperties from "./dashboard/agency/BrowseProperties"
import MyProperties from "./dashboard/agency/MyProperties"
import Earnings from "./dashboard/agency/Earnings"
import EventRequest from "./dashboard/agency/EventRequest"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/owner" replace />} />
        <Route path="/dashboard"  element={<DashboardLayout />}>
          <Route path="owner" element={<OwnerDashboard />} />
          <Route path="properties" element={<OwnerProperties />} />
          <Route path="events" element={<OwnerEvents />} />
          <Route path="managers" element={<OwnerManagers />}/>
          
          <Route path="manager" element={<ManagerDashboard/>}/>
          <Route path="manager/properties" element={<ManagerProperties/>}/>
          <Route path="bookings" element={<Bookings />}/>

          <Route path="agency" element={<BrowseProperties/>}/>
          <Route path="agency/properties" element={<MyProperties/>}/>
          <Route path="agency/event-requests" element={<EventRequest/>}/>
          <Route path="agency/earnings" element={<Earnings/>}/>

        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}


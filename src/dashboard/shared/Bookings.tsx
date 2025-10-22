import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CalendarDays,
  MoreHorizontal,
  Clock,
  Trash2,
  Eye,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// import { useGetMyBookings } from "@/hooks/useBookings"

interface User {
  name: string
  email: string
  phone: string
}

interface EventBooking {
  _id: string
  user: User
  type: "event"
  event: { title: string; date: string }
  guests: number
  totalAmount: number
  paymentStatus: "pending" | "paid"
  status: "approved" | "pending" | "rejected"
  createdAt: string
}

interface PropertyBooking {
  _id: string
  user: User
  type: "property"
  property: { title: string; city: string }
  startDate: string
  endDate: string
  totalAmount: number
  paymentStatus: "pending" | "paid"
  status: "approved" | "pending" | "rejected"
  createdAt: string
}

type Booking = EventBooking | PropertyBooking

export default function OwnerBookings() {
  const [search, setSearch] = useState("")

  // const { data, isLoading, error } = useGetMyBookings()
  // if (isLoading) return <p>Loading...</p>
  // if (error) return <p className="text-red-500">Failed to load bookings.</p>
  // const bookings: Booking[] = Array.isArray(data) ? data : data?.bookings || []

  const bookings: Booking[] = [
    {
      _id: "1",
      type: "event",
      user: { name: "John Doe", email: "john@example.com", phone: "1234567890" },
      event: { title: "Music Festival", date: "2025-11-10" },
      guests: 150,
      totalAmount: 60000,
      paymentStatus: "paid",
      status: "approved",
      createdAt: "2025-10-15",
    },
    {
      _id: "2",
      type: "property",
      user: { name: "Alice Smith", email: "alice@example.com", phone: "0987654321" },
      property: { title: "Ocean View Villa", city: "Goa" },
      startDate: "2025-12-01",
      endDate: "2025-12-07",
      totalAmount: 85000,
      paymentStatus: "pending",
      status: "pending",
      createdAt: "2025-10-18",
    },
    {
      _id: "3",
      type: "event",
      user: { name: "John Doe", email: "john@example.com", phone: "1234567890" },
      event: { title: "Music Festival", date: "2025-11-10" },
      guests: 150,
      totalAmount: 60000,
      paymentStatus: "paid",
      status: "approved",
      createdAt: "2025-10-15",
    },
    {
      _id: "4",
      type: "event",
      user: { name: "John Doe", email: "john@example.com", phone: "1234567890" },
      event: { title: "Music Festival", date: "2025-11-10" },
      guests: 150,
      totalAmount: 60000,
      paymentStatus: "paid",
      status: "approved",
      createdAt: "2025-10-15",
    },
    {
      _id: "5",
      type: "event",
      user: { name: "John Doe", email: "john@example.com", phone: "1234567890" },
      event: { title: "Music Festival", date: "2025-11-10" },
      guests: 150,
      totalAmount: 60000,
      paymentStatus: "paid",
      status: "approved",
      createdAt: "2025-10-15",
    },
    {
      _id: "6",
      type: "property",
      user: { name: "Alice Smith", email: "alice@example.com", phone: "0987654321" },
      property: { title: "Ocean View Villa", city: "Goa" },
      startDate: "2025-12-01",
      endDate: "2025-12-07",
      totalAmount: 85000,
      paymentStatus: "pending",
      status: "pending",
      createdAt: "2025-10-18",
    },
    {
      _id: "7",
      type: "property",
      user: { name: "Alice Smith", email: "alice@example.com", phone: "0987654321" },
      property: { title: "Ocean View Villa", city: "Goa" },
      startDate: "2025-12-01",
      endDate: "2025-12-07",
      totalAmount: 85000,
      paymentStatus: "pending",
      status: "pending",
      createdAt: "2025-10-18",
    },
    {
      _id: "8",
      type: "property",
      user: { name: "Alice Smith", email: "alice@example.com", phone: "0987654321" },
      property: { title: "Ocean View Villa", city: "Goa" },
      startDate: "2025-12-01",
      endDate: "2025-12-07",
      totalAmount: 85000,
      paymentStatus: "pending",
      status: "pending",
      createdAt: "2025-10-18",
    },
  ]

  const filteredBookings = bookings.filter((b) => {
    const q = search.toLowerCase()
    const matchUser = b.user.name.toLowerCase().includes(q)
    const matchEvent = b.type === "event" && b.event.title.toLowerCase().includes(q)
    const matchProperty = b.type === "property" && b.property.title.toLowerCase().includes(q)
    return matchUser || matchEvent || matchProperty
  })

  const statusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "approved":
        return <Badge variant="secondary">Approved</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const paymentBadge = (status: Booking["paymentStatus"]) => {
    switch (status) {
      case "paid":
        return <Badge variant="secondary">Paid</Badge>
      case "pending":
        return <Badge variant="outline">Unpaid</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search bookings..."
          className="w-full max-w-md bg-background border-border shadow-sm focus-visible:ring-1 focus-visible:ring-ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-xl border border-border/60 overflow-hidden bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-t from-primary/5 to-card text-muted-foreground">
              <TableHead className="font-semibold text-foreground">Type</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date / Duration</TableHead>
              <TableHead>Guests</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredBookings.map((b) => (
              <TableRow key={b._id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="capitalize font-medium">{b.type}</TableCell>
                <TableCell>{b.type === "event" ? b.event.title : b.property.title}</TableCell>
                <TableCell className="flex flex-col">
                  <span className="font-medium">{b.user.name}</span>
                  <span className="text-xs text-muted-foreground">{b.user.email}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {b.type === "event" ? (
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {new Date(b.event.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(b.startDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}{" "}
                      -{" "}
                      {new Date(b.endDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {b.type === "event" ? b.guests : "-"}
                </TableCell>
                <TableCell className="font-semibold">₹{b.totalAmount.toLocaleString()}</TableCell>
                <TableCell>{statusBadge(b.status)}</TableCell>
                <TableCell>{paymentBadge(b.paymentStatus)}</TableCell>
                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Eye className="w-4 h-4" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 text-destructive">
                        <Trash2 className="w-4 h-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {filteredBookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}




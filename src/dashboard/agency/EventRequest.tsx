import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// 📦 Mock event booking data
const mockEventBookings = [
  {
    _id: "1",
    event: { title: "Corporate Leadership Summit", date: "2025-11-02" },
    user: { name: "Riya Sharma" },
    status: "pending",
    paymentStatus: "paid",
    totalAmount: 18000,
  },
  {
    _id: "2",
    event: { title: "Luxury Wedding Expo", date: "2025-11-15" },
    user: { name: "Arjun Mehta" },
    status: "approved",
    paymentStatus: "pending",
    totalAmount: 25000,
  },
  {
    _id: "3",
    event: { title: "Startup Mixer Night", date: "2025-12-01" },
    user: { name: "Sneha Verma" },
    status: "rejected",
    paymentStatus: "refunded",
    totalAmount: 12000,
  },
]

export default function EventRequest() {
  const handleAction = (id: string, status: "Approved" | "Rejected") => {
    console.log(`Booking ${id} marked as ${status}`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Event Booking Requests</h1>
      </div>

      <Card className="border border-border bg-gradient-to-b from-background to-muted shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground tracking-tight">
            Recent Event Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {mockEventBookings.map((b) => (
                <TableRow key={b._id}>
                  <TableCell>{b.event.title}</TableCell>
                  <TableCell>{b.user.name}</TableCell>
                  <TableCell>
                    {new Date(b.event.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="capitalize">{b.status}</TableCell>
                  <TableCell className="capitalize">{b.paymentStatus}</TableCell>
                  <TableCell>₹{b.totalAmount.toLocaleString()}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(b._id, "Approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(b._id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {mockEventBookings.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-6"
                  >
                    No event booking requests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

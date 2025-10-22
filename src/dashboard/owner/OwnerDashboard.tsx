import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Banknote, Building2, CalendarDays, Users } from "lucide-react"

// import { useGetMyBookings, useUpdateBookingStatus } from "@/hooks/useBookings"
import { useState } from "react"
import { OwnerChart } from "./OwnerChart"

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState<"property" | "event">("property");
  // const {data: bookings,isLoading,error} = useGetMyBookings(activeTab);

  // const updateBookingStatus = useUpdateBookingStatus()
  const handleAction = (bookingId: string, status: "Approved" | "Rejected") => {
    // updateBookingStatus.mutate({ bookingId, status });
    console.log(`Booking ${bookingId} marked as ${status}`)
  };

  const stats = [
    {
      key: "totalRevenue",
      title: "Total Revenue",
      value: 20000,
      desc: "Earnings from bookings",
      subtext: "Combined property and event income",
      icon: <Banknote className="h-6 w-6 text-muted-foreground" />,
    },
    {
      key: "totalBookings",
      title: "Total Bookings",
      value: 123,
      desc: "Confirmed reservations",
      subtext: "Across all properties and events",
      icon: <CalendarDays className="h-6 w-6 text-muted-foreground" />,
    },
    {
      key: "totalProperties",
      title: "Total Properties",
      value: 10,
      desc: "Managed listings",
      subtext: "Active and verified properties",
      icon: <Building2 className="h-6 w-6 text-muted-foreground" />,
    },
    {
      key: "managers",
      title: "Managers",
      value: 6,
      desc: "Team leads",
      subtext: "Supervising operations daily",
      icon: <Users className="h-6 w-6 text-muted-foreground" />,
    },
  ]

  const mockBookings = [
    {
      _id: "1",
      type: "property",
      property: { title: "Seaside Villa", city: "Goa" },
      user: { name: "John Doe" },
      startDate: "2025-12-01",
      endDate: "2025-12-07",
      totalAmount: 85000,
      paymentStatus: "paid",
      status: "Approved",
    },
    {
      _id: "2",
      type: "event",
      event: { title: "Sunset Beach Party", date: "2025-12-05" },
      user: { name: "Alice Smith" },
      totalAmount: 2500,
      paymentStatus: "pending",
      status: "Pending",
    },
    {
      _id: "3",
      type: "property",
      property: { title: "Mountain View Cabin", city: "Manali" },
      user: { name: "Robert Johnson" },
      startDate: "2026-01-10",
      endDate: "2026-01-14",
      totalAmount: 45000,
      paymentStatus: "paid",
      status: "Pending",
    },
    {
      _id: "4",
      type: "event",
      event: { title: "Winter Wine Festival", date: "2025-12-20" },
      user: { name: "Priya Sharma" },
      totalAmount: 4000,
      paymentStatus: "paid",
      status: "Approved",
    },
    {
      _id: "5",
      type: "event",
      event: { title: "Winter Wine Festival", date: "2025-12-20" },
      user: { name: "Priya Sharma" },
      totalAmount: 4000,
      paymentStatus: "paid",
      status: "Approved",
    },
    {
      _id: "6",
      type: "event",
      event: { title: "Winter Wine Festival", date: "2025-12-20" },
      user: { name: "Priya Sharma" },
      totalAmount: 4000,
      paymentStatus: "paid",
      status: "Approved",
    },
    {
      _id: "7",
      type: "event",
      event: { title: "Winter Wine Festival", date: "2025-12-20" },
      user: { name: "Priya Sharma" },
      totalAmount: 4000,
      paymentStatus: "paid",
      status: "Approved",
    },
    {
      _id: "8",
      type: "event",
      event: { title: "Winter Wine Festival", date: "2025-12-20" },
      user: { name: "Priya Sharma" },
      totalAmount: 4000,
      paymentStatus: "paid",
      status: "Approved",
    },
    {
      _id: "9",
      type: "event",
      event: { title: "Winter Wine Festival", date: "2025-12-20" },
      user: { name: "Priya Sharma" },
      totalAmount: 4000,
      paymentStatus: "paid",
      status: "Approved",
    },
    {
      _id: "10",
      type: "property",
      property: { title: "Mountain View Cabin", city: "Manali" },
      user: { name: "Robert Johnson" },
      startDate: "2026-01-10",
      endDate: "2026-01-14",
      totalAmount: 45000,
      paymentStatus: "paid",
      status: "Pending",
    },
    {
      _id: "11",
      type: "property",
      property: { title: "Mountain View Cabin", city: "Manali" },
      user: { name: "Robert Johnson" },
      startDate: "2026-01-10",
      endDate: "2026-01-14",
      totalAmount: 45000,
      paymentStatus: "paid",
      status: "Pending",
    },
    {
      _id: "12",
      type: "property",
      property: { title: "Mountain View Cabin", city: "Manali" },
      user: { name: "Robert Johnson" },
      startDate: "2026-01-10",
      endDate: "2026-01-14",
      totalAmount: 45000,
      paymentStatus: "paid",
      status: "Pending",
    },
    {
      _id: "13",
      type: "property",
      property: { title: "Mountain View Cabin", city: "Manali" },
      user: { name: "Robert Johnson" },
      startDate: "2026-01-10",
      endDate: "2026-01-14",
      totalAmount: 45000,
      paymentStatus: "paid",
      status: "Pending",
    },
    {
      _id: "14",
      type: "property",
      property: { title: "Mountain View Cabin", city: "Manali" },
      user: { name: "Robert Johnson" },
      startDate: "2026-01-10",
      endDate: "2026-01-14",
      totalAmount: 45000,
      paymentStatus: "paid",
      status: "Pending",
    },
  ]

  const bookings = mockBookings.filter((b) => b.type === activeTab)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 px-2">
        {stats.map((item) => (
          <Card
            key={item.key}
            className="bg-gradient-to-t from-primary/5 to-card shadow-sm border border-border rounded-2xl h-44 overflow-hidden tabular-nums"
          >
            <CardHeader className="pb-0 -mt-1">
              <div className="flex items-center justify-between">
                <CardDescription className="truncate font-normal text-sm scroll-m-20 tracking-tight text-muted-foreground">
                  {item.title}
                </CardDescription>
                {item.icon}
              </div>
              <CardTitle className="text-4xl font-semibold tracking-tight scroll-m-20 text-foreground">
                {item.value}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-col items-start gap-1 text-sm leading-snug -mt-1">
              <div className="font-medium truncate tracking-tight scroll-m-20 text-foreground">
                {item.desc}
              </div>
              <div className="text-muted-foreground text-sm line-clamp-1 tracking-tight scroll-m-20 font-normal">
                {item.subtext}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <OwnerChart />

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "property" | "event")}
        className="mt-3 cursor-pointer"
      >
        <TabsList>
          <TabsTrigger value="property">Property Booking Requests</TabsTrigger>
          <TabsTrigger value="event">Event Booking Requests</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="rounded-xl border border-border bg-gradient-to-b from-background to-muted shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {activeTab === "property" ? (
                    <>
                      <TableHead>Property</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Dates</TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead>Event</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Date</TableHead>
                    </>
                  )}
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {bookings.map((b: any) => (
                  <TableRow key={b._id}>
                    {activeTab === "property" ? (
                      <>
                        <TableCell>
                          {b.property?.title
                            ? `${b.property.title} (${b.property.city})`
                            : "—"}
                        </TableCell>
                        <TableCell>{b.user?.name || "—"}</TableCell>
                        <TableCell>
                          {`${new Date(b.startDate).toLocaleDateString()} – ${new Date(
                            b.endDate
                          ).toLocaleDateString()}`}
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{b.event?.title || "—"}</TableCell>
                        <TableCell>{b.user?.name || "—"}</TableCell>
                        <TableCell>
                          {b.event?.date
                            ? new Date(b.event.date).toLocaleDateString()
                            : "—"}
                        </TableCell>
                      </>
                    )}
                    <TableCell>{b.status}</TableCell>
                    <TableCell>{b.paymentStatus}</TableCell>
                    <TableCell>₹{b.totalAmount?.toLocaleString()}</TableCell>
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

                {bookings.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground py-6"
                    >
                      No {activeTab} bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

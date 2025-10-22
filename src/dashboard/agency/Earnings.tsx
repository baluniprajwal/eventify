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
import { Banknote, Building2, CalendarDays, Users } from "lucide-react"

export default function Earnings() {
  // 📊 Mock KPI data
  const stats = [
    {
      key: "totalRevenue",
      title: "Total Revenue",
      value: "₹1,25,000",
      desc: "Earnings from agency bookings",
      subtext: "Across properties and events",
      icon: <Banknote className="h-6 w-6 text-muted-foreground" />,
    },
    {
      key: "totalTransactions",
      title: "Total Transactions",
      value: 87,
      desc: "Completed bookings",
      subtext: "Includes all successful payments",
      icon: <CalendarDays className="h-6 w-6 text-muted-foreground" />,
    },
    {
      key: "partnerProperties",
      title: "Partner Properties",
      value: 12,
      desc: "Active collaborations",
      subtext: "Currently partnered venues",
      icon: <Building2 className="h-6 w-6 text-muted-foreground" />,
    },
    {
      key: "clients",
      title: "Clients",
      value: 34,
      desc: "Repeat customers",
      subtext: "Returning event organizers",
      icon: <Users className="h-6 w-6 text-muted-foreground" />,
    },
  ]

  const transactions = [
    {
      id: "T001",
      name: "Luxury Wedding Expo",
      client: "Riya Sharma",
      type: "Event",
      date: "2025-10-15",
      amount: 25000,
      status: "Paid",
    },
    {
      id: "T002",
      name: "Oceanview Villa Stay",
      client: "Arjun Mehta",
      type: "Property",
      date: "2025-10-18",
      amount: 18000,
      status: "Pending",
    },
    {
      id: "T003",
      name: "Corporate Gala Night",
      client: "Sneha Verma",
      type: "Event",
      date: "2025-10-20",
      amount: 22000,
      status: "Paid",
    },
    {
      id: "T004",
      name: "Hilltop Resort Stay",
      client: "Aditya Singh",
      type: "Property",
      date: "2025-10-22",
      amount: 15000,
      status: "Refunded",
    },
  ]

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
                <CardDescription className="truncate font-normal text-sm text-muted-foreground">
                  {item.title}
                </CardDescription>
                {item.icon}
              </div>
              <CardTitle className="text-4xl font-semibold tracking-tight text-foreground">
                {item.value}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-col items-start gap-1 text-sm leading-snug -mt-1">
              <div className="font-medium text-foreground">{item.desc}</div>
              <div className="text-muted-foreground text-sm">{item.subtext}</div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="border border-border bg-gradient-to-b from-background to-muted shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
            Recent Transactions
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Overview of latest completed and pending payments
          </CardDescription>
        </CardHeader>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Booking</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.id}</TableCell>
                  <TableCell>{t.name}</TableCell>
                  <TableCell>{t.client}</TableCell>
                  <TableCell>{t.type}</TableCell>
                  <TableCell>
                    {new Date(t.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="capitalize">{t.status}</TableCell>
                  <TableCell>₹{t.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-md"
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-md"
                    >
                      Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {transactions.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground py-6"
                  >
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}

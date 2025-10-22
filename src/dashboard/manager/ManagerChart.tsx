import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type {ChartConfig} from "@/components/ui/chart"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", attendees: 222, capacity: 150 },
  { date: "2024-04-02", attendees: 97, capacity: 180 },
  { date: "2024-04-03", attendees: 167, capacity: 120 },
  { date: "2024-04-04", attendees: 242, capacity: 260 },
  { date: "2024-04-05", attendees: 373, capacity: 290 },
  { date: "2024-04-06", attendees: 301, capacity: 340 },
  { date: "2024-04-07", attendees: 245, capacity: 180 },
  { date: "2024-04-08", attendees: 409, capacity: 320 },
  { date: "2024-04-09", attendees: 59, capacity: 110 },
  { date: "2024-04-10", attendees: 261, capacity: 190 },
  { date: "2024-04-11", attendees: 327, capacity: 350 },
  { date: "2024-04-12", attendees: 292, capacity: 210 },
  { date: "2024-04-13", attendees: 342, capacity: 380 },
  { date: "2024-04-14", attendees: 137, capacity: 220 },
  { date: "2024-04-15", attendees: 120, capacity: 170 },
  { date: "2024-04-16", attendees: 138, capacity: 190 },
  { date: "2024-04-17", attendees: 446, capacity: 360 },
  { date: "2024-04-18", attendees: 364, capacity: 410 },
  { date: "2024-04-19", attendees: 243, capacity: 180 },
  { date: "2024-04-20", attendees: 89, capacity: 150 },
  { date: "2024-04-21", attendees: 137, capacity: 200 },
  { date: "2024-04-22", attendees: 224, capacity: 170 },
  { date: "2024-04-23", attendees: 138, capacity: 230 },
  { date: "2024-04-24", attendees: 387, capacity: 290 },
  { date: "2024-04-25", attendees: 215, capacity: 250 },
  { date: "2024-04-26", attendees: 75, capacity: 130 },
  { date: "2024-04-27", attendees: 383, capacity: 420 },
  { date: "2024-04-28", attendees: 122, capacity: 180 },
  { date: "2024-04-29", attendees: 315, capacity: 240 },
  { date: "2024-04-30", attendees: 454, capacity: 380 },
  { date: "2024-05-01", attendees: 165, capacity: 220 },
  { date: "2024-05-02", attendees: 293, capacity: 310 },
  { date: "2024-05-03", attendees: 247, capacity: 190 },
  { date: "2024-05-04", attendees: 385, capacity: 420 },
  { date: "2024-05-05", attendees: 481, capacity: 390 },
  { date: "2024-05-06", attendees: 498, capacity: 520 },
  { date: "2024-05-07", attendees: 388, capacity: 300 },
  { date: "2024-05-08", attendees: 149, capacity: 210 },
  { date: "2024-05-09", attendees: 227, capacity: 180 },
  { date: "2024-05-10", attendees: 293, capacity: 330 },
  { date: "2024-05-11", attendees: 335, capacity: 270 },
  { date: "2024-05-12", attendees: 197, capacity: 240 },
  { date: "2024-05-13", attendees: 197, capacity: 160 },
  { date: "2024-05-14", attendees: 448, capacity: 490 },
  { date: "2024-05-15", attendees: 473, capacity: 380 },
  { date: "2024-05-16", attendees: 338, capacity: 400 },
  { date: "2024-05-17", attendees: 499, capacity: 420 },
  { date: "2024-05-18", attendees: 315, capacity: 350 },
  { date: "2024-05-19", attendees: 235, capacity: 180 },
  { date: "2024-05-20", attendees: 177, capacity: 230 },
  { date: "2024-05-21", attendees: 82, capacity: 140 },
  { date: "2024-05-22", attendees: 81, capacity: 120 },
  { date: "2024-05-23", attendees: 252, capacity: 290 },
  { date: "2024-05-24", attendees: 294, capacity: 220 },
  { date: "2024-05-25", attendees: 201, capacity: 250 },
  { date: "2024-05-26", attendees: 213, capacity: 170 },
  { date: "2024-05-27", attendees: 420, capacity: 460 },
  { date: "2024-05-28", attendees: 233, capacity: 190 },
  { date: "2024-05-29", attendees: 78, capacity: 130 },
  { date: "2024-05-30", attendees: 340, capacity: 280 },
  { date: "2024-05-31", attendees: 178, capacity: 230 },
  { date: "2024-06-01", attendees: 178, capacity: 200 },
  { date: "2024-06-02", attendees: 470, capacity: 410 },
  { date: "2024-06-03", attendees: 103, capacity: 160 },
  { date: "2024-06-04", attendees: 439, capacity: 380 },
  { date: "2024-06-05", attendees: 88, capacity: 140 },
  { date: "2024-06-06", attendees: 294, capacity: 250 },
  { date: "2024-06-07", attendees: 323, capacity: 370 },
  { date: "2024-06-08", attendees: 385, capacity: 320 },
  { date: "2024-06-09", attendees: 438, capacity: 480 },
  { date: "2024-06-10", attendees: 155, capacity: 200 },
  { date: "2024-06-11", attendees: 92, capacity: 150 },
  { date: "2024-06-12", attendees: 492, capacity: 420 },
  { date: "2024-06-13", attendees: 81, capacity: 130 },
  { date: "2024-06-14", attendees: 426, capacity: 380 },
  { date: "2024-06-15", attendees: 307, capacity: 350 },
  { date: "2024-06-16", attendees: 371, capacity: 310 },
  { date: "2024-06-17", attendees: 475, capacity: 520 },
  { date: "2024-06-18", attendees: 107, capacity: 170 },
  { date: "2024-06-19", attendees: 341, capacity: 290 },
  { date: "2024-06-20", attendees: 408, capacity: 450 },
  { date: "2024-06-21", attendees: 169, capacity: 210 },
  { date: "2024-06-22", attendees: 317, capacity: 270 },
  { date: "2024-06-23", attendees: 480, capacity: 530 },
  { date: "2024-06-24", attendees: 132, capacity: 180 },
  { date: "2024-06-25", attendees: 141, capacity: 190 },
  { date: "2024-06-26", attendees: 434, capacity: 380 },
  { date: "2024-06-27", attendees: 448, capacity: 490 },
  { date: "2024-06-28", attendees: 149, capacity: 200 },
  { date: "2024-06-29", attendees: 103, capacity: 160 },
  { date: "2024-06-30", attendees: 446, capacity: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ManagerChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Event Attendance Overview</CardTitle>
          <CardDescription>
            Attendees vs capacity for all events in the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="attendees"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="capacity"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

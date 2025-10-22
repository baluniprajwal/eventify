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
  { date: "2024-04-01", propertyRevenue: 222, eventRevenue: 150 },
  { date: "2024-04-02", propertyRevenue: 97, eventRevenue: 180 },
  { date: "2024-04-03", propertyRevenue: 167, eventRevenue: 120 },
  { date: "2024-04-04", propertyRevenue: 242, eventRevenue: 260 },
  { date: "2024-04-05", propertyRevenue: 373, eventRevenue: 290 },
  { date: "2024-04-06", propertyRevenue: 301, eventRevenue: 340 },
  { date: "2024-04-07", propertyRevenue: 245, eventRevenue: 180 },
  { date: "2024-04-08", propertyRevenue: 409, eventRevenue: 320 },
  { date: "2024-04-09", propertyRevenue: 59, eventRevenue: 110 },
  { date: "2024-04-10", propertyRevenue: 261, eventRevenue: 190 },
  { date: "2024-04-11", propertyRevenue: 327, eventRevenue: 350 },
  { date: "2024-04-12", propertyRevenue: 292, eventRevenue: 210 },
  { date: "2024-04-13", propertyRevenue: 342, eventRevenue: 380 },
  { date: "2024-04-14", propertyRevenue: 137, eventRevenue: 220 },
  { date: "2024-04-15", propertyRevenue: 120, eventRevenue: 170 },
  { date: "2024-04-16", propertyRevenue: 138, eventRevenue: 190 },
  { date: "2024-04-17", propertyRevenue: 446, eventRevenue: 360 },
  { date: "2024-04-18", propertyRevenue: 364, eventRevenue: 410 },
  { date: "2024-04-19", propertyRevenue: 243, eventRevenue: 180 },
  { date: "2024-04-20", propertyRevenue: 89, eventRevenue: 150 },
  { date: "2024-04-21", propertyRevenue: 137, eventRevenue: 200 },
  { date: "2024-04-22", propertyRevenue: 224, eventRevenue: 170 },
  { date: "2024-04-23", propertyRevenue: 138, eventRevenue: 230 },
  { date: "2024-04-24", propertyRevenue: 387, eventRevenue: 290 },
  { date: "2024-04-25", propertyRevenue: 215, eventRevenue: 250 },
  { date: "2024-04-26", propertyRevenue: 75, eventRevenue: 130 },
  { date: "2024-04-27", propertyRevenue: 383, eventRevenue: 420 },
  { date: "2024-04-28", propertyRevenue: 122, eventRevenue: 180 },
  { date: "2024-04-29", propertyRevenue: 315, eventRevenue: 240 },
  { date: "2024-04-30", propertyRevenue: 454, eventRevenue: 380 },
  { date: "2024-05-01", propertyRevenue: 165, eventRevenue: 220 },
  { date: "2024-05-02", propertyRevenue: 293, eventRevenue: 310 },
  { date: "2024-05-03", propertyRevenue: 247, eventRevenue: 190 },
  { date: "2024-05-04", propertyRevenue: 385, eventRevenue: 420 },
  { date: "2024-05-05", propertyRevenue: 481, eventRevenue: 390 },
  { date: "2024-05-06", propertyRevenue: 498, eventRevenue: 520 },
  { date: "2024-05-07", propertyRevenue: 388, eventRevenue: 300 },
  { date: "2024-05-08", propertyRevenue: 149, eventRevenue: 210 },
  { date: "2024-05-09", propertyRevenue: 227, eventRevenue: 180 },
  { date: "2024-05-10", propertyRevenue: 293, eventRevenue: 330 },
  { date: "2024-05-11", propertyRevenue: 335, eventRevenue: 270 },
  { date: "2024-05-12", propertyRevenue: 197, eventRevenue: 240 },
  { date: "2024-05-13", propertyRevenue: 197, eventRevenue: 160 },
  { date: "2024-05-14", propertyRevenue: 448, eventRevenue: 490 },
  { date: "2024-05-15", propertyRevenue: 473, eventRevenue: 380 },
  { date: "2024-05-16", propertyRevenue: 338, eventRevenue: 400 },
  { date: "2024-05-17", propertyRevenue: 499, eventRevenue: 420 },
  { date: "2024-05-18", propertyRevenue: 315, eventRevenue: 350 },
  { date: "2024-05-19", propertyRevenue: 235, eventRevenue: 180 },
  { date: "2024-05-20", propertyRevenue: 177, eventRevenue: 230 },
  { date: "2024-05-21", propertyRevenue: 82, eventRevenue: 140 },
  { date: "2024-05-22", propertyRevenue: 81, eventRevenue: 120 },
  { date: "2024-05-23", propertyRevenue: 252, eventRevenue: 290 },
  { date: "2024-05-24", propertyRevenue: 294, eventRevenue: 220 },
  { date: "2024-05-25", propertyRevenue: 201, eventRevenue: 250 },
  { date: "2024-05-26", propertyRevenue: 213, eventRevenue: 170 },
  { date: "2024-05-27", propertyRevenue: 420, eventRevenue: 460 },
  { date: "2024-05-28", propertyRevenue: 233, eventRevenue: 190 },
  { date: "2024-05-29", propertyRevenue: 78, eventRevenue: 130 },
  { date: "2024-05-30", propertyRevenue: 340, eventRevenue: 280 },
  { date: "2024-05-31", propertyRevenue: 178, eventRevenue: 230 },
  { date: "2024-06-01", propertyRevenue: 178, eventRevenue: 200 },
  { date: "2024-06-02", propertyRevenue: 470, eventRevenue: 410 },
  { date: "2024-06-03", propertyRevenue: 103, eventRevenue: 160 },
  { date: "2024-06-04", propertyRevenue: 439, eventRevenue: 380 },
  { date: "2024-06-05", propertyRevenue: 88, eventRevenue: 140 },
  { date: "2024-06-06", propertyRevenue: 294, eventRevenue: 250 },
  { date: "2024-06-07", propertyRevenue: 323, eventRevenue: 370 },
  { date: "2024-06-08", propertyRevenue: 385, eventRevenue: 320 },
  { date: "2024-06-09", propertyRevenue: 438, eventRevenue: 480 },
  { date: "2024-06-10", propertyRevenue: 155, eventRevenue: 200 },
  { date: "2024-06-11", propertyRevenue: 92, eventRevenue: 150 },
  { date: "2024-06-12", propertyRevenue: 492, eventRevenue: 420 },
  { date: "2024-06-13", propertyRevenue: 81, eventRevenue: 130 },
  { date: "2024-06-14", propertyRevenue: 426, eventRevenue: 380 },
  { date: "2024-06-15", propertyRevenue: 307, eventRevenue: 350 },
  { date: "2024-06-16", propertyRevenue: 371, eventRevenue: 310 },
  { date: "2024-06-17", propertyRevenue: 475, eventRevenue: 520 },
  { date: "2024-06-18", propertyRevenue: 107, eventRevenue: 170 },
  { date: "2024-06-19", propertyRevenue: 341, eventRevenue: 290 },
  { date: "2024-06-20", propertyRevenue: 408, eventRevenue: 450 },
  { date: "2024-06-21", propertyRevenue: 169, eventRevenue: 210 },
  { date: "2024-06-22", propertyRevenue: 317, eventRevenue: 270 },
  { date: "2024-06-23", propertyRevenue: 480, eventRevenue: 530 },
  { date: "2024-06-24", propertyRevenue: 132, eventRevenue: 180 },
  { date: "2024-06-25", propertyRevenue: 141, eventRevenue: 190 },
  { date: "2024-06-26", propertyRevenue: 434, eventRevenue: 380 },
  { date: "2024-06-27", propertyRevenue: 448, eventRevenue: 490 },
  { date: "2024-06-28", propertyRevenue: 149, eventRevenue: 200 },
  { date: "2024-06-29", propertyRevenue: 103, eventRevenue: 160 },
  { date: "2024-06-30", propertyRevenue: 446, eventRevenue: 400 },
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

export function OwnerChart() {
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
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>
            Property vs Event revenue in the last 3 months
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
              dataKey="propertyRevenue"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="eventRevenue"
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

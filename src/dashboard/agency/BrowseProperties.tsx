import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users, IndianRupee, MapPin } from "lucide-react"

export default function BrowseProperties() {
  const [search, setSearch] = useState("")
  const mockProperties = [
    {
      _id: "1",
      title: "Sunset Villa",
      city: "Goa",
      state: "Goa",
      description:
        "A luxury villa overlooking the Arabian Sea, perfect for weekend getaways and events.",
      capacity: 8,
      pricePerDay: 12000,
      images: [
        {
          url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
        },
      ],
    },
    {
      _id: "2",
      title: "Mountain Retreat",
      city: "Manali",
      state: "Himachal Pradesh",
      description:
        "A peaceful mountain retreat surrounded by pine forests. Ideal for corporate stays or retreats.",
      capacity: 12,
      pricePerDay: 9500,
      images: [
        {
          url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
        },
      ],
    },
    {
      _id: "3",
      title: "Cityview Apartment",
      city: "Mumbai",
      state: "Maharashtra",
      description:
        "Modern apartment in the heart of the city with skyline views. Great for short business stays.",
      capacity: 4,
      pricePerDay: 6000,
      images: [
        {
          url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
        },
      ],
    },
  ]

  const filteredProperties = mockProperties.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search properties, cities..."
          className="w-full max-w-md bg-background border-border shadow-sm focus-visible:ring-1 focus-visible:ring-ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProperties.map((property) => (
          <Card
            key={property._id}
            className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-t from-primary/5 to-card shadow-sm hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300 py-0 cursor-pointer"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={property.images?.[0].url}
                alt={property.title}
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <CardHeader className="px-5 pt-4 pb-2">
              <CardTitle className="text-lg font-semibold text-foreground tracking-tight">
                {property.title}
              </CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4 shrink-0" />
                {property.city}, {property.state}
              </div>
            </CardHeader>

            <CardContent className="px-5 pb-5 pt-1 text-sm">
              <p className="text-muted-foreground leading-snug line-clamp-2 mb-4">
                {property.description}
              </p>

              <div className="flex items-center justify-between text-foreground">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  {property.capacity} guests
                </div>

                <div className="flex items-center gap-1 text-sm font-semibold">
                  <IndianRupee className="w-4 h-4 text-muted-foreground" />
                  {property.pricePerDay.toLocaleString()}
                  <span className="text-muted-foreground text-xs ml-1 font-normal">
                    /day
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center text-muted-foreground mt-16">
          <p className="text-sm">No properties found.</p>
          <Button className="mt-3" variant="secondary">
            Explore Other Listings
          </Button>
        </div>
      )}
    </div>
  )
}

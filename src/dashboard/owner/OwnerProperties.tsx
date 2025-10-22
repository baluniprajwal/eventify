import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users, IndianRupee, MapPin } from "lucide-react"
import { AddPropertySheet } from "@/components/owner/AddPropertySheet"
// import { useGetMyProperties } from "@/hooks/useProperties"

export default function OwnerProperties() {
  // const {data,isLoading,error} = useGetMyProperties();
  const [search, setSearch] = useState("")

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p className="text-red-500">Error loading properties.</p>;

  const mockProperties = [
    {
      _id: "1",
      title: "Seaside Villa",
      description:
        "Luxurious beachfront villa offering private pool, ocean views, and modern amenities for a perfect tropical escape.",
      city: "Goa",
      state: "Goa",
      capacity: 8,
      pricePerDay: 15000,
      images: [
        {
          url: "https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg?cs=srgb&dl=pexels-pixabay-261146.jpg&fm=jpg",
        },
      ],
    },
    {
      _id: "2",
      title: "Mountain View Cabin",
      description:
        "A cozy wooden cabin surrounded by pine forests, ideal for bonfires and stargazing.",
      city: "Manali",
      state: "Himachal Pradesh",
      capacity: 4,
      pricePerDay: 7000,
      images: [
        {
          url: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?cs=srgb&dl=pexels-pixabay-326055.jpg&fm=jpg",
        },
      ],
    },
    {
      _id: "3",
      title: "Urban Penthouse",
      description:
        "Modern penthouse apartment with panoramic city views, rooftop lounge, and private jacuzzi.",
      city: "Mumbai",
      state: "Maharashtra",
      capacity: 6,
      pricePerDay: 22000,
      images: [
        {
          url: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?cs=srgb&dl=pexels-pixabay-276724.jpg&fm=jpg",
        },
      ],
    },
    {
      _id: "4",
      title: "Riverside Eco Resort",
      description:
        "Sustainable cottages by the river, perfect for yoga retreats and nature lovers.",
      city: "Rishikesh",
      state: "Uttarakhand",
      capacity: 10,
      pricePerDay: 12000,
      images: [
        {
          url: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?cs=srgb&dl=pexels-pixabay-338504.jpg&fm=jpg",
        },
      ],
    },
    {
      _id: "5",
      title: "Desert Oasis Camp",
      description:
        "Luxury tents in the Thar Desert with cultural evenings and camel safaris.",
      city: "Jaisalmer",
      state: "Rajasthan",
      capacity: 12,
      pricePerDay: 9500,
      images: [
        {
          url: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?cs=srgb&dl=pexels-jess-vide-1008155.jpg&fm=jpg",
        },
      ],
    },
  ]

  const filteredProperties = mockProperties.filter(
    (p: any) =>
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
        <AddPropertySheet />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProperties.map((property: any) => (
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
            Add Your First Property
          </Button>
        </div>
      )}
    </div>
  )
}


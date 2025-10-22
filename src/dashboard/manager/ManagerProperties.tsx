import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useGetMyProperties } from "@/hooks/useProperties"
import { IndianRupee, MapPin, Users } from "lucide-react"
import { useState } from "react"

export default function ManagerProperties() {
  const {data,isLoading,error} = useGetMyProperties();
  const [search, setSearch] = useState("")

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error loading properties.</p>;


  const filteredProperties = data?.properties?.filter(
    (p:any) =>
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
      {filteredProperties.map((property : any) => (
        <Card
          key={property._id}
          className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-t from-primary/5 to-card shadow-sm hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300 py-0 cursor-pointer"
        >
          {/* Image */}
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
      </div>
    )}
  </div>
)
}

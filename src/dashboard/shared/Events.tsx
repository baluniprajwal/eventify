import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, IndianRupee, Users } from "lucide-react";
import { format } from "date-fns";
import { AddEventSheet } from "@/components/owner/AddEventSheet";


// import { useGetMyEvents } from "@/hooks/useEvents";

export default function OwnerEvents() {
  const [search, setSearch] = useState("");

  
  // const { data, isLoading, error } = useGetMyEvents(search);
  // if (isLoading) return <p>Loading events...</p>;
  // if (error) return <p className="text-red-500">Failed to load events.</p>;
  // const events = data?.events || [];

  const events = [
  {
    _id: "1",
    title: "Sunset Beach Party",
    description:
      "An unforgettable night filled with music, drinks, and dancing by the beach.",
    date: "2025-12-05",
    startTime: "06:00 PM",
    endTime: "11:00 PM",
    capacity: 200,
    price: 2500,
    images: [
      {
        url: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?cs=srgb&dl=pexels-wendywei-1190297.jpg&fm=jpg"
      }
    ],
    property: { city: "Goa", state: "Goa" },
  },
  {
    _id: "2",
    title: "Winter Wine Festival",
    description:
      "Taste exclusive local and international wines with live jazz performances.",
    date: "2025-12-20",
    startTime: "04:00 PM",
    endTime: "10:00 PM",
    capacity: 150,
    price: 4000,
    images: [
      {
        url: "https://images.pexels.com/photos/15005055/pexels-photo-15005055.jpeg"
      }
    ],
    property: { city: "Nashik", state: "Maharashtra" },
  },
  {
    _id: "3",
    title: "Mountain Music Camp",
    description:
      "Enjoy an acoustic weekend in the hills with camping, bonfire, and music.",
    date: "2026-01-10",
    startTime: "02:00 PM",
    endTime: "11:30 PM",
    capacity: 100,
    price: 3500,
    images: [
      {
        url: "https://images.pexels.com/photos/19479637/pexels-photo-19479637.jpeg"
      }
    ],
    property: { city: "Manali", state: "Himachal Pradesh" },
  },
  {
    _id: "4",
    title: "Forest Folk Festival",
    description:
      "Celebrate folk music, outdoor theater and artisan crafts under the trees.",
    date: "2026-02-18",
    startTime: "03:00 PM",
    endTime: "09:00 PM",
    capacity: 120,
    price: 3200,
    images: [
      {
        url: "https://images.pexels.com/photos/267972/pexels-photo-267972.jpeg"
      }
    ],
    property: { city: "Rishikesh", state: "Uttarakhand" },
  },
  {
    _id: "5",
    title: "Urban Rooftop Rave",
    description:
      "Dance beneath the stars on a rooftop with skyline views and vibrant beats.",
    date: "2026-03-05",
    startTime: "08:00 PM",
    endTime: "02:00 AM",
    capacity: 300,
    price: 4500,
    images: [
      {
        url: "https://images.pexels.com/photos/108935/pexels-photo-108935.jpeg"
      }
    ],
    property: { city: "Mumbai", state: "Maharashtra" },
  }
];


  const filteredEvents = events.filter((event) => {
    const query = search.toLowerCase();
    return (
      event.title.toLowerCase().includes(query) ||
      event.property.city.toLowerCase().includes(query) ||
      event.property.state.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-8">
      
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search events, cities..."
          className="w-full max-w-md bg-background border-border shadow-sm focus-visible:ring-1 focus-visible:ring-ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddEventSheet />
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <Card
            key={event._id}
            className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-t from-primary/5 to-card shadow-sm hover:shadow-lg hover:-translate-y-[2px] transition-all duration-300 py-0 cursor-pointer"
          >
           
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={event.images?.[0]?.url || "/placeholder.jpg"}
                alt={event.title}
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

           
            <CardHeader className="px-5 pt-4 pb-2">
              <CardTitle className="text-lg font-semibold text-foreground tracking-tight">
                {event.title}
              </CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4 shrink-0" />
                {event.property?.city}, {event.property?.state}
              </div>
            </CardHeader>

            
            <CardContent className="px-5 pb-5 pt-1 text-sm">
              <p className="text-muted-foreground leading-snug line-clamp-2 mb-4">
                {event.description}
              </p>

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="w-4 h-4" />
                  {format(new Date(event.date), "dd MMM yyyy")}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {event.startTime} - {event.endTime}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 text-foreground">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  {event.capacity} capacity
                </div>

                <div className="flex items-center gap-1 text-sm font-semibold">
                  <IndianRupee className="w-4 h-4 text-muted-foreground" />
                  {event.price?.toLocaleString()}
                  <span className="text-muted-foreground text-xs ml-1 font-normal">
                    /ticket
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      
      {filteredEvents.length === 0 && (
        <div className="text-center text-muted-foreground mt-16">
          <p className="text-sm">No events found.</p>
          <Button className="mt-3" variant="secondary">
            Add Your First Event
          </Button>
        </div>
      )}
    </div>
  );
}

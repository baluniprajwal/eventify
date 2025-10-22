"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { format } from "date-fns"
import { ChevronDown, GripVertical, X } from "lucide-react"
import * as React from "react"
import { useState } from "react"
import ReactDOM from "react-dom"
import { toast } from "sonner"

import { useGetMyProperties } from "@/hooks/useProperties"
import { useAddEvent } from "@/hooks/useEvents" 

const Portal = ({ children }: { children: React.ReactNode }) => {
  if (typeof window === "undefined") return null
  let portal = document.getElementById("dnd-portal")
  if (!portal) {
    portal = document.createElement("div")
    portal.id = "dnd-portal"
    document.body.appendChild(portal)
  }
  return ReactDOM.createPortal(children, portal)
}

export function AddEventSheet() {
  const { data, isLoading } = useGetMyProperties()
  const { mutateAsync: addEvent, isPending } = useAddEvent()

  const [form, setForm] = useState({
    title: "",
    description: "",
    capacity: "",
    price: "",
    property: "",
  })
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const properties = data?.properties || []

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setImages((prev) => [...prev, ...files])
    setPreviewUrls((prev) => [...prev, ...newPreviews])
  }

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return
    const reorderedImgs = Array.from(images)
    const reorderedPrevs = Array.from(previewUrls)
    const [movedImg] = reorderedImgs.splice(result.source.index, 1)
    const [movedPrev] = reorderedPrevs.splice(result.source.index, 1)
    reorderedImgs.splice(result.destination.index, 0, movedImg)
    reorderedPrevs.splice(result.destination.index, 0, movedPrev)
    setImages(reorderedImgs)
    setPreviewUrls(reorderedPrevs)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => formData.append(key, value))
      if (startDate) formData.append("date", startDate.toISOString())
      if (endDate) formData.append("endDate", endDate.toISOString())
      formData.append("startTime", startTime)
      formData.append("endTime", endTime)
      images.forEach((f) => formData.append("images", f))

      await addEvent(formData)
      toast.success("Event created successfully!")

      
      setForm({ title: "", description: "", capacity: "", price: "", property: "" })
      setStartDate(undefined)
      setEndDate(undefined)
      setStartTime("")
      setEndTime("")
      setImages([])
      setPreviewUrls([])
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Server error while creating event.")
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-lg px-5">Add Event</Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-[800px] overflow-y-auto bg-card border-l border-border shadow-xl"
      >
        <SheetHeader className="pb-4 border-b border-border">
          <SheetTitle className="text-lg font-semibold text-foreground">
            Add New Event
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-8 py-6">
          <section className="grid gap-5 p-6 rounded-xl bg-muted/40">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={form.title} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="property">Select Property</Label>
                <Select
                  onValueChange={(value) => setForm((prev) => ({ ...prev, property: value }))}
                  value={form.property}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={isLoading ? "Loading..." : "Choose property"} />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.length > 0 ? (
                      properties.map((p :any) => (
                        <SelectItem key={p._id} value={p._id}>
                          {p.title}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground px-2 py-1">
                        No properties found
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                <Label className="px-1">Start</Label>
                <div className="flex gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-40 justify-between font-normal">
                        {startDate ? format(startDate, "PPP") : "Select date"}
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        selected={startDate}
                        onSelect={setStartDate}
                      />
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-32 bg-background appearance-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Label className="px-1">End</Label>
                <div className="flex gap-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-40 justify-between font-normal">
                        {endDate ? format(endDate, "PPP") : "Select date"}
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-32 bg-background appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Price & Capacity */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" value={form.price} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="capacity">Capacity (Guests)</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={form.capacity}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your event..."
                className="min-h-[100px]"
              />
            </div>
          </section>

          {/* Images */}
          <section className="p-6 rounded-xl bg-muted/40">
            <div className="flex justify-between items-center mb-3">
              <Label>Images (drag to reorder)</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => document.getElementById("event-images")?.click()}
              >
                Upload
              </Button>
            </div>
            <Input
              id="event-images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {previewUrls.length > 0 ? (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="images" direction="horizontal">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    >
                      {previewUrls.map((url, i) => (
                        <Draggable key={url} draggableId={url} index={i}>
                          {(provided, snapshot) => {
                            const card = (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`relative rounded-lg overflow-hidden transition-transform ${
                                  snapshot.isDragging ? "scale-105 shadow-lg" : "hover:shadow-md"
                                }`}
                                style={{
                                  ...provided.draggableProps.style,
                                  zIndex: snapshot.isDragging ? 9999 : "auto",
                                }}
                              >
                                <div className="absolute top-1 left-1 bg-background/60 rounded p-1">
                                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <img
                                  src={url}
                                  alt={`upload-${i}`}
                                  className="object-cover w-full h-32 border border-border rounded-md"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(i)}
                                  className="absolute top-1 right-1 bg-background/70 hover:bg-destructive/80 hover:text-destructive-foreground rounded-full p-1 transition"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )
                            return snapshot.isDragging ? <Portal>{card}</Portal> : card
                          }}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="border border-dashed border-muted rounded-lg p-10 text-center text-muted-foreground text-sm">
                No images uploaded yet. Click “Upload” to add event images.
              </div>
            )}
          </section>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isPending} className="px-6">
              {isPending ? "Saving..." : "Save Event"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}



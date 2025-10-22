import { useState } from "react"
import ReactDOM from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "sonner"
import { X, GripVertical } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { useAddProperty } from "@/hooks/useProperties"
import { getCoordinates } from "@/lib/getCoordinates"


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

export function AddPropertySheet() {
  const { mutateAsync: addProperty, isPending } = useAddProperty();
  const [form, setForm] = useState({
    title: "",
    description: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    capacity: "",
    pricePerDay: "",
  })
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

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
    e.preventDefault();

    try {
      const fullAddress = `${form.addressLine1},${form.addressLine2 ? form.addressLine2 : ""}, ${form.city}, ${form.state}, ${form.country}`;
      const { latitude, longitude } = await getCoordinates(fullAddress);
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      formData.append("latitude", latitude.toString());
      formData.append("longitude", longitude.toString());
      images.forEach((file) => formData.append("images", file));

      await addProperty(formData);

      toast.success("Property created successfully!");
      setForm({
        title: "",
        description: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        capacity: "",
        pricePerDay: "",
      });
      setImages([]);
      setPreviewUrls([]);
    } catch (error: any) {
      toast.error(error.message || "Failed to create property");
    }
  };
    

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-lg px-5">Add Property</Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-[700px] overflow-y-auto bg-card border-l border-border shadow-xl"
      >
        <SheetHeader className="pb-4 border-b border-border">
          <SheetTitle className="text-lg font-semibold text-foreground">
            Add New Property
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-8 py-6">
          {/* Property Info */}
          <section className="grid gap-5 p-6 rounded-xl bg-muted/40">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="pricePerDay">Price / Day</Label>
                <Input
                  id="pricePerDay"
                  name="pricePerDay"
                  type="number"
                  value={form.pricePerDay}
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
                placeholder="Briefly describe the property..."
                className="min-h-[100px]"
              />
            </div>
          </section>

          {/* Address */}
          <section className="grid gap-5 p-6 rounded-xl bg-muted/40">
            <Label className="text-sm font-medium">Address</Label>
            <div className="grid gap-3">
              <Input
                name="addressLine1"
                placeholder="Address line 1"
                value={form.addressLine1}
                onChange={handleChange}
                required
              />
              <Input
                name="addressLine2"
                placeholder="Address line 2 (optional)"
                value={form.addressLine2}
                onChange={handleChange}
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <Input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                <Input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
                <Input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
              </div>
            </div>
          </section>

          {/* Capacity */}
          <section className="grid gap-5 p-6 rounded-xl bg-muted/40">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input
                name="capacity"
                type="number"
                placeholder="Capacity (guests)"
                value={form.capacity}
                onChange={handleChange}
              />
            </div>
          </section>

          
          <section className="p-6 rounded-xl bg-muted/40">
            <div className="flex justify-between items-center mb-3">
              <Label>Images (drag to reorder)</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => document.getElementById("images")?.click()}
              >
                Upload
              </Button>
            </div>
            <Input id="images" type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />

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
                No images uploaded yet. Click “Upload” to add property images.
              </div>
            )}
          </section>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isPending} className="px-6">
              {isPending ? "Saving..." : "Save Property"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}


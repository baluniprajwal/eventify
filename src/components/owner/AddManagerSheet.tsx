import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "sonner"
import { useCreateManager } from "@/hooks/useOwner"

export function AddManagerSheet() {
  const { mutateAsync: createManager, isPending } = useCreateManager()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all required fields.")
      return
    }

    try {
      await createManager(form)
      toast.success("Manager created successfully!")
      setForm({ name: "", email: "", phone: "", password: "" })
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create manager.")
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-lg px-5">Add Manager</Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-[450px] overflow-y-auto bg-card border-l border-border shadow-xl"
      >
        <SheetHeader className="pb-4 border-b border-border">
          <SheetTitle className="text-lg font-semibold text-foreground">
            Add New Manager
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-8 py-6">
          
          <section className="grid gap-5 p-6 rounded-xl bg-muted/40">
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="name" className="py-1">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter manager's full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="py-1">Phone (optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                />
              </div>

              <div>
                <Label htmlFor="email" className="py-1">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="manager@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="py-1">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter secure password"
                  required
                />
              </div>
            </div>
          </section>

          
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isPending} className="px-6">
              {isPending ? "Creating..." : "Create Manager"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}



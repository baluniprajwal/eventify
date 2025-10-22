import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useGetMyManagers } from "@/hooks/useOwner";
import { AddManagerSheet } from "@/components/owner/AddManagerSheet";

export default function OwnerManagers() {
  const [search, setSearch] = useState("");
  // const { data, isLoading, error } = useGetMyManagers(search);

  // if (isLoading) return <p>Loading managers...</p>;
  // if (error) return <p className="text-red-500">Failed to load managers.</p>;

  const mockManagers = [
    {
      _id: "1",
      name: "Ravi Kumar",
      email: "ravi.kumar@example.com",
      phone: "+91 9876543210",
      assignedProperties: [
        { title: "Seaside Villa", city: "Goa" },
        { title: "Urban Penthouse", city: "Mumbai" },
      ],
    },
    {
      _id: "2",
      name: "Aditi Sharma",
      email: "aditi.sharma@example.com",
      phone: "+91 9123456789",
      assignedProperties: [{ title: "Mountain View Cabin", city: "Manali" }],
    },
    {
      _id: "3",
      name: "Rohan Mehta",
      email: "rohan.mehta@example.com",
      phone: "+91 9988776655",
      assignedProperties: [
        { title: "Riverside Eco Resort", city: "Rishikesh" },
        { title: "Desert Oasis Camp", city: "Jaisalmer" },
        { title: "Seaside Villa", city: "Goa" },
      ],
    },
    {
      _id: "4",
      name: "Sneha Patel",
      email: "sneha.patel@example.com",
      phone: "+91 9090909090",
      assignedProperties: [
        { title: "Urban Penthouse", city: "Mumbai" },
        { title: "Riverside Eco Resort", city: "Rishikesh" },
      ],
    },
  ];

  const managers = mockManagers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search managers..."
          className="w-full max-w-md bg-background border-border shadow-sm focus-visible:ring-1 focus-visible:ring-ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddManagerSheet />
      </div>

      <div className="rounded-xl border border-border/60 overflow-hidden bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-t from-primary/5 to-card text-muted-foreground">
              <TableHead className="text-left font-semibold text-foreground">
                Name
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Assigned Properties</TableHead>
              <TableHead className="text-center">Total Managed</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {managers.map((manager: any) => (
              <TableRow
                key={manager._id}
                className="hover:bg-gradient-to-r from-primary/[0.04] to-card transition-colors"
              >
                <TableCell className="font-medium text-foreground">
                  {manager.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {manager.email}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {manager.phone}
                </TableCell>

                <TableCell>
                  <div className="flex flex-col gap-1">
                    {manager.assignedProperties.map((p: any, i: any) => (
                      <div key={i} className="flex items-center gap-1 text-sm">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{p.title}</span>
                        <span className="text-muted-foreground text-xs">
                          ({p.city})
                        </span>
                      </div>
                    ))}
                  </div>
                </TableCell>

                <TableCell className="text-center font-medium text-foreground">
                  {manager.assignedProperties.length}
                </TableCell>

                <TableCell className="text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Pencil className="w-4 h-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 text-red-500 focus:text-red-500">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}

            {managers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  No managers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}


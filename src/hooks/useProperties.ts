import { api } from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";



export const useGetMyProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await api.get("/api/property/my");
      return data;
    },
  });
};

export const useAddProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post("/api/property/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error: any) => {
      console.error("Error creating property:", error.response?.data || error.message);
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const { data } = await api.put(`/api/property/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return data
    },

    onSuccess: (data) => {
      toast.success("Property updated successfully!")
      queryClient.invalidateQueries({ queryKey: ["properties"] })
      queryClient.invalidateQueries({ queryKey: ["property", data.property?._id] })
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update property")
    },
  })
}


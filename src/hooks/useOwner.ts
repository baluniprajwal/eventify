import { api } from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetMyManagers = (search?: string) => {
  return useQuery({
    queryKey: ["managers", search],
    queryFn: async () => {
      const { data } = await api.get("/api/owner/my-managers", {
        params: search ? { search } : {},
      });
      return data;
    },
  });
};

export const useCreateManager = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: {
      name: string
      email: string
      phone?: string
      password: string
    }) => {
      const { data } = await api.post("/api/owner/create-manager", payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managers"] })
    },
    onError: (error: any) => {
      console.error("Error creating manager:", error.response?.data || error.message)
      throw error
    },
  })
}

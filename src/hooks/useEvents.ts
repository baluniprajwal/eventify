import { api } from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useGetMyEvents = (search?: string) => {
  return useQuery({
    queryKey: ["events", search],
    queryFn: async () => {
      const { data } = await api.get("/api/event/my", {
        params: search ? { search } : {},
      });
      return data;
    },
  });
};

export const useAddEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post("/api/event/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};


import { api } from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";





export const useGetMyBookings = (type?: "property" | "event") => {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const url = type ? `/api/booking/my?type=${type}` : "/api/booking/my";
      const { data } = await api.get(url);
      return data.bookings;
    },
  });
};


export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      bookingId,
      status,
    }: {
      bookingId: string
      status: "Approved" | "Rejected"
    }) => {
      const { data } = await api.patch(`/api/booking/${bookingId}/status`, { status })
      return data
    },
    onSuccess: (_, variables) => {
      // refresh both property & event bookings lists
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    },
  })
}
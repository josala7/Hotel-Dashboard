import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { mutate: createNewBooking, isLoading: isCreating } = useMutation({
    mutationKey: ["create-booking"],
    mutationFn: createBookingAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success("booking is successfully created");
    },

    onError: (error) => toast.error(error.message),
  });
  return { createNewBooking, isCreating };
}

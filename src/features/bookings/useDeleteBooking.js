import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteMyBooking, isLoading: isDeletingBooking } = useMutation(
    {
      mutationFn: (bookingId) => deleteBooking(bookingId),
      onSuccess: () => {
        toast.success(`Booking is successfully deleted`);
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      },
      onError: () => {
        toast.error("There was an error in deleting the booking");
      },
    }
  );

  return { deleteMyBooking, isDeletingBooking };
}

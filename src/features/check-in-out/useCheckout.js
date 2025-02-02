import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: () => {
      toast.success(`Booking is successfully updated`);
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => {
      toast.error("There is some error in check-out");
    },
  });
  return { checkout, isCheckOut };
}

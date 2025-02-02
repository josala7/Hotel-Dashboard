import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isCheckedin, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: () => {
      toast.success(`Booking is successfully updated`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
    onError: () => {
      toast.error("There is some error in check-in");
    },
  });
  return { isCheckedin, checkin };
}

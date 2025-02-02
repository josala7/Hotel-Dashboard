import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    error,
    data: booking,
    isLoading,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    // retry: false, // if there is no data from the first time then dont try to access it many times
  });
  console.log(booking);

  return { isLoading, error, booking };
}

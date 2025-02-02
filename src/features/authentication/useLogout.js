import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: loggingout, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("user logged out successfully");
      //!removeQueries
      // any query should be removed from cache after logging out and thats what removeQueries do
      //! { replace: true } :
      // enhance security by preventing users from going back to authenticated pages once they have logged out.
      // It effectively "replaces" the current page in the browser's history with the new URL,
      //This ensures that the user cannot go back to the previous page using the browser's "back" button,
      //and prevents them from accessing protected pages after logging out.
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.error(error);
      toast.error("There is something wrong with logging out");
    },
  });
  return { loggingout, isLoading };
}

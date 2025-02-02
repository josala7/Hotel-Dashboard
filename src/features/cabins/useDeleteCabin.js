import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  // mutate is to run mutationFn
  // onSuccess is what will you do after mutation successfully
  // onError is what will you do if mutation fails [ there is something wrong in connecting with API]
  // useQueryClient is hook to automaticlly mutate or update  UI without refreshing

  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabinAPI } = useMutation({
    mutationFn: (id) => deleteCabin(id),

    onSuccess: () => {
      // Invalidate every query with a key that starts with `cabins`
      toast.success("cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabinAPI };
}

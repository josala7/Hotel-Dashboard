import { useMutation } from "@tanstack/react-query";
import { SignUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  // const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const { mutate: signningup, isLoading } = useMutation({
    mutationFn: SignUp,
    onSuccess: () => {
      toast.success("user signed up successfully");
    },
  });

  return { signningup, isLoading };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiAuth } from "../../services/apiAuth";

export function useLogin(email, password) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => apiAuth({ email, password }),
    onSuccess: (userData) => {
      //! setQueryData
      // It is to set data into the cache
      queryClient.setQueryData(["user"], userData.user);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error(error);
      toast.error("There is something wrong with email or password");
    },
  });
  return { login, isLoading };
}

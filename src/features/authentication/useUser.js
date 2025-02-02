import { useQuery } from "@tanstack/react-query";
import { apiCurrentUser } from "../../services/apiAuth";
export function useUser() {
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: apiCurrentUser,
  });

  return {
    userData,
    isLoading,
    isAuthenticated: userData?.role === "authenticated",
  };
}

import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  //! store data in cache
  const { isLoading, data: cabins } = useQuery({
    //! identify the key of data
    queryKey: ["cabins"],
    //! read data from API
    queryFn: getCabins,
  });
  return { isLoading, cabins };
}

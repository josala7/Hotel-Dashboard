import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useEditSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isLoading: isEditing } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings Updated Successfully");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: (error) => toast.error("There is error in updating settings"),
  });
  return { updateSettings, isEditing };
}

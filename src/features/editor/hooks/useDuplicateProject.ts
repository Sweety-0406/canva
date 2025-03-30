import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDuplicateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ projectId }: { projectId: string }) => {
      const response = await axios.post(`/api/projects/${projectId}/duplicate`);

      if (response.status !== 200) {
        throw new Error("Failed to duplicate project");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project duplicated successfully");
    },
    onError: () => {
      toast.error("Failed to duplicate project");
    },
  });

  return mutation;
};

import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateProject = (projectId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["project", { projectId }],
    mutationFn: async (json: { json: string; height: number; width: number }) => {
      const response = await axios.patch(`/api/projects/${projectId}`, json);

      if (response.status !== 200) {
        throw new Error("Failed to update project");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", { projectId }] });
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });

  return mutation;
};

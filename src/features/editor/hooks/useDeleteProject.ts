import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useDeleteModal from "./useDeleteModal";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const deleteModal = useDeleteModal()

  const mutation = useMutation({
    mutationFn: async ({ projectId }: { projectId: string }) => {
      const response = await axios.delete(`/api/projects/${projectId}`);

      if (response.status !== 200) {
        throw new Error("Failed to delete project");
      }

      return response.data;
    },
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", { projectId: data.projectId }] });
      toast.success("Project deleted successfully");
      deleteModal.onClose()
    },
    onError: () => {
      toast.error("Failed to delete project");
      deleteModal.onClose()
    },
  });

  return mutation;
};

import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface ProjectData {
    name: string;
    json: string ;
    width: number;
    height: number;
  }

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json:ProjectData) => {
      try {
        const response = await axios.post("/api/projects",json);
        return response.data;
      }catch {
        throw new Error( "Something went wrong");
      }
    },
    onSuccess: () => {
      toast.success("Project created");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Failed to create project");
    }
  });

  return mutation;
};

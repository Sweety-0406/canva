import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProject = (projectId: string) => {
  const query = useQuery({
    enabled: !!projectId,
    queryKey: ["project", { projectId }],
    queryFn: async () => {
      const response = await axios.get(`/api/projects/${projectId}`);

      if (response.status !== 200) {
        throw new Error("Failed to fetch project");
      }

      return response.data.data; // Assuming `data` is nested insprojectIde `response.data`
    },
  });

  return query;
};

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { projectsType } from "../types";

export const useGetProjects = () => {
  const query = useInfiniteQuery<projectsType, Error>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextPage || null,
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get(`/api/projects`, {
        params: {
          page: (pageParam as number).toString(), 
          limit: "5",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch projects");
      }

      return response.data; 
    },
  });

  return query;
};

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { projectsType, templateType } from "../types";

export const useGetTemplates = (page:string,limit: string ) => {
  const query = useQuery({
    queryKey: ["templates", { 
      page: page, 
      limit: limit,
    }],
    queryFn: async () => {
      const response = await axios.get(`/api/projects/templates`, {
        params: {
          page: page,
          limit: limit,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch templates.");
      }
      console.log(response.data.data)
      return response.data.data; 
    },
  });

  return query;
};

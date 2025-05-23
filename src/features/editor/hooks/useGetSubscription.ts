import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetSubscription = () => {
  const query = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/subscription/current");
        console.log( response)
        return response.data.data;
      } catch (error) {
        console.log(error)
        throw new Error("Something went wrong");
      }
    },
  });

  return query;
};

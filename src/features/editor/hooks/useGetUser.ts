
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types";

export const useGetUser = () => {
  const query = useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("/api/users");

      if (response.status !== 200) {
        throw new Error("Failed to fetch user");
      }

      return response.data.data; 
    },
  });

  return query;
};

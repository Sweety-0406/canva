import { toast } from "react-hot-toast";
import { useMutation} from "@tanstack/react-query";
import axios from "axios";

export const useBilling = () => {

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post("/api/subscription/billing");
        return response.data;
      } catch{
        throw new Error( "Failed to create session");
      }
    },
    onSuccess: ({data}) => {
      window.location.href = data
    },
    onError: () => {
      toast.error("Failed to create session");
    }
  });

  return mutation;
};

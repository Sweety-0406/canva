import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCheckout = () => {

  const mutation = useMutation({
    mutationFn: async (pay:"monthly"|"yearly") => {
      try {
        const response = await axios.post("/api/subscription/checkout",{pay});
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

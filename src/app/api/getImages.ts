import clientApi from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useImages = ()=>{
    const query = useQuery({
        queryKey:["images"],
        queryFn: async()=>{
            try {
                const response = await clientApi.get("/api/images")
                if(!response){
                    throw new Error("Failed to fetch the data")
                }
                const {data} = await response.data
                return data
            } catch  {
                throw new Error("Error: something went wrong")
            }
        }
    })

    return query
}
import clientApi from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

export const getImages = ()=>{
    const query = useQuery({
        queryKey:["images"],
        queryFn: async()=>{
            try {
                const response = await clientApi.get("/images")
                console.log("msg:",response)
                if(!response){
                    throw new Error("Failed to fetch the data")
                }
                const {data} = await response.data
                return data
            } catch (error: any) {
                throw new Error(error)
            }
        }
    })

    return query
}
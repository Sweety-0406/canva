import axios from "axios"

const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL
})
 
export default clientApi
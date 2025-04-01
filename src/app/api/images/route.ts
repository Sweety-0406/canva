import { NextResponse } from "next/server";
import { unsplash } from "@/lib/unsplash";
import { auth } from "@/auth";
import axios from "axios";

const DEFAULT_COUNT = 50;
const DEFAULT_COLLECTION_ID = ["317099"]

export async function GET(request: Request, response: Response){
    const session = await auth()
    if(!session?.user) {
        return NextResponse.json({error:"Unathorized"},{status: 401})
    }
    const images = await unsplash.photos.getRandom({
        collectionIds: DEFAULT_COLLECTION_ID,
        count: DEFAULT_COUNT
    })
    if(images.errors){
        return NextResponse.json({error:"Something went wrong"},{status: 400})
    }
    let data = images.response;
    if(!Array.isArray(data)){
        data = [data]
    }
    return NextResponse.json({data: data})
}


export async function POST(req: Request, res: Response){
   try {
     const session = await auth()
     if(!session?.user) {
         return NextResponse.json({error:"Unathorized"},{status: 401})
     }
     const body = await req.json()
     const {search, per_page=24, page=1} = body;
    //  if(search.length===0){
    //     const images = await unsplash.photos.getRandom({
    //         collectionIds: DEFAULT_COLLECTION_ID,
    //         count: DEFAULT_COUNT
    //     })
    //     if(images.errors){
    //         return NextResponse.json({error:"Something went wrong"},{status: 400})
    //     }
    //     let data = images.response;
    //     if(!Array.isArray(data)){
    //         data = [data]
    //     }
    //     return NextResponse.json({
    //         data: data,
    //         total_pages: 3, 
    //         total_results: 50, 
    //         current_page: page,
    //     })
    //  }
     const API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
     const images = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
        page,
        per_page,
        query: search,
        client_id: API_KEY
        }
     });

     return NextResponse.json({
        data: images.data,
        total_pages: images.data.total_pages, 
        total_results: images.data.total, 
        current_page: page,
    })
   } catch (error) {
        console.log(error)
        return NextResponse.json({error: "error"})
   }
}
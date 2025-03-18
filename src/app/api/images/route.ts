import { NextResponse } from "next/server";
import { unsplash } from "@/lib/unsplash";

const DEFAULT_COUNT = 50;
const DEFAULT_COLLECTION_ID = ["317099"]

export async function GET(request: Request, response: Response){
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
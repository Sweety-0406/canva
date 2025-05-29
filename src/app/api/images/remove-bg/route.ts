import { auth } from "@/auth";
import axios from "axios";
import FormData from "form-data";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth()
        if(!session?.user) {
            return NextResponse.json({error:"Unathorized"},{status: 401})
        }
        const { imageUrl } = await req.json(); // Get image URL from request body
        const API_KEY = process.env.REMOVEBG_API_KEY;

        const formData = new FormData();
        formData.append("image_url", imageUrl);
        formData.append("size", "auto");

        const response = await axios.post(
            "https://api.remove.bg/v1.0/removebg",
            formData,
            {
                headers: {
                    "X-Api-Key": API_KEY,
                    ...formData.getHeaders(),
                },
                responseType: "arraybuffer", 
            }
        );

        
        const base64Image = `data:image/png;base64,${Buffer.from(response.data).toString("base64")}`;
        return NextResponse.json({ image: base64Image });
    } catch (error) {
        console.error("Remove.bg Error:", error);
        return Response.json({ error: "Failed to remove background" }, { status: 500 });
    }
}

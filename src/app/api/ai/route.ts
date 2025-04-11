import { auth } from "@/auth";
import axios from "axios";
import FormData from "form-data";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { prompt } = await req.json(); // Get prompt from request body
        const API_KEY = process.env.CLIPDROP_API_KEY;

        const formData = new FormData();
        formData.append("prompt", prompt);

        const response = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            formData,
            {
                headers: {
                    "x-api-key": API_KEY,
                    ...formData.getHeaders(),
                },
                responseType: "arraybuffer",
            }
        );

        const base64Image = `data:image/png;base64,${Buffer.from(response.data).toString("base64")}`;
        return NextResponse.json({ image: base64Image });
    } catch (error) {
        console.error("Clipdrop API Error:", error);
        return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
    }
}

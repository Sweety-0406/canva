


import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mixtral-8x7b-instruct",
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )

    return NextResponse.json(res.data)
  } catch {
    // console.error("OpenRouter API error:", error.response?.data || error.message)
    return NextResponse.json({ error: "Failed to fetch chat response" }, { status: 500 })
  }
}

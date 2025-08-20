// import { NextRequest, NextResponse } from "next/server"

// export async function POST(req: NextRequest) {
//   const { messages } = await req.json()

//   try {
//     const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "mistralai/mixtral-8x7b-instruct",
//         messages,
//       }),
//     })

//     if (!res.ok) {
//       const err = await res.text()
//       console.error("OpenRouter API error:", err)
//       return NextResponse.json({ error: "Failed to fetch chat response" }, { status: res.status })
//     }

//     const data = await res.json()
//     return NextResponse.json(data) 
//   } catch (error) {
//     console.error("Server error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }




import { NextRequest } from "next/server"

export const runtime = "edge" 

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mixtral-8x7b-instruct",
      messages,
      stream: true, 
    }),
  })

  if (!res.ok) {
    return new Response("Failed to connect to OpenRouter", { status: 500 })
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = res.body!.getReader()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n").filter((line) => line.trim() !== "")

        for (const line of lines) {
          if (line === "data: [DONE]") {
            controller.close()
            return
          }
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.replace("data: ", ""))
              const token = json.choices?.[0]?.delta?.content
              if (token) {
                controller.enqueue(encoder.encode(token))
              }
            } catch (err) {
              console.error("Stream error:", err)
            }
          }
        }
      }
    },
  })

  return new Response(stream)
}

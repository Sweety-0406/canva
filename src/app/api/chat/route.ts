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




// import { NextRequest } from "next/server"

// export const runtime = "edge"

// const PIXELFORGE_KNOWLEDGE = {
  
//   pricing: {
//     free: {
//       price: "Free", 
//       features: [
//         "5 projects",
//         "Basic templates",
//         "Standard export quality",
//         "Community support",
//         "1GB storage"
//       ]
//     },
//     proMonthly: {
//       price: "₹400/month",
//       features: [
//         "Unlimited projects",
//         "4K export quality",
//         "Priority support",
//         "Team collaboration",
//         "Advanced tools",
//         "100GB storage"
//       ]
//     },
//     proYearly: {
//       price: "₹4000/year",
//       features: [
//         "Everything in Pro (Monthly)",
//         "Save 15% compared to monthly billing",
//         "Exclusive yearly-only templates",
//         "Team collaboration",
//         "1TB storage",
//         "Dedicated success manager"
//       ]
//     },
    
//   },

//   // PROJECT CREATION 
//   projectCreation: {
//     steps: [
//       "Step 1: Sign up or log in to create a project.",
//       "Step 2: After logging in, you will be redirected to the dashboard.", 
//       "Step 3: On the dashboard, click + Start New Project. A new project will be created and added to your project list."
//     ],
//     templates: [
//       "For You",
//       "Education",
//       "Marketing",
//       "Print Products",
//       "Cards & Invitations",
//       "Social Media",
//       "Youtubb Thumbnail",
//       "Business",
//       "Wallpaper",
//       "Logo",
//       "Flyer",
//       "Poster"
//     ]
//   },


//   // SUPPORTED FORMATS 
//   supportedFormats: {
//     import: ["json"],
//     export: ["pdf", "json", "png", "jpeg", "svg"]
//   }
// }

// // PixelForge knowledge base 
// const PIXELFORGE_CONTEXT = `
// You are an AI assistant for PixelForge, a design platform that helps creators, teams, and businesses create stunning visuals. Here's what you need to know about PixelForge:

// ABOUT PIXELFORGE:
// - PixelForge is an intuitive design platform for creators, teams, and businesses
// - Users can create social media graphics, presentations, and other visual content
// - The platform offers professional-grade editing tools that are easy to use
// - It's cloud-powered with automatic saving and unlimited storage

// KEY FEATURES:
// - Intuitive Design Tools: Professional-grade editing tools for all skill levels
// - Lightning Fast: Cloud-powered performance with instant loading
// - Team Collaboration: Real-time collaboration with commenting, sharing, and version control
// - Multi-Platform: Works on desktop, tablet, and mobile with seamless syncing
// - Cloud Storage: Unlimited storage with automatic backups
// - Enterprise Security: Bank-level security with SSO and team management

// ACTUAL PRICING:
// Free Plan: ${PIXELFORGE_KNOWLEDGE.pricing.free.price}
// - ${PIXELFORGE_KNOWLEDGE.pricing.free.features.join('\n- ')}

// Pro Monthly Plan: ${PIXELFORGE_KNOWLEDGE.pricing.proMonthly.price}
// - ${PIXELFORGE_KNOWLEDGE.pricing.proMonthly.features.join('\n- ')}

// Pro Yearly Plan: ${PIXELFORGE_KNOWLEDGE.pricing.proYearly.price}
// - ${PIXELFORGE_KNOWLEDGE.pricing.proYearly.features.join('\n- ')}


// HOW TO CREATE A PROJECT:
// ${PIXELFORGE_KNOWLEDGE.projectCreation.steps.join('\n')}

// Available Templates:
// ${PIXELFORGE_KNOWLEDGE.projectCreation.templates.join(', ')}

// SUPPORTED FILE FORMATS:
// Import: ${PIXELFORGE_KNOWLEDGE.supportedFormats.import.join(', ')}
// Export: ${PIXELFORGE_KNOWLEDGE.supportedFormats.export.join(', ')}

// WEBSITE SECTIONS:
// - Hero: Main design platform introduction
// - Features: Detailed feature explanations
// - Stats: Trusted by millions worldwide with high uptime
// - Testimonials: Reviews from creative professionals
// - Pricing: Flexible plans for different needs
// - Contact: Schedule calls or send messages with 24-hour response time

// IMPORTANT RESPONSE GUIDELINES:
// - Always direct pricing questions to: https://pixelforge-xi.vercel.app/landingPage#pricing
// - For support questions, direct to: https://pixelforge-xi.vercel.app/landingPage#contact
// - Only mention features and information explicitly provided in this context

// Always be helpful, friendly, and focus on how PixelForge can solve design challenges. If asked about specific technical implementation or features not mentioned, guide users to contact support or explore the platform.
// `

// interface ChatMessage {
//   role: 'system' | 'user' | 'assistant';
//   content: string;
// }

// export async function POST(req: NextRequest) {
//   const { messages }: { messages: ChatMessage[] } = await req.json()

//   // Add system context to make the AI knowledgeable about PixelForge
//   const systemMessage: ChatMessage  = {
//     role: "system",
//     content: PIXELFORGE_CONTEXT
//   }

//   // Enhance user messages with context if they seem website-related
//   const enhancedMessages: ChatMessage[] = [systemMessage, ...messages.map((msg: ChatMessage ) => {
//     if (msg.role === "user") {
//       // Add context clues for better responses
//       const contextualContent = `${msg.content}

// Context: This question is about PixelForge design platform (https://pixelforge-xi.vercel.app/). 
// Please provide helpful, specific answers related to our design tools, features, pricing, or getting started.`
      
//       return {
//         ...msg,
//         content: contextualContent
//       }
//     }
//     return msg
//   })]

//   const encoder = new TextEncoder()
//   const decoder = new TextDecoder()

//   try {
//     const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "mistralai/mixtral-8x7b-instruct",
//         messages: enhancedMessages,
//         stream: true,
//         temperature: 0.7,  
//         max_tokens: 1000, 
//       }),
//     })

//     if (!res.ok) {
//       return new Response("Failed to connect to OpenRouter", { status: 500 })
//     }

//     const stream = new ReadableStream({
//       async start(controller) {
//         const reader = res.body!.getReader()

//         while (true) {
//           const { done, value } = await reader.read()
//           if (done) break

//           const chunk = decoder.decode(value, { stream: true })
//           const lines = chunk.split("\n").filter((line) => line.trim() !== "")

//           for (const line of lines) {
//             if (line === "data: [DONE]") {
//               controller.close()
//               return
//             }
//             if (line.startsWith("data: ")) {
//               try {
//                 const json = JSON.parse(line.replace("data: ", ""))
//                 const token = json.choices?.[0]?.delta?.content
//                 if (token) {
//                   controller.enqueue(encoder.encode(token))
//                 }
//               } catch (err) {
//                 console.error("Stream error:", err)
//               }
//             }
//           }
//         }
//       }, 
//     })
  
//     return new Response(stream)
//   } catch (error) {
//     console.error("API Error:", error)
//     return new Response("Internal server error", { status: 500 })
//   }
// }




import { NextRequest } from "next/server"

export const runtime = "edge"

const PIXELFORGE_KNOWLEDGE = {
  pricing: {
    free: {
      price: "Free", 
      features: [
        "5 projects",
        "Basic templates", 
        "Standard export quality",
        "Community support",
        "1GB storage"
      ]
    },
    proMonthly: {
      price: "₹400/month",
      features: [
        "Unlimited projects",
        "4K export quality",
        "Priority support", 
        "Team collaboration",
        "Advanced tools",
        "100GB storage"
      ]
    },
    proYearly: {
      price: "₹4000/year",
      features: [
        "Everything in Pro (Monthly)",
        "Save 15% compared to monthly billing",
        "Exclusive yearly-only templates",
        "Team collaboration",
        "1TB storage",
        "Dedicated success manager"
      ]
    }
  },
  projectCreation: {
    steps: [
      "Step 1: Sign up or log in to create a project.",
      "Step 2: After logging in, you will be redirected to the dashboard.", 
      "Step 3: On the dashboard, click + Start New Project. A new project will be created and added to your project list."
    ],
    templates: [
      "For You", "Education", "Marketing", "Print Products",
      "Cards & Invitations", "Social Media", "YouTube Thumbnail", 
      "Business", "Wallpaper", "Logo", "Flyer", "Poster"
    ]
  },
  supportedFormats: {
    import: ["json"],
    export: ["pdf", "json", "png", "jpeg", "svg"]
  }
}

const PIXELFORGE_CONTEXT = `
You are an AI assistant for PixelForge, a design platform that helps creators, teams, and businesses create stunning visuals. Here's what you need to know about PixelForge:

ABOUT PIXELFORGE:
- PixelForge is an intuitive design platform for creators, teams, and businesses
- Users can create social media graphics, presentations, and other visual content
- The platform offers professional-grade editing tools that are easy to use
- It's cloud-powered with automatic saving and unlimited storage

KEY FEATURES:
- Intuitive Design Tools: Professional-grade editing tools for all skill levels
- Lightning Fast: Cloud-powered performance with instant loading
- Team Collaboration: Real-time collaboration with commenting, sharing, and version control
- Multi-Platform: Works on desktop, tablet, and mobile with seamless syncing
- Cloud Storage: Unlimited storage with automatic backups
- Enterprise Security: Bank-level security with SSO and team management

ACTUAL PRICING:
Free Plan: ${PIXELFORGE_KNOWLEDGE.pricing.free.price}
- ${PIXELFORGE_KNOWLEDGE.pricing.free.features.join('\n- ')}

Pro Monthly Plan: ${PIXELFORGE_KNOWLEDGE.pricing.proMonthly.price}
- ${PIXELFORGE_KNOWLEDGE.pricing.proMonthly.features.join('\n- ')}

Pro Yearly Plan: ${PIXELFORGE_KNOWLEDGE.pricing.proYearly.price}
- ${PIXELFORGE_KNOWLEDGE.pricing.proYearly.features.join('\n- ')}

HOW TO CREATE A PROJECT:
${PIXELFORGE_KNOWLEDGE.projectCreation.steps.join('\n')}

Available Templates:
${PIXELFORGE_KNOWLEDGE.projectCreation.templates.join(', ')}

SUPPORTED FILE FORMATS:
Import: ${PIXELFORGE_KNOWLEDGE.supportedFormats.import.join(', ')}
Export: ${PIXELFORGE_KNOWLEDGE.supportedFormats.export.join(', ')}

IMPORTANT RESPONSE GUIDELINES:
- Always direct pricing questions to: https://pixelforge-xi.vercel.app/landingPage#pricing
- For support questions, direct to: https://pixelforge-xi.vercel.app/landingPage#contact
- Only mention features and information explicitly provided in this context
- Provide clear, well-formatted responses
- Use proper grammar and complete sentences

Always be helpful, friendly, and focus on how PixelForge can solve design challenges.
`

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    // Input validation
    const body = await req.json()
    const { messages }: { messages: ChatMessage[] } = body

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 })
    }

    // API key validation
    if (!process.env.OPENROUTER_API_KEY) {
      return new Response("API key not configured", { status: 500 })
    }

    const systemMessage: ChatMessage = {
      role: "system",
      content: PIXELFORGE_CONTEXT
    }

    // Only add context to the latest user message to avoid repetition
    const enhancedMessages: ChatMessage[] = [systemMessage, ...messages]

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mixtral-8x7b-instruct",
        messages: enhancedMessages,
        stream: true,
        temperature: 0.3, // Lower temperature for more consistent responses
        max_tokens: 800,
        top_p: 0.9,
      }),
    })

    if (!res.ok) {
      throw new Error(`OpenRouter API error: ${res.status}`)
    }

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        const reader = res.body!.getReader()
        let buffer = "" // Buffer for incomplete chunks

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            // Decode and add to buffer
            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            
            // Keep the last potentially incomplete line in buffer
            buffer = lines.pop() || ""

            for (const line of lines) {
              const trimmedLine = line.trim()
              if (!trimmedLine) continue
              
              if (trimmedLine === "data: [DONE]") {
                controller.close()
                return
              }
              
              if (trimmedLine.startsWith("data: ")) {
                try {
                  const jsonStr = trimmedLine.slice(6) // Remove "data: "
                  if (jsonStr === "[DONE]") continue
                  
                  const parsed = JSON.parse(jsonStr)
                  const content = parsed.choices?.[0]?.delta?.content
                  
                  if (content) {
                    controller.enqueue(encoder.encode(content))
                  }
                } catch (parseError) {
                  console.error("Parse error:", parseError, "Line:", trimmedLine)
                  // Continue processing other lines
                }
              }
            }
          }
        } catch (streamError) {
          console.error("Stream error:", streamError)
          controller.error(streamError)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error("API Error:", error)
    return new Response(
      JSON.stringify({ error: "Internal server error" }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
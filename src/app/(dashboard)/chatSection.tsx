// "use client"

// import { useState, useRef, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Send, Sparkles, MessageCircle } from "lucide-react"
// import { RxCross2 } from "react-icons/rx"

// interface Message {
//   role: string
//   content: string
//   timestamp?: Date
// }

// const ChatSection = () => {
//   const [open, setOpen] = useState(false)
//   const [messages, setMessages] = useState<Message[]>([])
//   const [input, setInput] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const bottomRef = useRef<HTMLDivElement | null>(null)

//   // Quick action buttons for common questions
//   const quickActions = [
//     "How do I get started?",
//     "What's included in the free plan?",
//     "How to create a project?",
//     "How many templates are there in PixelForge?"
//   ]

//   const sendMessage = async (messageContent?: string) => {
//     const messageToSend = messageContent || input
//     if (!messageToSend.trim()) return
    
//     const userMessage: Message = { 
//       role: "user", 
//       content: messageToSend,
//       timestamp: new Date()
//     }
//     const newMessages = [...messages, userMessage]
//     setMessages(newMessages)
//     setInput("")
//     setIsLoading(true)

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: newMessages }),
//       })

//       if (!res.body) throw new Error("No response body")

//       const reader = res.body.getReader()
//       const decoder = new TextDecoder()
//       const assistantMessage: Message = { 
//         role: "assistant", 
//         content: "",
//         timestamp: new Date()
//       }
//       setMessages((prev) => [...prev, assistantMessage])

//       while (true) {
//         const { done, value } = await reader.read()
//         if (done) break
//         const chunk = decoder.decode(value, { stream: true })

//         assistantMessage.content += chunk
//         setMessages((prev) => {
//           const updated = [...prev]
//           updated[updated.length - 1] = { ...assistantMessage }
//           return updated
//         })
//       }
//     } catch (err) {
//       console.error("Chat error:", err)
//       setMessages(prev => [...prev, {
//         role: "assistant",
//         content: "Sorry, I'm having trouble connecting right now. Please try again or contact our support team.",
//         timestamp: new Date()
//       }])
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleQuickAction = (question: string) => {
//     sendMessage(question)
//   }

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])


//   return (
//     <>      
//       {/* Floating Action Button */}
//       <motion.button
//         onClick={() => setOpen(true)}
//         className={`fixed bottom-6 right-6 bg-gradient-to-r from-[#7d2ae7] to-[#6420ff] text-white size-14 rounded-full shadow-xl z-50 flex items-center justify-center hover:shadow-2xl transition-all duration-300 ${open && "scale-0 pointer-events-none"}`}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//       >
//         <MessageCircle size={24} />
//       </motion.button>

//       {/* Chatbox */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: 100, scale: 0.8 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 100, scale: 0.8 }}
//             transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
//             className="fixed bottom-6 right-6 w-[380px] h-[500px] bg-white border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-center bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] text-white py-3 px-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//                   <Sparkles size={16} />
//                 </div>
//                 <div>
//                   <h1 className="text-sm font-semibold">PixelForge AI</h1>
//                   <p className="text-xs text-white/80">Always here to help</p>
//                 </div>
//               </div>
//               <button 
//                 className="p-1 hover:bg-white/20 rounded-full transition-colors"
//                 onClick={() => setOpen(false)}
//               >
//                 <RxCross2 size={20} />
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
//               {messages.length === 0 && (
//                 <div className="flex flex-col items-center justify-center h-full text-center">
//                   <div className="text-4xl bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] bg-clip-text text-transparent font-bold mb-2">
//                     PixelForge
//                   </div>
//                   <p className="text-sm text-gray-600 mb-4 max-w-[250px]">
//                     I&apos;m here to help you with anything about PixelForge!
//                   </p>
                  
//                   {/* Quick Actions */}
//                   <div className="space-y-2 w-full">
//                     <p className="text-xs text-gray-500 font-medium">Quick Questions:</p>
//                     {quickActions.map((action, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => handleQuickAction(action)}
//                         className="w-full text-left px-3 py-2 bg-white rounded-lg border hover:border-[#7d2ae7] hover:bg-purple-50 transition-all text-sm text-gray-700"
//                       >
//                         {action}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               {messages.map((msg, idx) => ( 
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-[85%] px-3 py-2 rounded-xl whitespace-pre-wrap text-sm ${
//                       msg.role === "user"
//                         ? "bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] text-white rounded-br-md"
//                         : "bg-white text-gray-800 border rounded-bl-md shadow-sm"
//                     }`}
//                   >
//                     {msg.content}
//                   </div>
//                 </motion.div>
//               ))}
              
//               {/* Loading indicator */}
//               {isLoading && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   className="flex justify-start"
//                 >
//                   <div className="bg-white border rounded-2xl rounded-bl-md p-3 shadow-sm">
//                     <div className="flex space-x-1">
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
              
//               <div ref={bottomRef} />
//             </div>

//             {/* Input */}
//             <div className="p-3 bg-white border-t">
//               <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
//                 <input
//                   className="flex-1 text-sm bg-transparent outline-none placeholder-gray-500"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
//                   placeholder="Ask about PixelForge..."
//                   disabled={isLoading}
//                 />
//                 <button
//                   onClick={() => sendMessage()}
//                   disabled={!input.trim() || isLoading}
//                   className={`p-2 rounded-full transition-all ${
//                     input.trim() && !isLoading
//                       ? "bg-gradient-to-r from-[#7d2ae7] to-[#6420ff] text-white hover:scale-105"
//                       : "text-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   <Send size={16} />
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500 text-center mt-2">
//                 AI-powered by PixelForge • Always improving
//               </p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }

// export default ChatSection


"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles, MessageCircle } from "lucide-react"
import { RxCross2 } from "react-icons/rx"

interface Message {
  role: string
  content: string
  timestamp?: Date
}

const ChatSection = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const quickActions = [
    "How do I get started?",
    "What's included in the free plan?", 
    "How to create a project?",
    "How many templates are there in PixelForge?"
  ]

  const sendMessage = async (messageContent?: string) => {
    const messageToSend = messageContent || input
    if (!messageToSend.trim() || isLoading) return
    
    const userMessage: Message = { 
      role: "user", 
      content: messageToSend,
      timestamp: new Date()
    }
    
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    // Add placeholder for assistant response
    const assistantMessage: Message = { 
      role: "assistant", 
      content: "",
      timestamp: new Date()
    }
    setMessages(prev => [...prev, assistantMessage])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      if (!res.body) {
        throw new Error("No response body")
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ""

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          assistantContent += chunk

          // Update the assistant message with accumulated content
          setMessages(prev => {
            const updated = [...prev]
            updated[updated.length - 1] = {
              ...assistantMessage,
              content: assistantContent
            }
            return updated
          })
        }
      } catch (streamError) {
        console.error("Stream reading error:", streamError)
        throw streamError
      }

    } catch (error) {
      console.error("Chat error:", error)
      
      // Remove the placeholder message and add error message
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment, or contact our support team if the issue persists.",
          timestamp: new Date()
        }
        return updated
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (question: string) => {
    if (!isLoading) {
      sendMessage(question)
    }
  }

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoading])

  return (
    <>      
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-[#7d2ae7] to-[#6420ff] text-white size-14 rounded-full shadow-xl z-50 flex items-center justify-center hover:shadow-2xl transition-all duration-300 ${open && "scale-0 pointer-events-none"}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chatbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed bottom-6 right-6 w-[380px] h-[500px] bg-white border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] text-white py-3 px-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h1 className="text-sm font-semibold">PixelForge AI</h1>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <button 
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                onClick={() => setOpen(false)}
              >
                <RxCross2 size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-4xl bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] bg-clip-text text-transparent font-bold mb-2">
                    PixelForge
                  </div>
                  <p className="text-sm text-gray-600 mb-4 max-w-[250px]">
                    I&apos;m here to help you with anything about PixelForge!
                  </p>
                  
                  {/* Quick Actions */}
                  <div className="space-y-2 w-full">
                    <p className="text-xs text-gray-500 font-medium">Quick Questions:</p>
                    {quickActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickAction(action)}
                        disabled={isLoading}
                        className="w-full text-left px-3 py-2 bg-white rounded-lg border hover:border-[#7d2ae7] hover:bg-purple-50 transition-all text-sm text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {messages.map((msg, idx) => ( 
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] text-white rounded-br-md"
                        : "bg-white text-gray-800 border rounded-bl-md shadow-sm"
                    }`}
                  >
                    {msg.content || (msg.role === "assistant" && isLoading && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
              
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t">
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg">
                <input
                  className="flex-1 text-sm bg-transparent outline-none placeholder-gray-500"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                  placeholder="Ask about PixelForge..."
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className={`p-2 rounded-full transition-all ${
                    input.trim() && !isLoading
                      ? "bg-gradient-to-r from-[#7d2ae7] to-[#6420ff] text-white hover:scale-105"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                AI-powered by PixelForge • Always improving
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatSection
// components/ChatWidget.tsx

"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"
import axios from "axios"
import { FaQuestion } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const ChatSection = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const sendMessage = async () => {
    if (!input.trim()) return
    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")

    try {
      const res = await axios.post("/api/chat", {
        messages: newMessages,
      })

      const assistantMessage = res.data?.choices?.[0]?.message
      if (assistantMessage?.content) {
        setMessages([...newMessages, assistantMessage])
      }
    } catch (err) {
      console.error("Chat error:", err)
    }
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      {/* Floating Button */}
      
      <motion.button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 bg-[#7d2ae7] text-white w-12 h-12 rounded-full shadow-xl z-50 flex items-center justify-center ${open && "cursor-not-allowed scale-100"}`}
        whileHover={{ scale: 1.1 }}
      >
        <FaQuestion />
      </motion.button>

      {/* Chatbox */}
      <AnimatePresence>
        {open && (
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-24 right-6 w-[300px] h-[420px] bg-white border rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
            >
                {/* Header */}
                <div className="flex justify-between border-b py-2 px-4">
                    <div className="flex flex-col  ">
                        <h1 className="text-sm font-semibold">Ask PixelForge</h1>
                        <p className="text-xs text-gray-500">Get AI-powered help</p>
                    </div>
                    <div className="mt-2  cursor-pointer " onClick={()=>setOpen(false)}>
                        <RxCross2 size={20}/>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
                    {messages.length==0 && (
                        <div className="flex flex-col mt-20 justify-center items-center ">
                            <div className="  mt-1 text-3xl bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] bg-clip-text text-transparent" style={{ fontFamily: "'Brush Script MT', cursive" }}>PixelForge</div>
                            <p className="text-xs w-[154px] text-center text-gray-500">Need assistance? I can answer questions, explain features, or guide you through tasks!</p>
                        </div>
                    )}
                {messages.map((msg, idx) => ( 
                    <div
                        key={idx}
                        className={`p-2 rounded-md whitespace-pre-wrap ${
                            msg.role === "user"
                            ? "bg-gray-100 text-black text-right self-end ml-auto"
                            : "bg-gray-50 text-gray-800"
                        } max-w-[80%]`}
                    >
                        {msg.content}
                    </div>
                ))}
                <div ref={bottomRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
                    <input
                    className="flex-1 text-sm bg-transparent outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="How can I help?"
                    />
                    <button
                    onClick={sendMessage}
                    className={` hover:text-gray-600 ${input.length>0 ? "text-gray-600":"text-gray-400"}`}
                    >
                    <Send size={18} />
                    </button>
                </div>
                </div>
            </motion.div>
        )}

      </AnimatePresence>
    </>
  )
}

export default ChatSection

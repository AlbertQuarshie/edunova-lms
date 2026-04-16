import React, { useState, useEffect, useRef } from "react";
import { Bot, Send, X, MessageSquare, Loader2 } from "lucide-react";
import { askTutor } from "../../services/aiService";

const AITutor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi! I'm your EduNova assistant. Ask me about our courses!" },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    const aiResponse = await askTutor(userText);
    
    setMessages((prev) => [...prev, { role: "model", text: aiResponse }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-sans">
      {isOpen ? (
        <div className="flex flex-col w-[350px] md:w-[400px] h-[550px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#0f172a] p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl"><Bot size={20} /></div>
              <div>
                <h3 className="font-bold text-sm">EduNova AI</h3>
                <span className="text-[10px] text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Online
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg"><X size={20} /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${
                  msg.role === "user" ? "bg-blue-600 text-white shadow-md" : "bg-white text-slate-700 border border-slate-100 shadow-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <Loader2 className="animate-spin text-blue-600 mx-auto" size={20} />}
            <div ref={scrollRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about courses..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button disabled={loading} className="bg-[#0f172a] text-white p-2.5 rounded-xl hover:bg-blue-600 transition-colors">
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all border-2 border-white"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

export default AITutor;
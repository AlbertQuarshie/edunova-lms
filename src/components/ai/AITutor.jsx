import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { askTutor } from '../../services/aiService'; // This is all you need
import { db } from '../../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const AITutor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your EduNova Tutor. Ask me anything about our courses!' }
  ]);
  const [loading, setLoading] = useState(false);
  const [courseContext, setCourseContext] = useState(''); // Store courses here
  const scrollRef = useRef(null);

  // 1. Fetch courses from Firestore on mount
  useEffect(() => {
    const loadCourseData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courses = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return `${data.title} (${data.category}): ${data.description}`;
        }).join('\n');
        
        setCourseContext(courses);
      } catch (error) {
        console.error("Error loading courses for AI:", error);
      }
    };
    loadCourseData();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // 2. Pass both input AND course context to the service
    const response = await askTutor(input, courseContext); 
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-sans">
      {/* ... (Keep your existing Toggle Button and Chat Window JSX exactly the same) ... */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#0f172a] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
        >
          <MessageSquare size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold text-sm">
            Ask Tutor
          </span>
        </button>
      )}

      {/* Chat Window logic remains unchanged */}
      {isOpen && (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
           <div className="bg-[#0f172a] p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Bot size={20} />
              </div>
              <div>
                <p className="font-bold text-sm leading-none">EduNova AI</p>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">Online Tutor</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl border border-gray-100 rounded-tl-none">
                  <Loader2 className="animate-spin text-blue-600" size={18} />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our courses..."
              className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button type="submit" className="bg-[#0f172a] text-white p-2 rounded-xl hover:bg-blue-600 transition-colors">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AITutor;
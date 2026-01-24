import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BRAND_NAME } from '../constants';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Namaste! I am the ${BRAND_NAME} Assistant. How can I help you navigate your stars today?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    if (!navigator.onLine) {
      const offlineMsg: Message = {
        id: Date.now().toString(),
        text: "I am unable to connect to the celestial realms while you are offline. Please reconnect to chat!",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, offlineMsg]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    const aiMsgId = (Date.now() + 1).toString();
    const placeholderMsg: Message = {
      id: aiMsgId,
      text: '',
      sender: 'ai',
      timestamp: new Date()
    };

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: currentInput,
        config: {
          systemInstruction: `You are the AI Assistant for ${BRAND_NAME}, the Vedic Astrology platform of Pandit Srijan Sharma. You assist users with service inquiries (Birth Chart, Marriage, Career, Vastu, Gemstones), booking help, and general Vedic wisdom. Be spiritual, polite, and concise. If users ask for a full chart reading, politely suggest they 'Book a Consultation' with Srijan Ji. Keep responses under 50 words.`,
          temperature: 0.7,
        }
      });

      setMessages(prev => [...prev, placeholderMsg]);
      
      let fullResponseText = '';
      for await (const chunk of responseStream) {
        const textChunk = chunk.text;
        if (textChunk) {
          fullResponseText += textChunk;
          setMessages(prev => 
            prev.map(m => m.id === aiMsgId ? { ...m, text: fullResponseText } : m)
          );
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "The celestial connection is currently flickering. Please reach out to Srijan Ji directly via WhatsApp at 9915959360 for immediate assistance.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => prev.filter(m => m.id !== aiMsgId).concat(errorMessage));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[300]">
      <div className={`absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col transition-all duration-500 transform ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-20 pointer-events-none'}`}>
        <div className="p-6 deep-blue-gradient text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-indigo-900 shadow-lg">
              <i className="fas fa-dharmachakra"></i>
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm">{BRAND_NAME} Support</h4>
              <p className="text-[10px] text-amber-200 uppercase tracking-widest font-bold">
                {navigator.onLine ? 'Connected to Stars' : 'Offline Mode'}
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'
              }`}>
                {msg.text || (msg.sender === 'ai' && <span className="inline-block w-2 h-4 bg-slate-300 animate-pulse"></span>)}
              </div>
            </div>
          ))}
          {isTyping && messages[messages.length-1]?.text === '' && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
            {["Birth Chart?", "Marriage Match", "Vastu Fixes"].map(hint => (
              <button 
                key={hint}
                onClick={() => setInput(hint)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider hover:bg-amber-100 hover:text-amber-700 transition-colors"
              >
                {hint}
              </button>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={navigator.onLine ? "Ask Srijan Ji's AI..." : "You are currently offline..."}
              disabled={!navigator.onLine || isTyping}
              className="flex-grow px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all disabled:bg-slate-50"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping || !navigator.onLine}
              className="w-12 h-12 rounded-xl gold-gradient text-indigo-950 flex items-center justify-center shadow-lg disabled:opacity-50 transition-all hover:scale-105 active:scale-90"
            >
              <i className={`fas ${isTyping ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
            </button>
          </form>
          <div className="mt-4 pt-3 border-t border-slate-50 text-center">
            <a 
              href="https://wa.me/919915959360" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-green-600 uppercase tracking-widest hover:text-green-700 flex items-center justify-center gap-2"
            >
              <i className="fab fa-whatsapp text-sm"></i> Connect Directly with Srijan Sharma
            </a>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full gold-gradient text-indigo-950 shadow-[0_15px_30px_rgba(255,174,0,0.4)] flex items-center justify-center text-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-[301]"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'} transition-transform duration-300`}></i>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce border-2 border-white">
            <i className="fas fa-star text-[8px]"></i>
          </span>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
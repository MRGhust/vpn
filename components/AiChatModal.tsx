import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { XMarkIcon } from './icons/XMarkIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';

interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Message = {
  role: 'user' | 'model';
  text: string;
};

const AiChatModal: React.FC<AiChatModalProps> = ({ isOpen, onClose }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const systemInstruction = `شما یک دستیار پشتیبانی مفید برای «آنتی سم پینگ» هستید. شما توسط تیم «آنتی سم پینگ» ساخته شده‌اید. سرویس «آنتی سم پینگ» از طریق یک فایل کانفیگ OpenVPN که پس از خرید به کاربر ارائه می‌شود، کار می‌کند. برای فعال‌سازی سرویس، کاربران باید نام کاربری و رمز عبوری را که هنگام خرید دریافت کرده‌اند، در این فایل کانفیگ وارد کنند. وظیفه اصلی شما پاسخ به سوالات کاربران در مورد سرویس بر اساس این اطلاعات است.`;

  useEffect(() => {
    if (isOpen) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const chatInstance = ai.chats.create({
          model: 'gemini-2.5-flash-preview-04-17',
          config: {
            systemInstruction: systemInstruction,
          },
        });
        setChat(chatInstance);
        setMessages([{ role: 'model', text: 'سلام! من دستیار هوش مصنوعی آنتی سم پینگ هستم. چطور می‌توانم کمکتان کنم؟' }]);
      } catch (error) {
         console.error("AI initialization failed:", error);
         setMessages([{ role: 'model', text: 'متاسفانه امکان اتصال به دستیار هوشمند وجود ندارد.' }]);
      }
    } else {
        // Reset state when modal is closed
        setMessages([]);
        setInput('');
        setIsLoading(false);
        setChat(null);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chat || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const stream = await chat.sendMessageStream({ message: currentInput });
      
      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        modelResponse += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = modelResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'model', text: "متاسفانه مشکلی در ارتباط با سرور پیش آمد. لطفا دوباره تلاش کنید." }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-slate-800 rounded-2xl w-full max-w-lg h-[80vh] max-h-[700px] flex flex-col shadow-2xl shadow-purple-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">پشتیبانی هوش مصنوعی</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <XMarkIcon />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-lg' : 'bg-slate-700 text-slate-200 rounded-bl-lg'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex items-end gap-2 justify-start">
              <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-slate-700 text-slate-200 rounded-bl-lg">
                <div className="flex items-center gap-2">
                   <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-75"></span>
                   <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></span>
                   <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="flex-grow bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
            disabled={isLoading}
          />
          <button type="submit" className="bg-cyan-500 text-white rounded-lg p-3 disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-cyan-600 transition-colors" disabled={isLoading || !input.trim()}>
            <PaperAirplaneIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiChatModal;


import React, { useEffect, useMemo, useRef, useState } from 'react';
import { generateAIResponse } from '../services/geminiService';
import { Product, User } from '../types';

type ChatAssistantProps = {
  currentUser: User | null;
  products: Product[];
};

type ChatMessage = {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
};

const ChatAssistant: React.FC<ChatAssistantProps> = ({ currentUser, products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou seu assistente Sellar. Como posso ajudar com seus leilões ou vendas hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const contextSnapshot = useMemo(() => {
    const userLabel = currentUser
      ? `${currentUser.name} (${currentUser.role || currentUser.type})`
      : 'Visitante';
    const topProducts = products.slice(0, 5).map(p => (
      `${p.title} — ${p.category} — R$ ${p.price.toLocaleString()}${p.isAuction ? ' (Leilão)' : ''}`
    ));
    return [
      `Usuário atual: ${userLabel}.`,
      topProducts.length ? `Amostra de produtos: ${topProducts.join(' | ')}.` : 'Sem produtos carregados.'
    ].join(' ');
  }, [currentUser, products]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-sellar-chat', handleOpen);
    return () => window.removeEventListener('open-sellar-chat', handleOpen);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const prompt = `${contextSnapshot}\n\nPergunta do usuário: ${userMsg}`;
      const aiResponse = await generateAIResponse(prompt, history);
      setMessages(prev => [...prev, { role: 'model', text: aiResponse || 'Desculpe, não consegui responder agora.' }]);
    } catch (error) {
      const isMissingKey = error instanceof Error
        && /Missing GEMINI API key/i.test(error.message);
      const message = isMissingKey
        ? 'A IA ainda nao foi configurada. Defina `VITE_GEMINI_API_KEY` no arquivo `.env.local` e reinicie o app.'
        : error instanceof Error
          ? `Erro ao processar: ${error.message}`
          : 'Erro ao processar. Verifique sua conexao.';
      setMessages(prev => [...prev, { role: 'model', text: message, isError: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      {isOpen ? (
        <div className="bg-white w-80 h-[460px] rounded-[28px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#002B5B] p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <i className="fa-solid fa-robot text-white text-xs"></i>
              </div>
              <span className="text-white text-xs font-bold uppercase tracking-widest">Sellar Guard</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-[#002B5B] text-white rounded-br-none'
                    : m.isError
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 rounded-bl-none'
                      : 'bg-slate-100 text-slate-700 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 p-3 rounded-2xl flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pergunte algo..."
                className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-indigo-500"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center"
                aria-label="Enviar mensagem"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-[#002B5B] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform border-4 border-white"
          aria-label="Abrir chat"
        >
          <i className="fa-solid fa-comment-dots text-xl"></i>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
        </button>
      )}
    </div>
  );
};

export default ChatAssistant;

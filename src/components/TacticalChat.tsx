import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, ShieldAlert } from 'lucide-react';
import { askTacticalAdvisor } from '../services/geminiService';

interface TacticalChatProps {
  context: any;
}

export const TacticalChat: React.FC<TacticalChatProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    
    const userMsg = message;
    setMessage('');
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await askTacticalAdvisor(userMsg, context);
    
    setChat(prev => [...prev, { role: 'ai', text: response || 'Ufficiale non disponibile.' }]);
    setIsTyping(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-superearth-yellow text-black p-4 rounded-full shadow-[0_0_20px_rgba(255,225,0,0.4)] z-50 hover:scale-110 transition-transform group"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-12 right-0 bg-superearth-dark text-superearth-yellow border border-superearth-yellow px-3 py-1 text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Consulente Tattico</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-8 w-80 md:w-96 h-[500px] bg-superearth-dark border-2 border-superearth-yellow shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="bg-superearth-yellow p-4 text-black flex justify-between items-center">
               <div className="flex items-center gap-2">
                 <ShieldAlert className="w-5 h-5" />
                 <span className="font-black uppercase tracking-tighter italic">Quartier Generale</span>
               </div>
               <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide bg-superearth-grey/10">
              <div className="bg-superearth-yellow/10 border border-superearth-yellow/20 p-3 text-xs italic opacity-80">
                Benvenuto, Helldiver. Qui puoi ricevere istruzioni tattiche strategiche approvate dal Ministero della Verità.
              </div>
              
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-superearth-yellow/20 border border-superearth-yellow/40 text-superearth-yellow' 
                      : 'bg-superearth-grey border border-white/10 text-white italic'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-superearth-grey p-3 text-xs animate-pulse font-mono">CRITTOGRAFIA UPLINK IN CORSO...</div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-superearth-yellow/20 flex gap-2 bg-superearth-grey/30">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Invia rapporto missione..."
                className="flex-grow bg-black/40 border border-superearth-yellow/20 p-2 text-sm outline-none focus:border-superearth-yellow text-white"
              />
              <button 
                onClick={handleSend}
                className="bg-superearth-yellow text-black p-2 hover:bg-yellow-400 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

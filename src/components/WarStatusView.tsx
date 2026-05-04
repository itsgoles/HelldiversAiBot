import React from 'react';
import { motion } from 'motion/react';
import { Info, Crosshair, Map as MapIcon } from 'lucide-react';
import { WarStatus } from '../services/warService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WarStatusViewProps {
  warData: WarStatus | null;
  isLoading?: boolean;
}

export const WarStatusView: React.FC<WarStatusViewProps> = ({ warData, isLoading }) => {
  if (isLoading && !warData) {
    return (
      <div className="p-20 text-center border-2 border-dashed border-superearth-yellow/10 bg-superearth-grey/10 flex flex-col items-center justify-center gap-6">
         <div className="font-mono text-superearth-yellow/40 text-[10px] w-full max-w-md bg-black/40 p-4 border border-superearth-yellow/5 h-40 overflow-hidden relative text-left">
            <motion.div
              animate={{ y: [0, -200] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="space-y-1"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <p key={i} className="truncate">
                  {`[LOG_${i}] FETCHING_SECTOR_${Math.floor(Math.random()*100)}... OK`}
                  {` > DATA: ${Math.random().toString(36).substring(7).toUpperCase()}`}
                </p>
              ))}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-superearth-dark" />
         </div>
         <div className="space-y-2">
           <p className="font-black text-superearth-yellow uppercase tracking-[0.3em] text-sm animate-pulse">Sincronizzazione Uplink Satellitare...</p>
           <p className="text-[10px] font-mono opacity-40 italic">Autorizzazione Ministero della Verità richiesta...</p>
         </div>
      </div>
    );
  }

  if (!warData) return null;

  return (
    <div className="space-y-6">
      {warData.majorOrder && (
        <div className="terminal-border bg-superearth-yellow p-6 text-black">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-8 h-8" />
            <h4 className="font-black text-2xl uppercase italic">ORDINE MAGGIORE ATTIVO</h4>
          </div>
          <h5 className="font-black text-xl mb-1">{warData.majorOrder.title}</h5>
          <p className="font-bold mb-6 opacity-80">{warData.majorOrder.description}</p>
          <div className="space-y-1">
             <div className="flex justify-between font-mono text-xs font-bold uppercase">
               <span>Progresso Campagna</span>
               <span>{warData.majorOrder.progress.toFixed(1)}%</span>
             </div>
             <div className="h-4 bg-black/20 w-full">
                <div className="h-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{ width: `${warData.majorOrder.progress}%` }} />
             </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {warData.activePlanets.map((p, i) => (
           <div key={i} className="terminal-border p-4 bg-superearth-grey/40 group hover:bg-superearth-grey/60 transition-colors text-left">
              <div className="flex justify-between items-start mb-4">
                 <div>
                   <h5 className="font-black text-lg text-superearth-yellow">{p.name}</h5>
                   <p className="text-[10px] font-mono opacity-50 uppercase">{p.sector}</p>
                 </div>
                 <div className={cn(
                   "px-2 py-0.5 text-[9px] font-black uppercase rounded-sm",
                   p.owner === 'Terminidi' ? "bg-orange-500" : p.owner === 'Automaton' ? "bg-red-600" : "bg-superearth-yellow text-black"
                 )}>
                   {p.owner}
                 </div>
              </div>
              <div className="space-y-1 mt-4">
                 <div className="flex justify-between text-[10px] font-mono uppercase">
                    <span>Liberazione</span>
                    <span>{p.liberation.toFixed(1)}%</span>
                 </div>
                 <div className="h-1.5 bg-black/40 w-full overflow-hidden">
                    <div className="h-full bg-superearth-yellow" style={{ width: `${p.liberation}%` }} />
                 </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-[10px] font-mono opacity-40">
                 <span className="flex items-center gap-1 font-bold"><Crosshair className="w-3 h-3" /> {p.players.toLocaleString()} HELIVERS</span>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

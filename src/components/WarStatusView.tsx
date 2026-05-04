import React from 'react';
import { motion } from 'motion/react';
import { Info, Crosshair, Map as MapIcon, Satellite, WifiOff, RefreshCw } from 'lucide-react';
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
      <div className="flex flex-col items-center justify-center py-24 space-y-8">
        <div className="relative">
          {/* Orbital rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-20px] border border-superearth-yellow/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-40px] border border-dashed border-superearth-yellow/5 rounded-full"
          />
          
          {/* Satellite Core */}
          <div className="relative z-10 p-6 bg-superearth-yellow/5 rounded-full border border-superearth-yellow/20">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Satellite className="w-12 h-12 text-superearth-yellow" />
            </motion.div>
          </div>

          {/* Scanning beams */}
          <motion.div 
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-superearth-yellow/20 rounded-full blur-xl"
          />
        </div>
        
        <div className="text-center font-mono space-y-4">
          <div className="space-y-1">
            <h4 className="text-superearth-yellow text-lg font-black uppercase tracking-[0.4em] animate-pulse">
              SINCRONIZZAZIONE UPLINK
            </h4>
            <div className="h-1 w-48 bg-white/5 mx-auto overflow-hidden rounded-full">
              <motion.div 
                animate={{ x: [-200, 200] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-1/3 bg-superearth-yellow shadow-[0_0_10px_#FFE100]"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1 opacity-40 text-[10px] uppercase">
            <p>Stabilizzazione Canale Ministeriale...</p>
            <p className="font-bold underline decoration-superearth-yellow/30">Protocollo Critico Super Terra v1.0.4</p>
          </div>
        </div>
      </div>
    );
  }

  if (!warData && !isLoading) {
    const errorType = !navigator.onLine ? 'OFFLINE' : 'TIMEOUT';
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-16 text-center border-2 border-dashed border-red-500/20 bg-red-500/5 flex flex-col items-center justify-center gap-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <WifiOff className="w-32 h-32 text-red-500" />
        </div>

        <div className="p-6 bg-red-600/20 rounded-full border border-red-500/40 relative z-10">
           <WifiOff className="w-12 h-12 text-red-500" />
        </div>

        <div className="space-y-6 relative z-10">
           <div>
             <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <h4 className="font-black text-red-500 text-2xl uppercase tracking-tighter">ERRORE DI TRASMISSIONE</h4>
             </div>
             <p className="text-[10px] font-mono opacity-60 uppercase tracking-widest">
               Stato Rete: <span className="text-red-400">{errorType}</span> | Settore: <span className="text-red-400">DISTURBATO</span>
             </p>
           </div>
           
           <div className="max-w-md mx-auto space-y-4">
             <p className="text-sm font-medium leading-relaxed opacity-90 italic">
               "{!navigator.onLine 
                 ? "Il tuo terminale non è connesso alla rete galattica. Controlla il tuo modulo Wi-Fi Helldiver." 
                 : "Le interferenze Automaton hanno interrotto il segnale. Il Ministero della Verità consiglia di ricaricare il modulo di uplink."}"
             </p>
             
             <div className="p-3 bg-black/40 border border-red-900/30 text-left font-mono text-[9px] opacity-40 uppercase space-y-1">
                <p>&gt; ERROR_CODE: {errorType === 'OFFLINE' ? '0xNET_DISCON' : '0xTIM_OUT_SAT'}</p>
                <p>&gt; ACTION: RE-ESTABLISH_DEMOCRACY_LINK</p>
             </div>
           </div>

           <button 
             onClick={() => window.location.reload()}
             className="px-8 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-500 font-black uppercase italic text-xs tracking-widest transition-all group"
           >
             <span className="flex items-center gap-2">
               <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
               Ricalibra Frequenze
             </span>
           </button>
        </div>
      </motion.div>
    );
  }

  if (!warData) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
         <div className="flex items-center gap-2 text-[10px] font-mono opacity-40 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-superearth-yellow animate-pulse" />
             Uplink: {warData.source || 'Quartier Generale'}
         </div>
         {warData.isMock && (
           <div className="bg-red-500/20 text-red-500 text-[8px] font-black px-2 py-0.5 border border-red-500/40 uppercase animate-pulse">
             Protocollo Emergenza: Dati Stimati
           </div>
         )}
      </div>

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
         {warData.activePlanets.length > 0 ? (
           warData.activePlanets.map((p, i) => (
             <div key={i} className="terminal-border p-4 bg-superearth-grey/40 group hover:bg-superearth-grey/60 transition-colors text-left">
                <div className="flex justify-between items-start mb-4">
                   <div>
                     <h5 className="font-black text-lg text-superearth-yellow">{p.name}</h5>
                     <p className="text-[10px] font-mono opacity-50 uppercase">{p.sector}</p>
                   </div>
                   <div className={cn(
                     "px-2 py-0.5 text-[9px] font-black uppercase rounded-sm",
                     p.owner === 'Terminids' || p.owner === 'Terminidi' ? "bg-orange-500" : 
                     p.owner === 'Automaton' ? "bg-red-600" : 
                     p.owner === 'Humans' ? "bg-superearth-yellow text-black" : "bg-purple-600"
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
           ))
         ) : (
           <div className="col-span-full py-20 text-center border border-dashed border-white/10 opacity-40">
              <p className="font-mono text-xs uppercase tracking-widest">Nessuna campagna attiva rilevata nei settori monitorati.</p>
           </div>
         )}
      </div>
    </div>
  );
};

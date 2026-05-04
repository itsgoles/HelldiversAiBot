import React from 'react';
import { motion } from 'motion/react';
import { 
  Info, 
  Crosshair, 
  Map as MapIcon, 
  Satellite, 
  WifiOff, 
  RefreshCw,
  Bug,
  Bot,
  Zap,
  Globe,
  BarChart2,
  MapPin,
  Shield
} from 'lucide-react';
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

  const translateOwner = (owner: string) => {
    const map: Record<string, string> = {
      'Humans': 'Super Terra',
      'Terminids': 'Terminidi',
      'Automaton': 'Automi',
      'Illuminate': 'Illuminati',
      'Terminidi': 'Terminidi'
    };
    return map[owner] || owner;
  };

  const getThreatIcon = (owner: string) => {
    switch (owner) {
      case 'Terminids':
      case 'Terminidi':
        return <Bug className="w-3 h-3" />;
      case 'Automaton':
        return <Bot className="w-3 h-3" />;
      case 'Illuminate':
        return <Zap className="w-3 h-3" />;
      case 'Humans':
      case 'Super Terra':
        return <Globe className="w-3 h-3" />;
      default:
        return <Crosshair className="w-3 h-3" />;
    }
  };

  if (!warData) return null;

  return (
    <div className="space-y-8">
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
        <div className="terminal-border bg-superearth-yellow p-6 text-black relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
            <MapIcon className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-8 h-8" />
              <h4 className="font-black text-2xl uppercase italic">ORDINE MAGGIORE ATTIVO</h4>
            </div>
            <h5 className="font-black text-2xl mb-2 tracking-tight">{warData.majorOrder.title}</h5>
            <p className="font-bold text-lg mb-8 leading-tight opacity-90">{warData.majorOrder.description}</p>
            <div className="space-y-2">
               <div className="flex justify-between font-mono text-xs font-bold uppercase tracking-widest">
                 <span>Progresso Operativo</span>
                 <span>{warData.majorOrder.progress.toFixed(1)}%</span>
               </div>
               <div className="h-6 bg-black/20 w-full p-1 border border-black/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${warData.majorOrder.progress}%` }}
                    className="h-full bg-black shadow-[0_0_15px_rgba(0,0,0,0.3)] relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                  </motion.div>
               </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-white font-black uppercase text-3xl tracking-tighter mb-6">
          SFORZI ATTIVI
        </h3>
        
        <div className="flex flex-col gap-4">
           {warData.activePlanets.length > 0 ? (
             warData.activePlanets.map((p, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.05 }}
                 className="flex flex-col md:flex-row bg-[#0D0D0D] border border-white/5 overflow-hidden group hover:border-superearth-yellow/30 transition-colors"
               >
                  {/* Planet Thumbnail Section */}
                  <div className="w-full md:w-64 h-40 md:h-auto relative shrink-0">
                    <img 
                      src={p.thumbnail} 
                      alt={p.name} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 space-y-2">
                       <h5 className="font-black text-2xl text-white tracking-widest uppercase">{p.name}</h5>
                       <div className="flex items-center gap-3 opacity-80 text-white">
                          <BarChart2 className="w-4 h-4" />
                          <MapPin className="w-4 h-4" />
                          <Info className="w-4 h-4" />
                       </div>
                    </div>
                  </div>

                  {/* Operational Data Section */}
                  <div className="flex-grow p-4 space-y-3 flex flex-col justify-center">
                    {/* Progress Bar Container */}
                    <div className="relative">
                      <div className="h-6 w-full bg-[#1A1A1A] flex items-center relative">
                        {p.isDefense ? (
                          <>
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${p.liberation}%` }}
                               className="h-full bg-[#3AB6FF] shadow-[0_0_15px_#3AB6FF44]"
                             />
                             <div className="h-full flex-grow bg-[#FFB800]" />
                             <div className="absolute top-1/2 left-[50%] -translate-y-1/2 -translate-x-1/2 z-10">
                               <div className="bg-white p-1 rounded-full shadow-lg border-2 border-black">
                                 <Shield className="w-3 h-3 text-black fill-current" />
                               </div>
                             </div>
                          </>
                        ) : (
                          <>
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${p.liberation}%` }}
                               className={cn(
                                 "h-full",
                                 p.owner === 'Terminids' || p.owner === 'Terminidi' ? "bg-orange-500" : 
                                 p.owner === 'Automaton' ? "bg-red-600" : "bg-purple-600"
                               )}
                             />
                             <div className="h-full flex-grow bg-[#FFB800]" />
                          </>
                        )}
                      </div>
                    </div>

                    {/* Faction and Status Text */}
                    <div className="flex justify-between items-end">
                       <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <div className={cn(
                               "text-[11px] font-black italic flex items-center gap-1",
                               p.isDefense ? "text-[#3AB6FF]" : "text-white"
                             )}>
                               {p.isDefense ? "▶▶" : "◀"} {p.liberation.toFixed(4)}% {p.isDefense ? "Difesa!" : "Liberato"}
                             </div>
                             <span className="text-[10px] font-mono opacity-40 text-white uppercase italic">
                               {p.timeRemaining}
                             </span>
                          </div>
                          <div className="text-[10px] font-mono opacity-30 text-white uppercase tracking-widest">
                             Settore: {p.sector} | Minaccia: {translateOwner(p.owner)}
                          </div>
                       </div>
                       
                       <div className="text-right">
                          <div className="text-xs font-black text-white/90">
                            {p.players.toLocaleString()} Helldivers
                          </div>
                          <div className="text-[10px] font-mono opacity-40 text-white uppercase">
                            Presenza Attiva
                          </div>
                       </div>
                    </div>
                  </div>
               </motion.div>
             ))
           ) : (
             <div className="py-24 text-center border border-dashed border-white/10 opacity-30">
                <p className="font-mono text-xs uppercase tracking-[0.3em]">Nessuna operazione rilevata nei settori critici.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

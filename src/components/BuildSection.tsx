import React from 'react';
import { Zap } from 'lucide-react';
import { Build } from '../constants';
import { motion } from 'motion/react';

interface BuildSectionProps {
  builds: Build[];
}

export const BuildSection: React.FC<BuildSectionProps> = ({ builds }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {builds.map((build, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="terminal-border overflow-hidden bg-superearth-grey/50 hover:border-superearth-yellow transition-all flex flex-col text-left"
        >
          <div className="bg-superearth-yellow p-4 text-black flex justify-between items-center">
            <h4 className="font-black text-xl italic uppercase truncate">{build.name}</h4>
            <Zap className="w-5 h-5 shrink-0" />
          </div>
          <div className="p-6 flex-grow space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                 <p className="text-superearth-yellow text-[10px] font-mono tracking-tighter uppercase mb-1">Arma Primaria</p>
                 <p className="font-bold text-sm">{build.primary}</p>
              </div>
              <div>
                 <p className="text-superearth-yellow text-[10px] font-mono tracking-tighter uppercase mb-1">Secondaria</p>
                 <p className="font-bold text-sm">{build.secondary}</p>
              </div>
            </div>
            <div>
               <p className="text-superearth-yellow text-[10px] font-mono tracking-tighter uppercase mb-1">Armatura Consigliata</p>
               <p className="font-bold text-sm italic">{build.armorType}</p>
               <p className="text-[11px] opacity-60 mt-1">{build.armorReason}</p>
            </div>
            <div>
               <p className="text-superearth-yellow text-[10px] font-mono tracking-tighter uppercase mb-1">Stratagemmi Fondamentali</p>
               <div className="flex flex-wrap gap-1.5 mt-2">
                  {build.stratagems.map((s, j) => (
                    <span key={j} className="bg-black/40 border border-superearth-yellow/20 px-2 py-1 text-[10px] font-bold uppercase">{s}</span>
                  ))}
               </div>
            </div>
          </div>
          <div className="p-4 bg-black/30 border-t border-superearth-yellow/10">
             <p className="text-xs font-medium leading-relaxed italic opacity-80">
               <strong>TACTICAL NOTE:</strong> {build.gamePlan}
             </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

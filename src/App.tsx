/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Target, 
  Trophy, 
  Crosshair, 
  Database, 
  Skull, 
  Zap, 
  Map as MapIcon,
  MessageSquare,
  ArrowRight,
  RefreshCw,
  Info,
  BookOpen,
  Sword,
  Flame,
  Bomb,
  Ghost,
  Eye,
  LifeBuoy,
  Mic2,
  Hammer,
  HelpCircle,
  Menu,
  X,
  Check
} from 'lucide-react';
import { SHORT_QUESTIONS, EXTENDED_QUESTIONS, ARCHETYPES, STRATEGIES, Build } from './constants';
import { analyzePlayer, ProfileInput, PlayerStats, AnalysisResult } from './lib/analyst';
import { fetchWarStatus, WarStatus } from './services/warService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IconMap: any = {
  Ghost, Hammer, Eye, LifeBuoy, Mic2, Flame, Bomb
};

export default function App() {
  const [step, setStep] = useState<'intro' | 'recruitment' | 'quiz' | 'stats_prompt' | 'stats_manual' | 'results' | 'encyclopedia'>('intro');
  const [activeTab, setActiveTab] = useState<'overview' | 'builds' | 'war' | 'strategies'>('overview');
  const [quizType, setQuizType] = useState<'short' | 'extended' | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [manualStats, setManualStats] = useState<PlayerStats>({});
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [warData, setWarData] = useState<WarStatus | null>(null);
  const [isLoadingWar, setIsLoadingWar] = useState(false);
  const [lastSelectedAnswer, setLastSelectedAnswer] = useState<string | null>(null);

  const activeQuestions = quizType === 'extended' ? EXTENDED_QUESTIONS : SHORT_QUESTIONS;

  useEffect(() => {
    setIsLoadingWar(true);
    fetchWarStatus().then(data => {
      setWarData(data);
      setIsLoadingWar(false);
    });
  }, []);

  const handleQuizAnswer = (value: string) => {
    setLastSelectedAnswer(value);
    
    // Immediate feedback delay before moving to next
    setTimeout(() => {
      const questionId = activeQuestions[currentQuestionIndex].id;
      const newAnswers = { ...quizAnswers, [questionId]: value };
      setQuizAnswers(newAnswers);
      setLastSelectedAnswer(null);

      if (currentQuestionIndex < activeQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setStep('stats_prompt');
      }
    }, 400);
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setStep('intro');
      setQuizType(null);
    }
  };

  const startAnalysis = () => {
    const result = analyzePlayer(quizAnswers, manualStats);
    setAnalysis(result);
    setStep('results');
    setActiveTab('overview');
  };

  const navItems = [
    { id: 'overview', label: 'Profilo', icon: Trophy },
    { id: 'builds', label: 'Equipaggiamento', icon: Zap },
    { id: 'war', label: 'Guerra Live', icon: MapIcon },
    { id: 'strategies', label: 'Strategie', icon: Sword },
  ];

  return (
    <div className="min-h-screen bg-superearth-dark text-white p-4 md:p-8 font-sans selection:bg-superearth-yellow selection:text-black">
      {/* Header */}
      <header className="mb-8 text-center w-full max-w-5xl mx-auto border-b border-superearth-yellow/20 pb-6">
        <div className="flex items-center justify-center gap-4 mb-2">
          <ShieldCheck className="text-superearth-yellow w-12 h-12" />
          <h1 className="text-3xl md:text-5xl propaganda-text text-superearth-yellow flicker">
            Analista di Super Terra
          </h1>
        </div>
        <div className="flex justify-center gap-4 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setStep('intro')}
            className={cn("px-4 py-1 text-xs font-mono uppercase tracking-widest border border-superearth-yellow/20 hover:bg-superearth-yellow/10", step === 'intro' && "bg-superearth-yellow text-black")}
          >
            Home
          </button>
          <button 
            onClick={() => setStep('encyclopedia')}
            className={cn("px-4 py-1 text-xs font-mono uppercase tracking-widest border border-superearth-yellow/20 hover:bg-superearth-yellow/10", step === 'encyclopedia' && "bg-superearth-yellow text-black")}
          >
            Enciclopedia Archetipi
          </button>
        </div>
      </header>

      <main className="w-full max-w-5xl mx-auto flex-grow flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="terminal-border p-8 bg-superearth-grey/50 backdrop-blur-sm w-full"
            >
              <h2 className="text-2xl font-bold mb-4 text-superearth-yellow uppercase italic tracking-wider">Cittadino, la tua missione inizia qui.</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg mb-6 leading-relaxed">
                    Benvenuto nell'hub di analisi tattica. Il Ministero della Verità ha approvato questo sistema per l'ottimizzazione degli Helldivers.
                  </p>
                  <p className="text-sm border-l border-superearth-yellow/30 pl-4 py-2 italic opacity-60 mb-8">
                    "Un Helldiver analizzato è un Helldiver che torna a casa con i campioni."
                  </p>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setQuizType('extended');
                        setStep('quiz');
                        setCurrentQuestionIndex(0);
                      }}
                      className="w-full bg-superearth-yellow text-black font-black py-4 px-8 hover:bg-yellow-400 transition-all flex flex-col items-center justify-center gap-1 text-xl italic uppercase"
                    >
                      Nuova Recluta / Primo Test
                      <span className="text-[10px] opacity-60 normal-case italic">Valutazione Biometrica Completa (45 quesiti)</span>
                    </button>

                    <button
                      onClick={() => {
                        setQuizType('short');
                        setStep('quiz');
                        setCurrentQuestionIndex(0);
                      }}
                      className="w-full border-2 border-superearth-yellow text-superearth-yellow font-black py-4 px-8 hover:bg-superearth-yellow/10 transition-all flex flex-col items-center justify-center gap-1 text-xl italic uppercase"
                    >
                      Veterano / Ricalibrazione
                      <span className="text-[10px] opacity-60 normal-case italic">Aggiornamento Tattico Rapido (8 quesiti)</span>
                    </button>
                  </div>
                </div>
                <div className="hidden md:block opacity-30">
                   <ShieldCheck className="w-full h-auto text-superearth-yellow animate-pulse" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="terminal-border p-6 md:p-10 bg-superearth-grey/50 w-full"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                  <div className="flex items-center gap-4 mb-1">
                    <button 
                      onClick={handleGoBack}
                      className="text-superearth-yellow hover:text-white transition-colors flex items-center gap-1 text-[10px] font-mono group"
                    >
                      <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" /> [INDIETRO]
                    </button>
                    <span className="font-mono text-superearth-yellow text-[10px] uppercase opacity-40 tracking-widest">{quizType === 'extended' ? 'Valutazione Biometrica' : 'Ricalibrazione Tattica'}</span>
                  </div>
                  <span className="font-mono text-superearth-yellow font-bold">QUESTITO {currentQuestionIndex + 1}/{activeQuestions.length}</span>
                </div>
                <div className="h-2 w-48 bg-superearth-grey border border-superearth-yellow/30">
                  <div 
                    className="h-full bg-superearth-yellow transition-all duration-300 shadow-[0_0_10px_rgba(255,225,0,0.4)]" 
                    style={{ width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white italic">
                {activeQuestions[currentQuestionIndex].text}
              </h3>

              <div className="grid gap-4">
                {activeQuestions[currentQuestionIndex].options.map((opt) => (
                  <button
                    key={opt.value}
                    disabled={lastSelectedAnswer !== null}
                    onClick={() => handleQuizAnswer(opt.value)}
                    className={cn(
                      "text-left p-6 border transition-all group flex items-center justify-between relative overflow-hidden",
                      lastSelectedAnswer === opt.value
                        ? "bg-superearth-yellow text-black border-white"
                        : quizAnswers[activeQuestions[currentQuestionIndex].id] === opt.value
                          ? "bg-superearth-yellow/20 border-superearth-yellow text-superearth-yellow"
                          : "border-superearth-yellow/20 bg-superearth-dark hover:bg-superearth-yellow hover:text-black"
                    )}
                  >
                    <span className="text-lg font-bold uppercase italic relative z-10">{opt.label}</span>
                    <div className="flex items-center gap-3 relative z-10">
                      {lastSelectedAnswer === opt.value && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Check className="w-6 h-6" />
                        </motion.div>
                      )}
                      <ArrowRight className={cn(
                        "transition-all",
                        lastSelectedAnswer === opt.value ? "opacity-0" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                      )} />
                    </div>
                    {lastSelectedAnswer === opt.value && (
                      <motion.div 
                        initial={{ left: '-100%' }}
                        animate={{ left: '100%' }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-white/20 skew-x-12"
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'stats_prompt' && (
            <motion.div
              key="stats_prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="terminal-border p-8 bg-superearth-grey/50 text-center w-full"
            >
              <Database className="w-16 h-16 text-superearth-yellow mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4 uppercase">Sincronizzazione Dati Extra</h2>
              <p className="text-lg mb-8">
                Vuoi fornire registri di servizio dettagliati per un'analisi biometrica e statistica più profonda?
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button
                  onClick={() => setStep('stats_manual')}
                  className="bg-superearth-yellow text-black font-bold py-4 px-12 hover:bg-yellow-400 uppercase italic"
                >
                  SÌ, INVIA REGISTRI
                </button>
                <button
                  onClick={startAnalysis}
                  className="border-2 border-superearth-yellow text-superearth-yellow font-bold py-4 px-12 hover:bg-superearth-yellow/10 uppercase italic"
                >
                  NO, ANALIZZA SOLO PROFILO
                </button>
              </div>
            </motion.div>
          )}

          {step === 'stats_manual' && (
            <motion.div
              key="stats_manual"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="terminal-border p-8 bg-superearth-grey/50 w-full"
            >
              <h3 className="text-2xl font-bold mb-6 text-superearth-yellow uppercase italic">Inserimento Registri Tattici</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                {/* Ore di gioco */}
                <div>
                  <label className="block text-xs font-mono text-superearth-yellow/70 mb-2 uppercase">Ore di Servizio (Stimate)</label>
                  <input 
                    type="text" 
                    placeholder="Esempio: 200"
                    className="w-full bg-superearth-dark border border-superearth-yellow/30 p-3 text-sm font-mono outline-none focus:border-superearth-yellow"
                    onChange={(e) => setManualStats({...manualStats, playTime: e.target.value})}
                  />
                </div>

                {/* Difficoltà Media */}
                <div>
                  <label className="block text-xs font-mono text-superearth-yellow/70 mb-2 uppercase">Difficoltà Media Abituale</label>
                  <select 
                    className="w-full bg-superearth-dark border border-superearth-yellow/30 p-3 text-sm outline-none focus:border-superearth-yellow"
                    onChange={(e) => setManualStats({...manualStats, avgDifficulty: e.target.value})}
                  >
                    <option value="">Seleziona...</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(d => (
                      <option key={d} value={d}>Difficoltà {d}</option>
                    ))}
                  </select>
                </div>

                {/* Missioni Giocate/Vinte */}
                <div className="md:col-span-1">
                  <label className="block text-xs font-mono text-superearth-yellow/70 mb-2 uppercase">Missioni Giocate / Vinte</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Giocate"
                      className="w-1/2 bg-superearth-dark border border-superearth-yellow/30 p-3 text-sm font-mono outline-none focus:border-superearth-yellow"
                      onChange={(e) => setManualStats({...manualStats, missionsPlayed: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Vinte"
                      className="w-1/2 bg-superearth-dark border border-superearth-yellow/30 p-3 text-sm font-mono outline-none focus:border-superearth-yellow"
                      onChange={(e) => setManualStats({...manualStats, missionsWon: e.target.value})}
                    />
                  </div>
                </div>

                {/* Kill Medie */}
                <div>
                  <label className="block text-xs font-mono text-superearth-yellow/70 mb-2 uppercase">Volume Sterminio (Kill/Missione)</label>
                  <select 
                    className="w-full bg-superearth-dark border border-superearth-yellow/30 p-3 text-sm outline-none focus:border-superearth-yellow"
                    onChange={(e) => setManualStats({...manualStats, killAvg: e.target.value as any})}
                  >
                    <option value="">Seleziona...</option>
                    <option value="basse">Basse (Mirate)</option>
                    <option value="medie">Medie (Cittadino Standard)</option>
                    <option value="alte">Alte (Sterminatore d'Elite)</option>
                  </select>
                </div>

                {/* Morti Medie */}
                <div>
                  <label className="block text-xs font-mono text-superearth-yellow/70 mb-2 uppercase">Tasso Mortalità (Morti/Missione)</label>
                  <select 
                    className="w-full bg-superearth-dark border border-superearth-yellow/30 p-3 text-sm outline-none focus:border-superearth-yellow"
                    onChange={(e) => setManualStats({...manualStats, deathAvg: e.target.value as any})}
                  >
                    <option value="">Seleziona...</option>
                    <option value="poche">Poche (Immortale per la Patria)</option>
                    <option value="medie">Medie (Sacrificio Accettabile)</option>
                    <option value="tante">Tante (Carne da Cannone Orgogliosa)</option>
                  </select>
                </div>

                {/* Tasso Estrazione */}
                <div>
                  <label className="block text-xs font-mono text-superearth-yellow/70 mb-2 uppercase">Tasso di Estrazione Riuscita</label>
                  <select 
                    className="w-full bg-superearth-dark border border-superearth-yellow/30 p-3 text-sm outline-none focus:border-superearth-yellow"
                    onChange={(e) => setManualStats({...manualStats, extractionRate: e.target.value as any})}
                  >
                    <option value="">Seleziona...</option>
                    <option value="bassa">Bassa (Missione Solitaria)</option>
                    <option value="media">Media (Standard)</option>
                    <option value="alta">Alta (Sempre sul Pelican-1)</option>
                  </select>
                </div>

                {/* Obiettivi Secondari */}
                <div>
                  <label className="block text-xs font-mono text-superearth-yellow/70 mb-2 uppercase">Obiettivi Secondari / Nidi</label>
                  <select 
                    className="w-full bg-superearth-dark border border-superearth-yellow/30 p-3 text-sm outline-none focus:border-superearth-yellow"
                    onChange={(e) => setManualStats({...manualStats, secondaryFocus: e.target.value as any})}
                  >
                    <option value="">Seleziona...</option>
                    <option value="mai">Mai (Solo Obiettivo Principale)</option>
                    <option value="a volte">A Volte (Se Tatticamente Utile)</option>
                    <option value="quasi sempre">Sempre (Niente Resta in Piedi)</option>
                  </select>
                </div>

                {/* Fuoco Amico */}
                <div>
                  <label className="block text-xs font-mono text-superearth-yellow/70 mb-2 uppercase">Incidenti di Fuoco Amico</label>
                  <select 
                    className="w-full bg-superearth-dark border border-superearth-yellow/30 p-3 text-sm outline-none focus:border-superearth-yellow"
                    onChange={(e) => setManualStats({...manualStats, friendlyFire: e.target.value as any})}
                  >
                    <option value="">Seleziona...</option>
                    <option value="mai">Nessuno (Disciplina Totale)</option>
                    <option value="ogni tanto">Ogni Tanto (Oops...)</option>
                    <option value="spesso">Spesso (Pericolo per la Libertà)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={startAnalysis}
                className="w-full bg-superearth-yellow text-black font-black py-4 uppercase italic text-xl hover:bg-yellow-400 transition-colors shadow-2xl"
              >
                Concludi Analisi Biometrica
              </button>
            </motion.div>
          )}

          {step === 'results' && analysis && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full space-y-8"
            >
              {/* Navigation Tabs */}
              <nav className="flex gap-1 bg-superearth-grey p-1 sticky top-4 z-50 border border-superearth-yellow/20 backdrop-blur-md">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-3 px-4 font-black uppercase italic text-xs md:text-sm transition-all",
                      activeTab === item.id 
                        ? "bg-superearth-yellow text-black" 
                        : "hover:bg-superearth-yellow/10 text-superearth-yellow"
                    )}
                  >
                    <item.icon className="w-4 h-4 hidden sm:block" />
                    {item.label}
                  </button>
                ))}
              </nav>

              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="tab-overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(255,225,0,0.05)" }}
                      className="terminal-border p-8 bg-superearth-grey/50 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                         {IconMap[ARCHETYPES.find(a => a.id === analysis.archetypeId)?.icon || 'Ghost'] && (
                            React.createElement(IconMap[ARCHETYPES.find(a => a.id === analysis.archetypeId)?.icon || 'Ghost'], { className: "w-32 h-32" })
                          )}
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
                        <div>
                          <h4 className="text-superearth-yellow font-mono text-sm tracking-widest uppercase mb-1">Archetipo Bellico</h4>
                          <h3 className="text-4xl md:text-6xl font-black italic uppercase leading-none">{analysis.archetype}</h3>
                        </div>
                        <div className="bg-superearth-yellow p-4 text-black rounded-lg">
                          {IconMap[ARCHETYPES.find(a => a.id === analysis.archetypeId)?.icon || 'Ghost'] && (
                            React.createElement(IconMap[ARCHETYPES.find(a => a.id === analysis.archetypeId)?.icon || 'Ghost'], { className: "w-12 h-12" })
                          )}
                        </div>
                      </div>
                      
                      <div className="relative z-10">
                        <p className="text-2xl mb-8 italic border-l-4 border-superearth-yellow pl-6 py-4 bg-superearth-yellow/5">
                          "{analysis.summary}"
                        </p>
                      </div>

                      {analysis.isExtended && analysis.categoryAnalyses && (
                        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {analysis.categoryAnalyses.map((cat, i) => (
                            <div key={i} className="bg-black/20 border border-superearth-yellow/10 p-4">
                              <p className="text-[10px] font-mono text-superearth-yellow/60 uppercase mb-1">{cat.label}</p>
                              <div className="flex items-end justify-between mb-2">
                                <span className="text-2xl font-black italic">{cat.score}%</span>
                                <span className="text-[10px] font-bold text-superearth-yellow uppercase">{cat.feedback}</span>
                              </div>
                              <div className="h-1 w-full bg-superearth-grey overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${cat.score}%` }}
                                  className="h-full bg-superearth-yellow/50"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="flex items-center gap-2 text-green-400 font-bold uppercase mb-4 tracking-tighter text-lg">
                            <ShieldCheck className="w-5 h-5" /> Capacità Operative
                          </h5>
                          <div className="space-y-3">
                            {analysis.strengths.map((s, i) => (
                              <div key={i} className="flex items-center gap-3 bg-green-900/10 border border-green-400/20 p-3">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_5px_rgba(74,222,128,0.5)]" />
                                <span className="text-green-100 font-medium">{s}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="flex items-center gap-2 text-red-400 font-bold uppercase mb-4 tracking-tighter text-lg">
                            <Skull className="w-5 h-5" /> Rischi Identificati
                          </h5>
                          <div className="space-y-3">
                            {analysis.weaknesses.map((w, i) => (
                              <div key={i} className="flex items-center gap-3 bg-red-900/10 border border-red-400/20 p-3">
                                <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                                <span className="text-red-100 font-medium">{w}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <div className="terminal-border p-8 bg-superearth-yellow text-black shadow-[0_20px_50px_rgba(255,225,0,0.2)]">
                      <h3 className="text-2xl font-black uppercase italic mb-8 border-b-2 border-black/10 pb-4">Direttiva Militare: Prossime 10 Operazioni</h3>
                      <div className="space-y-8">
                        {/* Fase 1 */}
                        <div className="flex gap-6 items-start">
                          <div className="font-black text-6xl opacity-10 shrink-0 select-none">01</div>
                          <div>
                            <p className="font-black uppercase text-xl mb-1 tracking-tight">Fase di Consolidamento (Missioni 1-3)</p>
                            <p className="font-medium text-lg leading-snug opacity-90">
                              Concentrati sul fronte {quizAnswers.Q4 === 'terminidi' ? 'Terminide' : quizAnswers.Q4 === 'automaton' ? 'Automaton' : 'Galattico'}. 
                              Obiettivo: Ridurre l'incidenza di <strong>{analysis.weaknesses[0]?.toLowerCase() || 'errori tattici'}</strong> in missioni a difficoltà {quizAnswers.Q7 === 'obiettivo' ? 'superiore' : 'standard'}.
                            </p>
                          </div>
                        </div>
                        {/* Fase 2 */}
                        <div className="flex gap-6 items-start">
                          <div className="font-black text-6xl opacity-10 shrink-0 select-none">02</div>
                          <div>
                            <p className="font-black uppercase text-xl mb-1 tracking-tight">Evoluzione Tattica (Missioni 4-7)</p>
                            <p className="font-medium text-lg leading-snug opacity-90">
                              Sperimenta le build consigliate. In particolare, ottimizza l'uso del ruolo <strong>{analysis.archetype}</strong> 
                              per {analysis.archetypeId === 'stealth' ? 'evitare ingaggi non necessari' : analysis.archetypeId === 'tank' ? 'assorbire la pressione nemica' : 'massimizzare gli obiettivi'}.
                            </p>
                          </div>
                        </div>
                        {/* Fase 3 */}
                        <div className="flex gap-6 items-start">
                          <div className="font-black text-6xl opacity-10 shrink-0 select-none">03</div>
                          <div>
                            <p className="font-black uppercase text-xl mb-1 tracking-tight">Oltre il Limite (Missioni 8-10)</p>
                            <p className="font-medium text-lg leading-snug opacity-90">
                              Tenta un'operazione a difficoltà {quizAnswers.Q7 === 'obiettivo' ? 'Massima' : 'Avanzata'}. 
                              Coordina la squadra {quizAnswers.Q8 === 'random' ? 'comunicando via chat/ping' : 'usando tattiche di cerchi concentrici'}. La vittoria è l'unica opzione.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'builds' && (
                  <motion.div
                    key="tab-builds"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {analysis.recommendedBuilds.map((build, i) => (
                      <div key={i} className="terminal-border overflow-hidden bg-superearth-grey/50 hover:border-superearth-yellow transition-all flex flex-col">
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
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'war' && (
                  <motion.div
                    key="tab-war"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    {warData ? (
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
                             <div key={i} className="terminal-border p-4 bg-superearth-grey/40 group hover:bg-superearth-grey/60 transition-colors">
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
                    ) : (
                      <div className="p-20 text-center border-2 border-dashed border-superearth-yellow/10 bg-superearth-grey/10 flex flex-col items-center justify-center gap-6">
                         <div className="font-mono text-superearth-yellow/40 text-[10px] w-full max-w-md bg-black/40 p-4 border border-superearth-yellow/5 h-40 overflow-hidden relative">
                            <motion.div
                              animate={{ y: [0, -200] }}
                              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                              className="space-y-1"
                            >
                              {Array.from({ length: 20 }).map((_, i) => (
                                <p key={i} className="truncate" id={`log-item-${i}`}>
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
                    )}
                  </motion.div>
                )}

                {activeTab === 'strategies' && (
                  <motion.div
                    key="tab-strategies"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {STRATEGIES.map((strat, i) => (
                      <div key={i} className="terminal-border p-6 bg-superearth-grey/50">
                        <div className="flex items-center gap-3 mb-6 border-b border-superearth-yellow/10 pb-4">
                           <Info className="text-superearth-yellow w-6 h-6" />
                           <h4 className="font-black text-xl italic uppercase text-superearth-yellow tracking-tighter">Focus: {strat.target}</h4>
                        </div>
                        <ul className="space-y-4">
                           {strat.tips.map((tip, j) => (
                             <li key={j} className="flex gap-4 items-start group">
                               <div className="mt-1 w-2 h-2 shrink-0 bg-superearth-yellow rotate-45 group-hover:scale-125 transition-transform" />
                               <p className="text-sm font-medium leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">{tip}</p>
                             </li>
                           ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-12 text-center">
                 <button 
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 border border-superearth-yellow/20 px-8 py-3 font-bold uppercase italic text-xs tracking-widest hover:bg-superearth-yellow hover:text-black transition-all"
                >
                  <RefreshCw className="w-4 h-4" /> Riavvia Analisi Tattica
                </button>
              </div>
            </motion.div>
          )}

          {step === 'encyclopedia' && (
            <motion.div
              key="encyclopedia"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full space-y-8"
            >
              <div className="text-center mb-12">
                 <h2 className="text-4xl md:text-5xl font-black uppercase italic text-superearth-yellow tracking-tighter mb-4">Enciclopedia degli Archetipi</h2>
                 <p className="max-w-2xl mx-auto opacity-70 italic">Conosci i ruoli fondamentali approvati dal Ministero della Difesa per la salvaguardia della democrazia galattica.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {ARCHETYPES.map((arch) => (
                   <motion.div 
                    key={arch.id} 
                    whileHover={{ scale: 1.03, y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                    className="terminal-border p-6 bg-superearth-grey/50 flex flex-col hover:border-superearth-yellow transition-all group cursor-default"
                   >
                      <div className="flex items-center gap-4 mb-6">
                         <div className="bg-superearth-yellow p-3 text-black group-hover:shadow-[0_0_15px_rgba(255,225,0,0.8)] transition-all">
                            {IconMap[arch.icon] && React.createElement(IconMap[arch.icon], { className: "w-8 h-8" })}
                         </div>
                         <h4 className="font-black text-xl italic uppercase leading-none">{arch.name}</h4>
                      </div>
                      <p className="text-sm mb-6 opacity-70 italic leading-relaxed">{arch.description}</p>
                      
                      <div className="mt-auto space-y-4">
                        <div>
                          <h5 className="text-[10px] font-mono uppercase text-green-400 mb-2 font-bold tracking-widest">Specializzazioni</h5>
                          <div className="flex flex-wrap gap-1">
                             {arch.strengths.map((s, idx) => (
                               <span key={idx} className="bg-green-900/20 border border-green-400/20 px-2 py-0.5 text-[9px] font-bold lowercase">{s}</span>
                             ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-mono uppercase text-red-400 mb-2 font-bold tracking-widest">Limiti Operativi</h5>
                          <div className="flex flex-wrap gap-1">
                             {arch.weaknesses.map((w, idx) => (
                               <span key={idx} className="bg-red-900/20 border border-red-400/20 px-2 py-0.5 text-[9px] font-bold lowercase">{w}</span>
                             ))}
                          </div>
                        </div>
                      </div>
                   </motion.div>
                 ))}
              </div>

              <div className="text-center pt-8">
                 <button 
                  onClick={() => setStep('intro')}
                  className="bg-superearth-yellow text-black font-black py-3 px-12 italic uppercase tracking-wider hover:bg-yellow-400"
                >
                  Indietro
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-20 py-8 border-t border-superearth-yellow/10 w-full max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 font-mono text-[10px] uppercase tracking-[0.2em]">
           <span>Ministero della Verità • Protocollo {new Date().getFullYear()}</span>
           <div className="flex gap-6">
             <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> DEMOCRAZIA</span>
             <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> LIBERTÀ</span>
             <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> VITTORIA</span>
           </div>
        </div>
      </footer>

      {/* Background VFX */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-superearth-dark">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,225,0,0.03),transparent_70%)]" />
         <div className="absolute top-0 left-0 w-full h-[2px] bg-superearth-yellow/10 shadow-[0_0_20px_rgba(255,225,0,0.5)] animate-scanline" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanline {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}



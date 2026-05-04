import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface QuizEngineProps {
  quizType: 'short' | 'extended';
  currentQuestionIndex: number;
  activeQuestions: any[];
  quizAnswers: Record<string, string>;
  lastSelectedAnswer: string | null;
  onAnswer: (value: string) => void;
  onBack: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  quizType,
  currentQuestionIndex,
  activeQuestions,
  quizAnswers,
  lastSelectedAnswer,
  onAnswer,
  onBack
}) => {
  const currentQuestion = activeQuestions[currentQuestionIndex];

  return (
    <motion.div
      key="quiz"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="terminal-border p-6 md:p-10 bg-superearth-grey/50 w-full text-left"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-1">
            <button 
              onClick={onBack}
              className="text-superearth-yellow hover:text-white transition-colors flex items-center gap-1 text-[10px] font-mono group"
            >
              <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" /> [INDIETRO]
            </button>
            <span className="font-mono text-superearth-yellow text-[10px] uppercase opacity-40 tracking-widest">
              {quizType === 'extended' ? 'Valutazione Biometrica' : 'Ricalibrazione Tattica'}
            </span>
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
        {currentQuestion.text}
      </h3>

      <div className={cn(
        "grid gap-4",
        currentQuestion.type === 'likert' ? "grid-cols-1 sm:grid-cols-5" : "grid-cols-1"
      )}>
        {currentQuestion.options.map((opt: any) => (
          <button
            key={opt.value}
            disabled={lastSelectedAnswer !== null}
            onClick={() => onAnswer(opt.value)}
            className={cn(
              "text-left p-6 border transition-all group flex items-center justify-between relative overflow-hidden",
              currentQuestion.type === 'likert' && "flex-col text-center justify-center p-4",
              lastSelectedAnswer === opt.value
                ? "bg-superearth-yellow text-black border-white"
                : quizAnswers[currentQuestion.id] === opt.value
                  ? "bg-superearth-yellow/20 border-superearth-yellow text-superearth-yellow"
                  : "border-superearth-yellow/20 bg-superearth-dark hover:bg-superearth-yellow hover:text-black"
            )}
          >
            <span className={cn(
              "font-bold uppercase italic relative z-10",
              currentQuestion.type === 'likert' ? "text-xs" : "text-lg"
            )}>{opt.label}</span>
            <div className={cn("relative z-10", currentQuestion.type === 'likert' ? "mt-4" : "flex items-center gap-3")}>
              {lastSelectedAnswer === opt.value ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <Check className="w-6 h-6" />
                </motion.div>
              ) : (
                <ArrowRight className={cn(
                  "transition-all",
                  currentQuestion.type === 'likert' ? "opacity-20 group-hover:opacity-100 group-hover:translate-y-1 rotate-90" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                )} />
              )}
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
  );
};

import React, { useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Trophy, X, Sparkles } from 'lucide-react';
import { getPerformanceMessage } from '../../utils/calculator';
import { triggerPremiumConfetti } from '../../utils/confetti';

const ResultModal = ({ isOpen, onClose, percentage, totalPoints }) => {
  const springValue = useSpring(0, { stiffness: 40, damping: 15 });
  const displayValue = useTransform(springValue, (current) => current.toFixed(2));

  useEffect(() => {
    if (isOpen) {
      triggerPremiumConfetti();
      springValue.set(percentage);
    } else {
      springValue.set(0);
    }
  }, [isOpen, percentage, springValue]);

  const performance = getPerformanceMessage(percentage);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden"
        >
          {/* Backdrop Blur overlay */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          {/* Modal Container with glowing effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg mx-auto"
          >
          {/* Animated Glowing border effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] blur opacity-30 animate-pulse" />
          
          <div className="relative w-full overflow-hidden bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50">
            {/* Soft top gradient */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent opacity-50" />
            
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 bg-slate-100/50 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full transition-all z-10 active:scale-95"
            >
              <X size={20} />
            </button>

            <div className="relative p-8 sm:p-10 text-center pt-14">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                className="mx-auto w-24 h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-indigo-100/50 transform rotate-3"
              >
                <Trophy className="w-12 h-12 text-indigo-600 drop-shadow-sm" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-1 mb-6"
              >
                <h2 className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                  Final Result
                </h2>
                <div className="flex items-center justify-center text-indigo-950 font-extrabold tracking-tighter">
                  <motion.span className="text-[5rem] sm:text-[6rem] leading-none">
                    {displayValue}
                  </motion.span>
                  <span className="text-4xl sm:text-5xl text-slate-300 ml-2">%</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className={`inline-flex items-center px-5 py-2.5 rounded-full bg-white shadow-sm border border-slate-100 ${performance.color} mb-6`}
              >
                <Sparkles size={18} className="mr-2 animate-pulse" />
                <span className="font-bold text-sm sm:text-base">{performance.title}</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-slate-600 text-base sm:text-lg mb-10 leading-relaxed max-w-sm mx-auto"
              >
                {performance.message} You've accumulated a total of <strong className="text-slate-900 font-bold">{totalPoints}</strong> grade points.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={onClose}
                className="w-full py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all active:scale-[0.98] active:translate-y-0 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative">Calculate Another</span>
              </motion.button>
            </div>
          </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;

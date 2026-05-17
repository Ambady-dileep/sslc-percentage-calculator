import { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { X, Sparkles, Star } from 'lucide-react';
import { getPerformanceMessage } from '../../utils/calculator';
import { triggerPremiumConfetti } from '../../utils/confetti';

const ResultModal = ({ isOpen, onClose, percentage, totalPoints }) => {
  const canvasRef = useRef(null);
  const springValue = useSpring(0, { stiffness: 35, damping: 18 });
  const displayValue = useTransform(springValue, (current) => current.toFixed(2));

  useEffect(() => {
    if (isOpen) {
      triggerPremiumConfetti(canvasRef.current); // pass canvas
      springValue.set(percentage);
    } else {
      springValue.set(0);
    }
  }, [isOpen, percentage, springValue]);

  const performance = getPerformanceMessage(percentage);

  const getAccentColor = () => {
    if (percentage >= 90) return { from: '#6366f1', to: '#a855f7', text: 'text-indigo-600' };
    if (percentage >= 75) return { from: '#3b82f6', to: '#6366f1', text: 'text-blue-600' };
    if (percentage >= 60) return { from: '#10b981', to: '#3b82f6', text: 'text-emerald-600' };
    if (percentage >= 40) return { from: '#f59e0b', to: '#10b981', text: 'text-amber-600' };
    return { from: '#ef4444', to: '#f59e0b', text: 'text-red-500' };
  };

  const accent = getAccentColor();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-16 px-4 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-[320px] mx-auto z-10"
          >
            {/* Modal card — confetti canvas lives here */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">

              {/* Confetti canvas — covers the card fully, behind all content */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
              />

              {/* All modal content — sits above the canvas */}
              <div className="relative z-10">
                {/* Top gradient bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(to right, ${accent.from}, ${accent.to})` }}
                />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-all active:scale-90 z-10"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>

                <div className="px-5 pt-6 pb-6 flex flex-col items-center text-center">
                  {/* Emoji */}
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 18 }}
                    className="text-4xl mb-3 select-none"
                  >
                    {percentage >= 90 ? '🏆' : percentage >= 75 ? '🎯' : percentage >= 60 ? '✨' : percentage >= 40 ? '📚' : '💪'}
                  </motion.div>

                  {/* Label */}
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5"
                  >
                    Your Percentage
                  </motion.p>

                  {/* Percentage number */}
                  <div className="flex items-end justify-center gap-1 mb-3">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
                      className={`text-6xl font-black leading-none tracking-tighter ${accent.text}`}
                    >
                      {displayValue}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl font-bold text-slate-300 mb-2"
                    >
                      %
                    </motion.span>
                  </div>

                  {/* Performance badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, type: 'spring' }}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold border mb-3 ${performance.color} bg-white shadow-sm`}
                  >
                    <Star size={9} className="fill-current" />
                    {performance.title}
                  </motion.div>

                  {/* Message */}
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="text-slate-500 text-xs leading-relaxed mb-3 max-w-[230px]"
                  >
                    {performance.message}
                  </motion.p>

                  {/* Grade points pill */}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 mb-5"
                  >
                    <Sparkles size={12} className="text-indigo-400 shrink-0" />
                    <span className="text-[10px] text-slate-400 font-medium">Total Grade Points</span>
                    <span className="text-xs font-black text-slate-700 ml-auto">{totalPoints}</span>
                  </motion.div>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    className="w-full py-3 rounded-2xl font-bold text-white text-sm transition-all shadow-lg active:scale-[0.98]"
                    style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
                  >
                    Calculate Again
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResultModal;
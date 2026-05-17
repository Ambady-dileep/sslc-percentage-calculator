import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const GradeSelector = ({ grade, count, onChange, index }) => {
  const handleIncrement = () => {
    if (count < 10) onChange(grade.label, count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) onChange(grade.label, count - 1);
  };

  const isActive = count > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={`relative rounded-2xl transition-all duration-300 ${
        isActive 
          ? 'bg-white shadow-md shadow-indigo-100/50 border-indigo-200' 
          : 'bg-white/60 border-slate-100 hover:bg-white'
      } border p-2 sm:p-3 flex flex-col items-center justify-center gap-2`}
    >
      {/* Active state subtle background highlight */}
      {isActive && (
        <div className={`absolute inset-0 opacity-10 rounded-2xl bg-gradient-to-b from-${grade.color.replace('text-', '')} to-transparent pointer-events-none`} />
      )}

      <div 
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl font-black tracking-tighter transition-transform duration-300 ${
          isActive ? 'scale-110 shadow-sm' : ''
        } ${grade.bg} ${grade.color} z-10`}
      >
        {grade.label}
      </div>

      <div className="flex items-center bg-slate-50/80 rounded-full p-1 border border-slate-100/80 z-10 w-full justify-between">
        <button
          onClick={handleDecrement}
          disabled={count === 0}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white text-slate-500 hover:text-indigo-600 hover:shadow-sm disabled:opacity-40 disabled:hover:shadow-none transition-all active:scale-90 shrink-0"
          aria-label="Decrease"
        >
          <Minus size={16} strokeWidth={3} />
        </button>
        
        <div className="text-center font-bold text-base text-slate-800 tabular-nums w-full">
          {count}
        </div>

        <button
          onClick={handleIncrement}
          disabled={count === 10}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white text-slate-500 hover:text-indigo-600 hover:shadow-sm disabled:opacity-40 disabled:hover:shadow-none transition-all active:scale-90 shrink-0"
          aria-label="Increase"
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>
    </motion.div>
  );
};

export default GradeSelector;

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 250 }}
      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-300 ${
        isActive 
          ? 'bg-white shadow-xl shadow-indigo-100/50 border-indigo-100' 
          : 'bg-white/60 hover:bg-white border-transparent hover:shadow-lg shadow-slate-200/20'
      } border backdrop-blur-md p-4 sm:p-5 flex items-center justify-between group`}
    >
      {/* Active state subtle background highlight */}
      {isActive && (
        <div className={`absolute inset-0 opacity-5 bg-gradient-to-r from-${grade.color.replace('text-', '')} to-transparent pointer-events-none`} />
      )}

      <div className="flex items-center space-x-4 z-10">
        <div 
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black tracking-tighter transition-transform duration-300 ${
            isActive ? 'scale-110 shadow-md' : 'group-hover:scale-105'
          } ${grade.bg} ${grade.color}`}
        >
          {grade.label}
        </div>
        <div>
          <h3 className={`font-bold text-base sm:text-lg transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
            Grade {grade.label}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">{grade.points} Points</p>
        </div>
      </div>

      <div className="flex items-center bg-slate-50 rounded-full p-1 sm:p-1.5 border border-slate-100 z-10 shadow-inner">
        <button
          onClick={handleDecrement}
          disabled={count === 0}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white text-slate-600 hover:text-indigo-600 hover:shadow-md disabled:opacity-40 disabled:hover:shadow-none disabled:hover:text-slate-600 transition-all active:scale-90"
          aria-label={`Decrease count for ${grade.label}`}
        >
          <Minus size={20} strokeWidth={2.5} />
        </button>
        
        <div className="w-10 sm:w-12 text-center font-bold text-lg sm:text-xl text-slate-800 tabular-nums">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            {count}
          </motion.span>
        </div>

        <button
          onClick={handleIncrement}
          disabled={count === 10}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white text-slate-600 hover:text-indigo-600 hover:shadow-md disabled:opacity-40 disabled:hover:shadow-none disabled:hover:text-slate-600 transition-all active:scale-90"
          aria-label={`Increase count for ${grade.label}`}
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  );
};

export default GradeSelector;

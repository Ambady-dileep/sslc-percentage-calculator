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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`glass-panel p-4 rounded-2xl flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:shadow-${grade.color.replace('text-', '')}/20 group border-l-4 border-l-transparent hover:border-l-${grade.color.replace('text-', '')}`}
    >
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${grade.bg} ${grade.color}`}>
          {grade.label}
        </div>
        <div>
          <h3 className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">Grade {grade.label}</h3>
          <p className="text-sm text-slate-500">{grade.points} Points</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={handleDecrement}
          disabled={count === 0}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label={`Decrease count for ${grade.label}`}
        >
          <Minus size={18} />
        </button>
        
        <div className="w-8 text-center font-bold text-lg text-slate-800">
          {count}
        </div>

        <button
          onClick={handleIncrement}
          disabled={count === 10}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label={`Increase count for ${grade.label}`}
        >
          <Plus size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default GradeSelector;

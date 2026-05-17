import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, AlertCircle, RotateCcw } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

import { GRADES, TOTAL_SUBJECTS } from './constants/grades';
import { calculatePercentage } from './utils/calculator';
import GradeSelector from './components/calculator/GradeSelector';
import ResultModal from './components/calculator/ResultModal';

const App = () => {
  const [gradeCounts, setGradeCounts] = useState(
    GRADES.reduce((acc, grade) => ({ ...acc, [grade.label]: 0 }), {})
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState({ percentage: 0, totalPoints: 0 });
  const [isCalculating, setIsCalculating] = useState(false);

  const totalSelected = useMemo(() => {
    return Object.values(gradeCounts).reduce((sum, count) => sum + count, 0);
  }, [gradeCounts]);

  const handleGradeChange = (gradeLabel, count) => {
    setGradeCounts(prev => {
      const newCounts = { ...prev, [gradeLabel]: count };
      const newTotal = Object.values(newCounts).reduce((sum, c) => sum + c, 0);
      
      if (newTotal > TOTAL_SUBJECTS) {
        return prev;
      }
      return newCounts;
    });
  };

  const handleReset = () => {
    setGradeCounts(GRADES.reduce((acc, grade) => ({ ...acc, [grade.label]: 0 }), {}));
  };

  const handleCalculate = () => {
    if (totalSelected !== TOTAL_SUBJECTS) {
      toast.custom((t) => (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="bg-white/90 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-xl shadow-red-500/20 border border-red-100 flex items-center space-x-3 mx-4"
        >
          <div className="bg-red-50 p-2 rounded-xl text-red-500 shrink-0">
            <AlertCircle size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Incomplete Selection</h4>
            <p className="text-xs text-slate-500 font-medium">Please select exactly 10 subjects.</p>
          </div>
        </motion.div>
      ), { duration: 3000 });
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const calcResult = calculatePercentage(gradeCounts);
      setResult(calcResult);
      setIsCalculating(false);
      setIsModalOpen(true);
    }, 600);
  };

  const progressPercentage = (totalSelected / TOTAL_SUBJECTS) * 100;
  const isComplete = totalSelected === TOTAL_SUBJECTS;

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden bg-slate-50 flex flex-col font-sans selection:bg-indigo-200">
      <Toaster position="top-center" />
      
      {/* Animated Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-300/30 rounded-full blur-[80px] animate-blob mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-300/30 rounded-full blur-[80px] animate-blob mix-blend-multiply" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiM5NGExYjIiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')] opacity-40" />
      </div>

      <main className="w-full max-w-lg mx-auto flex flex-col relative z-10 px-4 pt-6 pb-8 flex-1">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring', damping: 20 }}
          className="text-center mb-4 shrink-0 flex items-center justify-center gap-3"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-white/60 backdrop-blur-xl text-indigo-600 rounded-xl shadow-md shadow-indigo-100 border border-white">
            <Calculator size={20} strokeWidth={2.5} />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight text-left leading-tight">
            {"Kerala SSLC Percentage".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, type: 'spring', damping: 18 }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <br/>
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', damping: 16 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-lg sm:text-xl block"
            >
              Calculator
            </motion.span>
          </h1>
        </motion.div>

        {/* Progress Bar */}
        <div className="bg-white/80 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-slate-100 shadow-sm shrink-0 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Subjects Selected
            </span>
            <motion.span 
              key={totalSelected}
              initial={{ scale: 1.2, color: '#6366f1' }}
              animate={{ scale: 1, color: isComplete ? '#10b981' : '#4f46e5' }}
              className="text-xs font-black px-2 py-0.5 rounded-md bg-slate-50"
            >
              {totalSelected} / {TOTAL_SUBJECTS}
            </motion.span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className={`h-full rounded-full relative overflow-hidden ${
                isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]" />
            </motion.div>
          </div>
        </div>

        {/* Grades Grid */}
        <div className="w-full mb-2">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pb-2">
            {GRADES.map((grade, index) => (
              <GradeSelector
                key={grade.label}
                grade={grade}
                count={gradeCounts[grade.label]}
                onChange={handleGradeChange}
                index={index}
                isMaxReached={totalSelected >= TOTAL_SUBJECTS}
              />
            ))}
          </div>
        </div>

        {/* Spacer - nudges buttons down slightly without pinning to very bottom */}
        <div className="flex-1 max-h-12" />

        {/* Footer actions */}
        <div className="shrink-0 pt-3">
          <div className="flex gap-2 sm:gap-3 items-stretch">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="w-14 sm:w-16 rounded-2xl font-bold text-slate-500 bg-white/90 backdrop-blur-md border border-slate-200 hover:bg-slate-50 hover:text-slate-800 transition-all shadow-sm flex flex-col items-center justify-center shrink-0"
              aria-label="Reset forms"
            >
              <RotateCcw size={20} strokeWidth={2.5} />
            </motion.button>

            <motion.button
              whileHover={{ scale: isComplete ? 1.01 : 1 }}
              whileTap={{ scale: isComplete ? 0.98 : 1 }}
              onClick={handleCalculate}
              disabled={isCalculating || !isComplete}
              className={`flex-1 h-14 sm:h-16 rounded-2xl font-bold text-lg text-white flex items-center justify-center transition-all duration-300 ${
                isComplete
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right shadow-lg shadow-indigo-500/25 border border-indigo-500/20'
                  : 'bg-slate-200/80 backdrop-blur-md text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              <AnimatePresence mode="wait">
                {isCalculating ? (
                  <motion.div 
                    key="calculating"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center text-base"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                    />
                    Calculating...
                  </motion.div>
                ) : (
                  <motion.div
                    key="calculate"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    Calculate Results
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
          
          <div className="text-center mt-3 text-[11px] sm:text-xs font-medium tracking-wide text-slate-400">
  DEVELOPED BY{" "}
  
  <a
    href="https://instagram.com/ambady.dileep"
    target="_blank"
    rel="noopener noreferrer"
    className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent hover:opacity-80 transition"
  >
    @ambady.dileep
  </a>
</div>
        </div>
      </main>

      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        percentage={result.percentage}
        totalPoints={result.totalPoints}
      />
    </div>
  );
};

export default App;
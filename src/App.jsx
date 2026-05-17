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
        toast.error(`Maximum ${TOTAL_SUBJECTS} subjects allowed`, {
          icon: '⚠️',
          style: {
            borderRadius: '16px',
            background: '#1e293b',
            color: '#fff',
            fontWeight: '600',
            padding: '16px',
          },
        });
        return prev;
      }
      return newCounts;
    });
  };

  const handleReset = () => {
    setGradeCounts(GRADES.reduce((acc, grade) => ({ ...acc, [grade.label]: 0 }), {}));
    toast('Progress reset', {
      icon: '🔄',
      style: { borderRadius: '16px', padding: '16px' }
    });
  };

  const handleCalculate = () => {
    if (totalSelected !== TOTAL_SUBJECTS) {
      toast.custom((t) => (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="bg-white/90 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-2xl shadow-red-500/20 border border-red-100 flex items-center space-x-4"
        >
          <div className="bg-red-50 p-2.5 rounded-xl text-red-500">
            <AlertCircle size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Incomplete Selection</h4>
            <p className="text-sm text-slate-500 font-medium">Please select exactly 10 subjects.</p>
          </div>
        </motion.div>
      ), { duration: 3000 });
      return;
    }

    setIsCalculating(true);
    
    // Smooth delay for premium loading experience
    setTimeout(() => {
      const calcResult = calculatePercentage(gradeCounts);
      setResult(calcResult);
      setIsCalculating(false);
      setIsModalOpen(true);
    }, 800);
  };

  const progressPercentage = (totalSelected / TOTAL_SUBJECTS) * 100;
  const isComplete = totalSelected === TOTAL_SUBJECTS;

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-slate-50 flex flex-col font-sans selection:bg-indigo-200">
      <Toaster position="top-center" />
      
      {/* Animated Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-300/30 rounded-full blur-[100px] animate-blob mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-300/30 rounded-full blur-[100px] animate-blob mix-blend-multiply" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-pink-200/30 rounded-full blur-[100px] animate-blob mix-blend-multiply" style={{ animationDelay: '4s' }} />
        
        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiM5NGExYjIiIGZpbGwtb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')] opacity-50" />
      </div>

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 relative z-10 flex flex-col pb-40">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', damping: 20 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center justify-center p-4 bg-white/60 backdrop-blur-xl text-indigo-600 rounded-3xl mb-6 shadow-xl shadow-indigo-100 border border-white">
            <Calculator size={32} strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-5">
            SSLC Percentage
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
              Calculator
            </span>
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-base sm:text-lg font-medium">
            Calculate your Kerala SSLC grade percentage easily. Enter the exact number of subjects for each grade below.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-2xl rounded-[2rem] sm:rounded-[3rem] p-4 sm:p-8 lg:p-10 shadow-2xl shadow-slate-200/50 border border-white mb-8 relative"
        >
          {/* Progress Bar Header */}
          <div className="mb-8 sm:mb-10 bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm sticky top-4 z-20">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest">
                Subjects Selected
              </span>
              <motion.span 
                key={totalSelected}
                initial={{ scale: 1.2, color: '#6366f1' }}
                animate={{ scale: 1, color: isComplete ? '#10b981' : '#4f46e5' }}
                className="text-sm sm:text-base font-black px-3 py-1 rounded-full bg-slate-50"
              >
                {totalSelected} / {TOTAL_SUBJECTS}
              </motion.span>
            </div>
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className={`h-full rounded-full relative overflow-hidden ${
                  isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
              >
                {/* Shimmer effect inside progress bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-10">
            {GRADES.map((grade, index) => (
              <GradeSelector
                key={grade.label}
                grade={grade}
                count={gradeCounts[grade.label]}
                onChange={handleGradeChange}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Sticky Mobile Actions Bottom Bar & Desktop Inline Actions */}
        <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-white/80 backdrop-blur-xl border-t border-slate-200/50 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)] z-40 sm:relative sm:bg-transparent sm:border-none sm:shadow-none sm:p-0">
          <div className="max-w-4xl mx-auto flex gap-3 sm:gap-6 items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="p-4 sm:px-8 sm:py-5 rounded-2xl sm:rounded-3xl font-bold text-slate-500 bg-white sm:bg-white/80 border border-slate-200 hover:bg-slate-50 hover:text-slate-800 transition-all shadow-sm flex items-center justify-center shrink-0"
              aria-label="Reset forms"
            >
              <RotateCcw size={22} strokeWidth={2.5} className="sm:mr-2" />
              <span className="hidden sm:inline">Reset</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: isComplete ? 1.02 : 1 }}
              whileTap={{ scale: isComplete ? 0.98 : 1 }}
              onClick={handleCalculate}
              disabled={isCalculating || !isComplete}
              className={`flex-1 py-4 sm:py-5 px-6 rounded-2xl sm:rounded-3xl font-bold text-lg sm:text-xl text-white flex items-center justify-center transition-all duration-300 ${
                isComplete
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right shadow-xl shadow-indigo-500/30 border border-indigo-500/20 hover:shadow-indigo-500/40'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              <AnimatePresence mode="wait">
                {isCalculating ? (
                  <motion.div 
                    key="calculating"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full mr-3"
                    />
                    Analyzing...
                  </motion.div>
                ) : (
                  <motion.div
                    key="calculate"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center"
                  >
                    Calculate Results
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
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

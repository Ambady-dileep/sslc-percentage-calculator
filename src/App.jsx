import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, AlertCircle, RotateCcw } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

import { GRADES, TOTAL_SUBJECTS } from './constants/grades';
import { calculatePercentage } from './utils/calculator';
import GradeSelector from './components/calculator/GradeSelector';
import ResultModal from './components/calculator/ResultModal';

const App = () => {
  // Initialize state where each grade count is 0
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
      
      // Prevent exceeding total subjects
      if (newTotal > TOTAL_SUBJECTS) {
        toast.error(`You cannot select more than ${TOTAL_SUBJECTS} subjects.`, {
          icon: '⚠️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white px-6 py-4 rounded-2xl shadow-xl shadow-red-500/10 border border-red-100 flex items-center space-x-3"
        >
          <div className="bg-red-100 p-2 rounded-full text-red-500">
            <AlertCircle size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Incomplete Selection</h4>
            <p className="text-sm text-slate-500">Please select exactly 10 subjects.</p>
          </div>
        </motion.div>
      ));
      return;
    }

    setIsCalculating(true);
    
    // Simulate slight delay for calculating animation
    setTimeout(() => {
      const calcResult = calculatePercentage(gradeCounts);
      setResult(calcResult);
      setIsCalculating(false);
      setIsModalOpen(true);
    }, 600);
  };

  const progressPercentage = (totalSelected / TOTAL_SUBJECTS) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 flex flex-col font-sans">
      <Toaster position="top-center" />
      
      {/* Background Animated Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/40 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-200/40 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

      <main className="flex-grow container mx-auto px-4 py-12 relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4 shadow-inner">
            <Calculator size={28} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            SSLC Percentage
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Calculator</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            Calculate your Kerala SSLC grade percentage easily. Enter the number of subjects for each grade below.
          </p>
        </motion.div>

        <div className="glass-panel rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden">
          {/* Progress Bar Header */}
          <div className="mb-8 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Subjects Selected</span>
              <span className={`text-sm font-bold ${totalSelected === TOTAL_SUBJECTS ? 'text-green-500' : 'text-indigo-600'}`}>
                {totalSelected} / {TOTAL_SUBJECTS}
              </span>
            </div>
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full rounded-full ${totalSelected === TOTAL_SUBJECTS ? 'bg-green-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="flex-1 py-4 px-6 rounded-2xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors shadow-sm"
            >
              <RotateCcw size={18} className="mr-2" />
              Reset
            </motion.button>
            <motion.button
              whileHover={{ scale: totalSelected === TOTAL_SUBJECTS ? 1.02 : 1 }}
              whileTap={{ scale: totalSelected === TOTAL_SUBJECTS ? 0.98 : 1 }}
              onClick={handleCalculate}
              disabled={isCalculating || totalSelected !== TOTAL_SUBJECTS}
              className={`flex-[2] py-4 px-6 rounded-2xl font-semibold text-white flex items-center justify-center transition-all shadow-lg ${
                totalSelected === TOTAL_SUBJECTS
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-500/25'
                  : 'bg-slate-300 cursor-not-allowed shadow-none'
              }`}
            >
              {isCalculating ? (
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                  />
                  Calculating...
                </div>
              ) : (
                'Calculate Percentage'
              )}
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

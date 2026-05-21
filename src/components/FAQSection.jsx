import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'How is Kerala SSLC percentage calculated?',
    answer:
      'Kerala SSLC percentage is calculated by dividing the total marks obtained across all subjects by the maximum total marks (1200), then multiplying by 100.',
  },
  {
    question: 'Can I calculate percentage using grades?',
    answer:
      'Yes. Each grade corresponds to a mark range — this calculator uses the midpoint of each grade band to estimate your SSLC percentage instantly.',
  },
  {
    question: 'How many subjects are there in Kerala SSLC?',
    answer:
      'Kerala SSLC exams consist of 10 subjects in total. You must select grades for all 10 subjects to get an accurate percentage estimate.',
  },
  {
    question: 'What is the passing percentage for Kerala SSLC?',
    answer:
      'Students must score a minimum of 35% in each subject and an overall 35% aggregate to pass the Kerala SSLC examination.',
  },
  {
    question: 'Is this calculator free to use?',
    answer:
      'Yes. The Kerala SSLC Percentage Calculator is completely free — no sign-up, no ads, no limits.',
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-slate-100 last:border-0">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left group"
      aria-expanded={isOpen}
    >
      <span className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-snug">
        {question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="shrink-0 text-slate-400 group-hover:text-indigo-500 transition-colors"
      >
        <ChevronDown size={18} strokeWidth={2.5} />
      </motion.div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="px-5 pb-5 text-sm sm:text-base text-slate-500 leading-7">
            {answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const SEOSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
        id="faq-section"
        className="relative z-10 w-full max-w-3xl mx-auto px-4 pb-20 mt-8"
    >
      {/* About card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 leading-tight">
          Kerala SSLC Percentage Calculator 2026
        </h2>
        <p className="text-sm sm:text-base text-slate-500 leading-7 mb-5">
          This free Kerala SSLC Percentage Calculator helps Class 10 students
          instantly estimate their marks percentage using grades. Select your
          grade for each of the 10 subjects and get your result in seconds.
        </p>

        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2">
          How is SSLC percentage calculated?
        </h3>
        <p className="text-sm sm:text-base text-slate-500 leading-7 mb-4">
          Divide your total obtained marks by the maximum total marks, then
          multiply by 100.
        </p>

        {/* Formula block */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 mb-5 overflow-x-auto">
          <code className="text-indigo-600 font-bold text-xs sm:text-sm whitespace-nowrap">
            Percentage = (Obtained Marks ÷ Total Marks) × 100
          </code>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3">
          Why use this calculator?
        </h3>
        <ul className="space-y-2 text-sm sm:text-base text-slate-500">
          {[
            'Fast and accurate percentage estimate from grades',
            'Works on mobile and desktop — no app download needed',
            'Built specifically for Kerala SSLC students',
            'Instant results, completely free',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-emerald-500">✅</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-white/85 backdrop-blur-2xl rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 p-5 sm:p-8 overflow-hidden relative"
      >

        {/* Animated Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          
          <motion.div
            animate={{
              rotate: [0, -8, 8, -4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
            }}
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-300/40"
          >
            <MessageCircleQuestion
              size={22}
              strokeWidth={2.5}
              className="text-white"
            />
          </motion.div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Frequently Asked Questions
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
              Everything students usually ask about SSLC percentage calculation.
            </p>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === i
                  ? 'border-indigo-200 bg-indigo-50/60 shadow-sm'
                  : 'border-slate-100 bg-white/70 hover:border-indigo-100'
              }`}
            >
              <FAQItem
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onClick={() => toggle(i)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SEOSection;
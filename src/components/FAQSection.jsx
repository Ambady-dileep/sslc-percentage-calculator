import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: 'How is Kerala SSLC percentage calculated?',
    a: 'Divide your total obtained marks by 1200 (max marks across 10 subjects) and multiply by 100.',
  },
  {
    q: 'Can I use grades instead of marks?',
    a: 'Yes — each grade maps to a mark midpoint. This calculator uses those midpoints to give you an instant estimate.',
  },
  {
    q: 'How many subjects are in Kerala SSLC?',
    a: 'There are 10 subjects. You must select a grade for all 10 to get an accurate result.',
  },
  {
    q: 'What is the passing percentage?',
    a: 'You need at least 35% per subject and 35% overall aggregate to pass the Kerala SSLC exam.',
  },
  {
    q: 'Is this calculator free?',
    a: 'Completely free — no login, no ads, no limits.',
  },
];

const FORMULA = 'Percentage = (Obtained Marks ÷ 1200) × 100';

const WHY_USE = [
  'Instant estimate from grades — no marks needed',
  'Mobile-friendly, no app required',
  'Built specifically for Kerala SSLC 2026',
  'Free forever',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const FAQItem = ({ item, index, isOpen, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.06, duration: 0.4, ease: 'easeOut' }}
    viewport={{ once: true }}
    className={`rounded-2xl border overflow-hidden transition-colors duration-300 ${
      isOpen
        ? 'border-indigo-200 bg-indigo-50/50 shadow-sm shadow-indigo-100'
        : 'border-slate-100 bg-white/60 hover:border-indigo-100 hover:bg-white/80'
    }`}
  >
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
    >
      <span className={`text-sm font-bold leading-snug transition-colors duration-200 ${
        isOpen ? 'text-indigo-700' : 'text-slate-800 group-hover:text-indigo-600'
      }`}>
        {item.q}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className={`shrink-0 transition-colors duration-200 ${
          isOpen ? 'text-indigo-500' : 'text-slate-300 group-hover:text-indigo-400'
        }`}
      >
        <ChevronDown size={17} strokeWidth={2.5} />
      </motion.div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="body"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.26, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="px-5 pb-5 pt-1 text-sm text-slate-500 leading-7">
            {item.a}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const SEOSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      id="faq-section"
      className="relative z-10 w-full max-w-lg mx-auto px-4 pb-20 mt-6 space-y-3"
    >
      {/* ── About Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-100 shadow-sm p-6"
      >
        {/* Pill badge */}
        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Kerala SSLC 2026
        </span>

        <h2 className="text-lg font-black text-slate-900 mb-2 leading-tight">
          How is the percentage calculated?
        </h2>
        <p className="text-sm text-slate-500 leading-7 mb-4">
          Select a grade for each of your 10 subjects — the calculator maps each
          grade to its mark midpoint and computes your estimated percentage instantly.
        </p>

        {/* Formula */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl px-4 py-3 mb-5 overflow-x-auto">
          <code className="text-indigo-600 font-black text-xs tracking-tight whitespace-nowrap">
            {FORMULA}
          </code>
        </div>

        {/* Why use */}
        <h3 className="text-sm font-black text-slate-700 mb-3 uppercase tracking-wider">
          Why use this?
        </h3>
        <ul className="space-y-2">
          {WHY_USE.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              viewport={{ once: true }}
              className="flex items-start gap-2 text-sm text-slate-500"
            >
              <span className="mt-0.5 shrink-0 text-emerald-400 text-base leading-none">✦</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* ── FAQ Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="relative bg-white/85 backdrop-blur-2xl rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6"
      >
        {/* Subtle glow */}
        <div className="absolute -top-8 -right-8 w-28 h-28 bg-indigo-200/20 rounded-full blur-2xl pointer-events-none" />

        <div className="mb-5">
          <h3 className="text-lg font-black text-slate-900 leading-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Everything students ask about SSLC percentage.
          </p>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </motion.div>

      {/* ── Footer note ── */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center text-[11px] text-slate-400 font-medium pb-2"
      >
        Estimates only — verify with your official marksheet.
      </motion.p>
    </section>
  );
};

export default SEOSection;
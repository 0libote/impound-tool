import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import MouseFollower from './MouseFollower';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const App = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [showScale, setShowScale] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const resultVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } }
  };

  const checkImpound = () => {
    const searchTerm = "IMPOUNDED VEHICLE (INDICATES VEHICLE DRIVEN WAS IMPOUNDED)";
    const matches = (inputText.match(new RegExp(searchTerm.replace(/[()]/g, '\\$&'), 'g')) || []).length;

    if (matches > 0) {
      const offenceNumber = (matches % 12) + 1;

      const offenceData = {
        1: { time: "12 Hours", price: "$6,500" },
        2: { time: "24 Hours", price: "$13,000" },
        3: { time: "48 Hours", price: "$19,500" },
        4: { time: "7 Days", price: "$26,000" },
        5: { time: "10 Days", price: "$39,000" },
        6: { time: "14 Days", price: "$52,000" },
        7: { time: "18 Days", price: "$65,000" },
        8: { time: "24 Days", price: "$78,000" },
        9: { time: "28 Days", price: "$91,000" },
        10: { time: "35 Days", price: "$104,000" },
        11: { time: "40 Days", price: "$117,000" },
        12: { time: "Vehicle Crush", price: "N/A" }
      };

      setResult({
        totalMatches: matches,
        offenceNumber: offenceNumber,
        time: offenceData[offenceNumber].time,
        price: offenceData[offenceNumber].price
      });
    } else {
      // No matches found means it's the first offence
      setResult({
        totalMatches: 0,
        offenceNumber: 1,
        time: "12 Hours",
        price: "$6,500"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans overflow-x-hidden selection:bg-police-500/30">
      <MouseFollower />
      {/* Subtle background gradient - cleaner than before */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-slate-950 pointer-events-none"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-3 tracking-tight drop-shadow-lg uppercase">
            Impound Calculator
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            A simple tool to caculate what impound a suspect is currently on. Created by Sergeant Burton.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          variants={itemVariants}
          className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="p-6 md:p-8 border-b border-slate-800">
            <div className="mb-6">
              <label className="block text-sm font-bold text-police-400 mb-2 uppercase tracking-widest">
                MDT PINs Page
              </label>
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-40 p-4 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-police-500 focus:ring-1 focus:ring-police-500 transition-colors duration-200 font-mono text-sm leading-relaxed resize-none"
                  placeholder="PASTE MDT RECORD..."
                />
              </div>
              <p className="mt-2 text-xs text-slate-500 flex items-center gap-1 font-mono">
                <span className="bg-slate-800 px-1 rounded text-slate-400">CTRL+A</span>
                <span className="bg-slate-800 px-1 rounded text-slate-400">CTRL+C</span>
                <span>to copy from MDT</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={checkImpound}
                className="w-full bg-police-600 hover:bg-police-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                Calculate
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={() => setShowScale(true)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold py-3 px-6 rounded-lg border border-slate-700 transition-colors duration-200 flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                TIME + PRICE LIST
              </motion.button>
            </div>
          </div>

          {/* Results Section - Dark Theme */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key="result"
                variants={resultVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-slate-900 text-slate-200"
              >
                <div className="p-8 pt-6 border-t border-slate-800">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      {/* Removed Notice of Impound and PENALTY ASSESSMENT text */}
                    </div>
                    <div className="text-right w-full">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-1">Impound</div>
                      <div className="text-6xl font-black text-police-500 tracking-tighter">#{result.offenceNumber}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-1">Prior Offenses</div>
                      <div className="text-2xl font-mono font-bold text-white">{result.totalMatches}</div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-1">Duration</div>
                      <div className="text-2xl font-mono font-bold text-police-400">{result.time}</div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-1">Total Fee</div>
                      <div className="text-2xl font-mono font-bold text-white">{result.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      <span className="font-bold uppercase tracking-wider text-sm text-slate-300">Approval Required</span>
                    </div>
                    <div className="font-mono font-bold text-amber-500">
                      {result.offenceNumber <= 5 ? 'LSC APPROVAL' : 'SGT APPROVAL'}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Offence Scale Modal */}
      <AnimatePresence>
        {showScale && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowScale(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col relative z-50"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-wide">Impound Schedule</h3>
                <button
                  onClick={() => setShowScale(false)}
                  className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar bg-slate-950">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: num * 0.05, duration: 0.3 }}
                      className={cn(
                        "p-4 rounded-lg border transition-all duration-200 relative overflow-hidden group",
                        num === 12
                          ? "bg-red-950/20 border-red-900/50 hover:border-red-500"
                          : "bg-slate-900 border-slate-800 hover:border-police-500 hover:bg-slate-800"
                      )}
                    >
                      <div className="absolute top-2 right-2 text-xs font-bold opacity-20 text-white">#{num}</div>
                      <div className={cn(
                        "text-xs font-bold mb-3 text-center uppercase tracking-widest",
                        num === 12 ? "text-red-500" : "text-police-400"
                      )}>
                        Offence {num}
                      </div>

                      <div className="text-center">
                        {num === 12 ? (
                          <div className="py-2">
                            <div className="text-red-400 font-black text-lg uppercase">Vehicle Crush</div>
                            <div className="text-red-500/60 text-xs mt-1 font-mono">PERMANENT SEIZURE</div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="text-slate-400 text-sm font-medium">
                              {['12 Hours', '24 Hours', '48 Hours', '7 Days', '10 Days', '14 Days', '18 Days', '24 Days', '28 Days', '35 Days', '40 Days'][num - 1]}
                            </div>
                            <div className="text-white font-bold text-lg font-mono">
                              {['$6,500', '$13,000', '$19,500', '$26,000', '$39,000', '$52,000', '$65,000', '$78,000', '$91,000', '$104,000', '$117,000'][num - 1]}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

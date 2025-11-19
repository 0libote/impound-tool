import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const App = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [showScale, setShowScale] = useState(false);

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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-200 font-sans overflow-x-hidden">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-3 tracking-tight drop-shadow-lg">
            Impound Calculator
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Calculate vehicle impound fees and duration instantly from MDT records.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5"
        >
          <div className="p-6 md:p-8 border-b border-white/5">
            <div className="mb-6">
              <label className="block text-sm font-medium text-cyan-400 mb-2 uppercase tracking-wider">
                Vehicle History Log
              </label>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="relative w-full h-40 p-4 bg-slate-950/80 border border-white/10 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent resize-none transition-all duration-200 font-mono text-sm leading-relaxed"
                  placeholder="Paste the full vehicle history from the MDT PIN tab here..."
                />
              </div>
              <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Tip: Select all (Ctrl+A) in the MDT box, Copy (Ctrl+C), then Paste (Ctrl+V) here.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={checkImpound}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-cyan-500/20 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                Calculate Fees
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowScale(true)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium py-3 px-6 rounded-lg border border-white/5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                View Impound Durations
              </motion.button>
            </div>
          </div>

          {/* Results Section */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-slate-900/30"
              >
                <div className="p-6 md:p-8 border-t border-white/5">
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
                    Calculation Results
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-slate-950/50 p-5 rounded-xl border border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-16 h-16 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div className="text-sm text-slate-400 uppercase tracking-wider font-medium mb-1">Current Offence</div>
                      <div className="text-3xl font-bold text-white font-display">#{result.offenceNumber || 0}</div>
                      <div className="mt-2 text-xs text-cyan-400/80 font-medium">Based on history</div>
                    </div>

                    <div className="bg-slate-950/50 p-5 rounded-xl border border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      </div>
                      <div className="text-sm text-slate-400 uppercase tracking-wider font-medium mb-1">Prior Impounds</div>
                      <div className="text-3xl font-bold text-white font-display">{result.totalMatches}</div>
                      <div className="mt-2 text-xs text-blue-400/80 font-medium">Found in records</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      Required Penalty
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-slate-950/30 rounded-lg border border-white/5">
                        <span className="text-slate-400">Impound Duration</span>
                        <span className="text-cyan-300 font-bold font-display text-lg">{result.time}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-950/30 rounded-lg border border-white/5">
                        <span className="text-slate-400">Fine Amount</span>
                        <span className="text-green-400 font-bold font-display text-lg">{result.price}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <span className="text-amber-200/80">Required Approval</span>
                        <span className="text-amber-400 font-semibold">
                          {result.offenceNumber <= 5 ? 'LSC Approval' : 'SGT Approval'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Offence Scale Modal */}
      <AnimatePresence>
        {showScale && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowScale(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
                <h3 className="text-xl font-bold text-white font-display">Impound Durations</h3>
                <button
                  onClick={() => setShowScale(false)}
                  className="text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: num * 0.05 }}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-200 relative overflow-hidden group",
                        num === 12
                          ? "bg-rose-950/30 border-rose-500/30 hover:border-rose-500/50"
                          : "bg-slate-800/30 border-white/5 hover:border-cyan-500/30 hover:bg-slate-800/50"
                      )}
                    >
                      <div className="absolute top-2 right-2 text-xs font-bold opacity-20 text-white">#{num}</div>
                      <div className={cn(
                        "text-sm font-medium mb-3 text-center uppercase tracking-wider",
                        num === 12 ? "text-rose-400" : "text-cyan-400"
                      )}>
                        Offence {num}
                      </div>

                      <div className="text-center">
                        {num === 12 ? (
                          <div className="py-2">
                            <div className="text-rose-200 font-bold text-lg">Vehicle Crush</div>
                            <div className="text-rose-400/60 text-xs mt-1">Permanent Seizure</div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="text-slate-300 text-sm font-medium">
                              {['12 Hours', '24 Hours', '48 Hours', '7 Days', '10 Days', '14 Days', '18 Days', '24 Days', '28 Days', '35 Days', '40 Days'][num - 1]}
                            </div>
                            <div className="text-white font-bold text-lg font-display">
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

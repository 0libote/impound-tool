import React, { useState } from 'react';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [showScale, setShowScale] = useState(false);

  const checkImpound = () => {
    const searchTerm = "IMPOUNDED VEHICLE (INDICATES VEHICLE DRIVEN WAS IMPOUNDED)";
    const matches = (inputText.match(new RegExp(searchTerm.replace(/[()]/g, '\\$&'), 'g')) || []).length;
    
    if (matches > 0) {
      const offenceNumber = ((matches - 1) % 12) + 1;
      
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
      setResult({
        totalMatches: 0,
        offenceNumber: 0,
        time: "N/A",
        price: "N/A"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 relative">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-400 mb-2">Impound Tally</h1>
          <p className="text-slate-400">Vehicle impoundment tracking system</p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-xl overflow-hidden">
          {/* Input Section */}
          <div className="p-6 border-b border-slate-700">
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Paste PIN Data
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-32 p-3 bg-slate-700 border border-slate-600 rounded-md text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                placeholder="Go to the PIN tab on the MDT click in the box and do CTRL + A followed by CTRL + C. Then come back to this tool and CTRL + V in this text box."
              />
            </div>
            <button
              onClick={checkImpound}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 mb-3"
            >
              Check Impound Status
            </button>
            <button
              onClick={() => setShowScale(true)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              View Offence Scale
            </button>
          </div>

          {/* Results Section */}
          {result && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6 text-center">Impound Results</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6 max-w-md mx-auto">
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 text-center">
                  <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Current Offence</div>
                  <div className="text-2xl font-bold text-cyan-400">#{result.offenceNumber || 0}</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 text-center">
                  <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Priors</div>
                  <div className="text-2xl font-bold text-cyan-300">{Math.max(0, result.totalMatches - 1)}</div>
                </div>
              </div>

              {/* Penalty Info */}
              <div className="bg-slate-700/30 p-5 rounded-lg border border-slate-600 max-w-md mx-auto">
                <h3 className="text-lg font-medium text-white mb-3 text-center">Current Penalty</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1 border-b border-slate-600/50">
                    <span className="text-slate-300">Time:</span>
                    <span className="text-cyan-300 font-medium">{result.time}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-600/50">
                    <span className="text-slate-300">Price:</span>
                    <span className="text-cyan-300 font-medium">{result.price}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-300">Approval:</span>
                    <span className="text-amber-400 font-medium">
                      {result.offenceNumber <= 5 ? 'LSC Approval Needed' : 'SGT Approval Needed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Offence Scale Modal */}
      {showScale && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Offence Scale</h3>
                <button
                  onClick={() => setShowScale(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <div key={num} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 hover:border-cyan-500/30 transition-colors duration-200">
                    <div className="text-base font-medium text-cyan-300 mb-2 text-center">Offence {num}</div>
                    <div className="text-sm text-slate-300 text-center">
                      {num === 12 ? (
                        <div>
                          <div className="text-rose-400 font-medium">Vehicle Crush</div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div>{['12 Hours', '24 Hours', '48 Hours', '7 Days', '10 Days', '14 Days', '18 Days', '24 Days', '28 Days', '35 Days', '40 Days'][num-1]}</div>
                          <div className="text-cyan-400">{['$6,500', '$13,000', '$19,500', '$26,000', '$39,000', '$52,000', '$65,000', '$78,000', '$91,000', '$104,000', '$117,000'][num-1]}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

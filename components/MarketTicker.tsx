
import React from 'react';

const MarketTicker: React.FC = () => {
  const indexes = [
    { label: 'DÓLAR', value: 'R$ 5,924', change: '+0.42%', up: true },
    { label: 'BOI GORDO', value: 'R$ 324,50', change: '+1.15%', up: true },
    { label: 'OURO BM&F', value: 'R$ 542,10', change: '-0.12%', up: false },
    { label: 'SOJA', value: 'R$ 145,20', change: '+0.05%', up: true },
    { label: 'MILHO', value: 'R$ 72,15', change: '-0.85%', up: false },
    { label: 'EURO', value: 'R$ 6,241', change: '+0.18%', up: true },
    { label: 'BITCOIN', value: 'R$ 584.210', change: '+2.45%', up: true },
  ];

  const displayIndexes = [...indexes, ...indexes];

  return (
    <div className="w-full bg-[#0F172A] relative z-[80] overflow-hidden py-3 border-b border-slate-800 shadow-2xl" style={{ opacity: 1, backgroundColor: '#0F172A' }}>
      <div className="flex whitespace-nowrap animate-ticker">
        {displayIndexes.map((item, idx) => (
          <div key={idx} className="inline-flex items-center gap-4 px-8 border-r border-slate-700/50">
            <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{item.label}</span>
            <span className="text-xs font-black text-white">{item.value}</span>
            <span className={`text-[10px] font-black flex items-center gap-1 ${item.up ? 'text-emerald-400' : 'text-rose-400'}`}>
              <i className={`fa-solid fa-caret-${item.up ? 'up' : 'down'}`}></i>
              {item.change}
            </span>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarketTicker;

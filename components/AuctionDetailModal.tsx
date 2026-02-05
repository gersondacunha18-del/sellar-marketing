
import React, { useState, useEffect } from 'react';
import { Product, Bid } from '../types';

interface AuctionDetailModalProps {
  product: Product;
  onClose: () => void;
  onBid: (amount: number) => void;
  isDarkMode: boolean;
}

const AuctionDetailModal: React.FC<AuctionDetailModalProps> = ({ product, onClose, onBid, isDarkMode }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [bidValue, setBidValue] = useState<number>((product.currentBid || product.price) + 500);

  // Simulação de histórico de lances caso não exista
  const mockBids: Bid[] = product.bids || [
    { id: '1', userId: 'u1', userName: 'Carlos Alberto', amount: (product.currentBid || product.price) + 2000, timestamp: Date.now() - 120000 },
    { id: '2', userId: 'u2', userName: 'Fazenda Sol Nascente', amount: (product.currentBid || product.price) + 1500, timestamp: Date.now() - 600000 },
    { id: '3', userId: 'u3', userName: 'Investimentos Agro', amount: (product.currentBid || product.price) + 500, timestamp: Date.now() - 3600000 },
  ].sort((a, b) => b.amount - a.amount);

  useEffect(() => {
    const end = product.auctionEndTime || (Date.now() + 3600000);
    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((end - now) / 1000));
      setTimeLeft(diff);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [product.auctionEndTime]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + 'h ' : ''}${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className={`w-full max-w-6xl rounded-[40px] shadow-2xl overflow-hidden border transition-colors flex flex-col md:flex-row h-[90vh] md:h-[80vh] ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-white'}`}>
        
        {/* Lado Esquerdo: Imagem e Info Básica */}
        <div className="md:w-1/2 relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-r border-slate-100 dark:border-slate-800">
          <img src={product.images[0]} className="w-full h-full object-cover" alt={product.title} />
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl animate-pulse">Live Auction</span>
            <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl border border-white/50">{product.category}</span>
          </div>
          <button onClick={onClose} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center md:hidden">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
          
          <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/40 backdrop-blur-md rounded-[32px] border border-white/10 text-white">
             <div className="flex items-center gap-4 mb-3">
                <img src={`https://picsum.photos/seed/${product.sellerId}/100`} className="w-12 h-12 rounded-full border-2 border-white/50" />
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Anunciante Parceiro</p>
                   <p className="font-black text-sm uppercase italic">{product.partnerName}</p>
                </div>
                {product.isVerifiedPartner && <i className="fa-solid fa-circle-check text-blue-400 text-sm ml-auto"></i>}
             </div>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <i className="fa-solid fa-location-dot text-indigo-400"></i>
                   <span className="text-[10px] font-bold uppercase">Mato Grosso, BR</span>
                </div>
                <div className="flex items-center gap-2">
                   <i className="fa-solid fa-shield-check text-emerald-400"></i>
                   <span className="text-[10px] font-bold uppercase">Auditado</span>
                </div>
             </div>
          </div>
        </div>

        {/* Lado Direito: Detalhes, Cronômetro e Lances */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col overflow-hidden">
          <div className="hidden md:flex justify-end mb-4">
             <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition-colors">
               <i className="fa-solid fa-xmark"></i>
             </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar space-y-8">
            <header>
              <h2 className={`text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-tight mb-4 ${isDarkMode ? 'text-white' : 'text-[#002B5B]'}`}>{product.title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                 <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase">Ref: {product.id.toUpperCase()}</span>
                 <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-full text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase">Comissão: {Math.round(product.commissionRate * 100)}%</span>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">{product.description}</p>
            </header>

            {/* Painel de Status do Leilão */}
            <div className={`grid grid-cols-2 gap-4 p-6 rounded-[32px] border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tempo Restante</p>
                <div className="flex items-center gap-2 text-rose-500 font-black text-xl">
                  <i className="fa-solid fa-clock"></i>
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lance Atual</p>
                <div className="text-indigo-600 dark:text-indigo-400 font-black text-xl">
                  R$ {(product.currentBid || product.price).toLocaleString('pt-BR')}
                </div>
              </div>
            </div>

            {/* Histórico de Lances */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Histórico de Lances (Live)</h3>
                <span className="text-[10px] font-black text-emerald-500 uppercase">{mockBids.length} Lances Efetuados</span>
              </div>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
                {mockBids.map((bid, i) => (
                  <div key={bid.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${i === 0 ? (isDarkMode ? 'bg-indigo-500/10 border-indigo-500/30 ring-1 ring-indigo-500/50' : 'bg-indigo-50 border-indigo-100 ring-1 ring-indigo-200') : (isDarkMode ? 'border-slate-800' : 'border-slate-50')}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-white dark:border-slate-700">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${bid.userName}`} alt="" />
                      </div>
                      <div>
                        <p className={`text-[11px] font-black uppercase tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                          {bid.userName}
                          {i === 0 && <span className="bg-rose-600 text-white text-[7px] px-1.5 py-0.5 rounded-md">Vencendo</span>}
                        </p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase">{new Date(bid.timestamp).toLocaleTimeString('pt-BR')}</p>
                      </div>
                    </div>
                    <div className={`text-xs font-black ${i === 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
                      R$ {bid.amount.toLocaleString('pt-BR')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rodapé de Ação */}
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
             <div className={`flex-1 flex items-center justify-between px-6 py-4 rounded-2xl border-2 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
               <div className="flex flex-col">
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Sugerido para arremate:</span>
                 <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>R$ {bidValue.toLocaleString('pt-BR')}</span>
               </div>
               <div className="flex flex-col gap-1">
                  <button onClick={() => setBidValue(prev => prev + 1000)} className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px]"><i className="fa-solid fa-plus"></i></button>
                  <button onClick={() => setBidValue(prev => Math.max((product.currentBid || product.price) + 500, prev - 1000))} className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center text-[10px]"><i className="fa-solid fa-minus"></i></button>
               </div>
             </div>
             <button 
               onClick={() => onBid(bidValue)}
               className="flex-[1.5] bg-[#002B5B] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:bg-indigo-900 transition-all active:scale-95 flex items-center justify-center gap-3"
             >
               <i className="fa-solid fa-gavel text-sm"></i>
               Confirmar Lance Master
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailModal;


import React, { useState, useEffect, useRef } from 'react';
import { Product, AuctionStatus } from '../types';
import { notificationService } from '../services/notificationService';

interface AuctionCardProps {
  product: Product;
  onBid: (amount: number) => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ product, onBid }) => {
  const [timeLeft, setTimeLeft] = useState(3600);
  const [bidAmount, setBidAmount] = useState((product.currentBid || product.price) + 500);
  const [regStatus, setRegStatus] = useState<AuctionStatus>(AuctionStatus.NOT_REGISTERED);
  const [showRules, setShowRules] = useState(false);
  const notifiedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev > 0 ? prev - 1 : 0;
        if (next === 60 && !notifiedRef.current) {
          notificationService.notifyAuctionEnding(product.title, '1 minuto');
          notifiedRef.current = true;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [product.title]);

  const handlePlaceBid = () => {
    onBid(bidAmount);
    setBidAmount(prev => prev + 500);
  };

  const acceptRules = () => {
    setShowRules(false);
    setRegStatus(AuctionStatus.PENDING_APPROVAL);
    setTimeout(() => setRegStatus(AuctionStatus.APPROVED), 3000); 
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl relative border-2 border-indigo-500/30">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-square md:aspect-auto h-full relative">
            <img src={product.images[0]} className="w-full h-full object-cover" alt={product.title} />
            <div className="absolute top-4 left-4">
              <span className="bg-red-600 text-[10px] tracking-widest uppercase font-black px-3 py-1 rounded-full animate-pulse shadow-lg">LIVE AUCTION</span>
            </div>
          </div>
          
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-indigo-400 text-sm font-bold uppercase tracking-widest">{product.category}</span>
                <div className="bg-slate-800 px-3 py-1 rounded-lg flex items-center gap-2">
                  <i className="fa-solid fa-clock text-rose-500"></i>
                  <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
              <p className="text-slate-400 text-sm mb-6 line-clamp-3">{product.description}</p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                <div>
                  <p className="text-slate-400 text-xs mb-1 uppercase tracking-wider">Lance Atual</p>
                  <p className="text-3xl font-black text-indigo-400">R$ {product.currentBid?.toLocaleString('pt-BR') || product.price.toLocaleString('pt-BR')}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                    regStatus === AuctionStatus.APPROVED ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {regStatus === AuctionStatus.APPROVED ? 'Habilitado' : 'Não Habilitado'}
                  </span>
                </div>
              </div>

              {regStatus === AuctionStatus.NOT_REGISTERED && (
                <button onClick={() => setShowRules(true)} className="w-full bg-indigo-600 py-4 rounded-xl font-bold text-lg hover:bg-indigo-500 transition-all">HABILITAR PARA LANCE</button>
              )}

              {regStatus === AuctionStatus.APPROVED && (
                <div className="flex gap-3">
                  <div className="flex-1 bg-slate-800 border-2 border-indigo-500/50 rounded-xl px-4 py-3 text-xl font-bold text-center">R$ {bidAmount.toLocaleString()}</div>
                  <button onClick={handlePlaceBid} className="flex-[2] bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font-bold text-xl transition-all">DAR LANCE</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showRules && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
          <div className="bg-white rounded-3xl w-full max-w-xl p-8 animate-in zoom-in duration-200">
            <h3 className="font-bold text-xl mb-4">Confirmar Termos</h3>
            <p className="text-sm text-slate-600 mb-8">Ao habilitar-se, você concorda que cada lance é um compromisso real de compra. Desistências geram multas de 20%.</p>
            <div className="flex gap-4">
              <button onClick={() => setShowRules(false)} className="flex-1 font-bold text-slate-400">Recusar</button>
              <button onClick={acceptRules} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold">Aceitar e Habilitar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionCard;

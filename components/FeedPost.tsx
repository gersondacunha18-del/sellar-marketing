
import React, { useState } from 'react';
import { Product } from '../types';
import { speakDescription } from '../services/geminiService';
import { COMMISSION_RATES } from '../constants';
import ShareModal from './ShareModal';

interface FeedPostProps {
  product: Product;
  isNews?: boolean;
  onProductClick?: (product: Product) => void;
}

const FeedPost: React.FC<FeedPostProps> = ({ product, isNews = false, onProductClick }) => {
  const [liked, setLiked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const baseRate = COMMISSION_RATES[product.category] || 0.05;
  const isHighCommission = product.commissionRate > baseRate;

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isNews) return;

    // Se for leilão, o botão de compra/lance deve abrir o modal de detalhes
    if (product.isAuction && onProductClick) {
      onProductClick(product);
      return;
    }

    setIsBuying(true);
    // Simulação de compra com feedback para o investidor
    setTimeout(() => {
      setIsBuying(false);
      window.dispatchEvent(new CustomEvent('show-notification', {
        detail: {
          title: '🔥 Pedido Enviado!',
          body: `Sua intenção de compra para "${product.title}" foi registrada com sucesso pela administração.`,
          type: 'success'
        }
      }));
    }, 1500);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareModal(true);
  };

  const handleCardClick = () => {
    if (onProductClick && !isNews) {
      onProductClick(product);
    }
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className={`bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm mb-6 transition-all hover:shadow-xl group cursor-pointer ${isNews ? 'border-blue-200 bg-blue-50/10' : ''} ${isHighCommission ? 'ring-2 ring-emerald-400 ring-offset-4 ring-offset-[#F8FAFC]' : ''}`}
      >
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={isNews ? 'https://picsum.photos/seed/news_avatar/100' : `https://picsum.photos/seed/${product.sellerId}/100`} className="w-11 h-11 rounded-full bg-slate-100 border-2 border-white shadow-sm" />
              {!isNews && product.isVerifiedPartner && (
                <i className="fa-solid fa-circle-check absolute -bottom-1 -right-1 text-indigo-600 bg-white rounded-full text-[10px]"></i>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-black text-sm uppercase tracking-tight ${isNews ? 'text-blue-700' : 'text-slate-900'}`}>{product.partnerName}</h3>
                <span className={`${isNews ? 'bg-blue-600' : (isHighCommission ? 'bg-emerald-600' : 'bg-indigo-600')} text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest`}>
                  {isNews ? 'Informativo' : (isHighCommission ? 'Super Parceiro 🔥' : 'Parceiro')}
                </span>
                {product.isAuction && !isNews && (
                  <span className="bg-rose-600 text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                    <i className="fa-solid fa-gavel text-[7px]"></i>
                    Leilão
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{isNews ? 'Economia & Agro' : `${product.category} • Auditado Admin`}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isNews && (
              <div className="hidden sm:flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                <i className="fa-solid fa-shield-halved text-indigo-400 text-[8px]"></i>
                <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Protegido</span>
              </div>
            )}
            <button className="text-slate-300 hover:text-slate-600 p-2">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>
        </div>

        <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
          <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          
          {/* Ribbon Badge for Auction */}
          {product.isAuction && !isNews && (
            <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 pointer-events-none z-10">
              <div className="absolute top-4 -right-8 bg-rose-600 text-white text-[9px] font-black uppercase py-1 px-10 rotate-45 shadow-lg border-y border-white/20 tracking-widest flex items-center justify-center gap-1">
                <i className="fa-solid fa-gavel scale-75"></i>
                LEILÃO
              </div>
            </div>
          )}

          {isHighCommission && !isNews && (
            <div className="absolute top-5 right-5 bg-emerald-600 text-white px-3 py-1 rounded-full text-[9px] font-black shadow-xl border border-white/20 flex items-center gap-2">
              <i className="fa-solid fa-fire"></i>
              HOT COMMISSION
            </div>
          )}

          {product.isAuction && !isNews && (
            <div className="absolute top-5 left-5 bg-red-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black animate-pulse shadow-xl border border-white/20 flex items-center gap-2">
              <i className="fa-solid fa-tower-broadcast"></i>
              LIVE AGORA
            </div>
          )}

          {!isNews && (
            <div className={`absolute bottom-5 right-5 backdrop-blur-md px-5 py-2.5 rounded-2xl font-black shadow-2xl border flex flex-col items-end ${product.isAuction ? 'bg-rose-600/90 text-white border-white/20' : 'bg-white/90 text-slate-900 border-white/50'}`}>
              <span className="text-[8px] uppercase tracking-widest mb-0.5 opacity-80">{product.isAuction ? 'Lance Inicial' : 'Preço de Venda'}</span>
              <span className="text-lg">R$ {product.price.toLocaleString('pt-BR')}</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-center gap-6 mb-4">
            <button onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} className={`flex items-center gap-2 transition-all ${liked ? 'text-rose-500 scale-110' : 'text-slate-400 hover:text-rose-500'}`}>
              <i className={`fa-${liked ? 'solid' : 'regular'} fa-heart text-2xl`}></i>
              <span className="text-xs font-black">{liked ? '1.2k' : 'Curtir'}</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-all">
              <i className="fa-regular fa-comment text-2xl"></i>
              <span className="text-xs font-black">Comentar</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); speakDescription(product.description); }} className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all">
              <i className="fa-solid fa-volume-high text-2xl"></i>
              <span className="text-xs font-black">Ouvir</span>
            </button>
          </div>

          <h4 className={`font-black text-xl mb-2 leading-tight tracking-tighter uppercase italic ${isNews ? 'text-blue-900' : 'text-slate-900'}`}>{product.title}</h4>
          <p className="text-slate-500 text-sm mb-6 line-clamp-3 font-medium leading-relaxed">{product.description}</p>

          {!isNews ? (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button 
                onClick={handleBuy}
                disabled={isBuying}
                className={`w-full sm:flex-1 font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg text-[10px] uppercase tracking-widest disabled:opacity-50 ${product.isAuction ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-100' : 'bg-slate-900 text-white hover:bg-[#002B5B] shadow-slate-200'}`}
              >
                {isBuying ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className={`fa-solid ${product.isAuction ? 'fa-gavel' : 'fa-cart-shopping'}`}></i>}
                {isBuying ? 'Processando...' : (product.isAuction ? 'Ver Detalhes do Leilão' : 'Comprar Lote')}
              </button>
              <button 
                onClick={handleShareClick}
                className={`w-full sm:flex-1 font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 border text-[10px] uppercase tracking-widest ${isHighCommission ? 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-700 shadow-lg shadow-emerald-100' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100'}`}
              >
                <i className={`fa-solid ${isHighCommission ? 'fa-bolt-lightning' : 'fa-share-nodes'}`}></i>
                Compartilhar
              </button>
            </div>
          ) : (
            <button 
              onClick={(e) => { e.stopPropagation(); window.dispatchEvent(new CustomEvent('show-notification', { detail: { title: 'Sellar News', body: 'Carregando matéria completa de nossa curadoria...', type: 'info' }}))}}
              className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 text-[10px] uppercase tracking-widest"
            >
              Ler Notícia Completa
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          )}
        </div>
      </div>

      {showShareModal && (
        <ShareModal 
          product={product} 
          userId="ricardo" 
          onClose={() => setShowShareModal(false)} 
        />
      )}
    </>
  );
};

export default FeedPost;

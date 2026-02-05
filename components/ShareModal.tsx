
import React, { useState } from 'react';
import { Product } from '../types';

interface ShareModalProps {
  product: Product;
  userId: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ product, userId, onClose }) => {
  const [copied, setCopied] = useState(false);
  const affiliateLink = `https://sellar.market/p/${product.id}?ref=${userId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-xl text-slate-800">Gerar Link de Afiliado</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex gap-4 mb-6 p-3 bg-slate-50 rounded-2xl">
            <img src={product.images[0]} className="w-16 h-16 rounded-xl object-cover" />
            <div>
              <p className="font-bold text-slate-900 line-clamp-1">{product.title}</p>
              <p className="text-emerald-600 font-bold text-sm">Comissão: {Math.round(product.commissionRate * 100)}%</p>
            </div>
          </div>

          <p className="text-sm text-slate-500 mb-2 font-medium">Seu link exclusivo:</p>
          <div className="flex gap-2 mb-8">
            <div className="flex-1 bg-slate-100 px-4 py-3 rounded-xl font-mono text-xs text-slate-600 truncate border border-slate-200">
              {affiliateLink}
            </div>
            <button 
              onClick={copyToClipboard}
              className={`px-4 rounded-xl font-bold transition-all flex items-center gap-2 ${copied ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
            >
              <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Divulgar em:</p>
            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: 'fa-whatsapp', color: 'bg-[#25D366]', label: 'WhatsApp' },
                { icon: 'fa-instagram', color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', label: 'Story' },
                { icon: 'fa-facebook', color: 'bg-[#1877F2]', label: 'Post' },
                { icon: 'fa-telegram', color: 'bg-[#0088cc]', label: 'Grupo' }
              ].map((social, i) => (
                <button key={i} className="flex flex-col items-center gap-2 group">
                  <div className={`w-12 h-12 ${social.color} text-white rounded-full flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                    <i className={`fa-brands ${social.icon}`}></i>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{social.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-indigo-50 text-indigo-700 text-xs rounded-b-3xl">
          <i className="fa-solid fa-circle-info mr-2"></i>
          Cada clique e venda através deste link será rastreado automaticamente no seu painel.
        </div>
      </div>
    </div>
  );
};

export default ShareModal;

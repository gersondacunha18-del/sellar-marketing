
import React from 'react';

interface SpotlightItem {
  id: string;
  name: string;
  image: string;
  tag: string;
  isLive?: boolean;
}

const spotlightItems: SpotlightItem[] = [
  { id: 's1', name: 'Leilão Nelore JPS', image: 'https://picsum.photos/seed/bull1/200', tag: 'HOJE 20h', isLive: true },
  { id: 's2', name: 'Vitti Imóveis', image: 'https://picsum.photos/seed/house2/200', tag: 'NOVO LOTE' },
  { id: 's3', name: 'AgroMáquinas', image: 'https://picsum.photos/seed/tractor3/200', tag: 'FINANCIE' },
  { id: 's4', name: 'BioGenética', image: 'https://picsum.photos/seed/dna4/200', tag: 'OFERTA' },
  { id: 's5', name: 'Sellar VIP', image: 'https://picsum.photos/seed/gold5/200', tag: 'MEMBROS' },
];

const PartnerCarousel: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <div className="mb-8 overflow-hidden">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <i className="fa-solid fa-bolt-lightning text-amber-500 animate-pulse"></i>
          Destaques Prioritários
        </h3>
        <span className="text-[9px] font-black text-indigo-600 uppercase cursor-pointer hover:underline">Ver Agenda</span>
      </div>
      
      <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar px-2">
        {spotlightItems.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
            <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-3xl p-1 transition-all duration-500 group-hover:scale-105 group-hover:-rotate-3 ${
              item.isLive 
                ? 'bg-gradient-to-tr from-rose-500 via-orange-500 to-amber-500 animate-gradient-xy shadow-lg shadow-rose-200' 
                : (isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border-2 border-slate-100 shadow-sm')
            }`}>
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-200">
                <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
              </div>
              
              <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-tighter whitespace-nowrap shadow-md border-2 ${
                item.isLive ? 'bg-rose-600 text-white border-white' : 'bg-white text-slate-900 border-slate-50'
              }`}>
                {item.tag}
              </div>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-tight mt-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
              {item.name}
            </span>
          </div>
        ))}
        
        {/* Slot para Novo Parceiro (CTA de Venda) */}
        <div className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer">
          <div className={`w-20 h-20 md:w-24 md:h-24 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
            isDarkMode ? 'border-slate-700 bg-slate-800/20 hover:border-indigo-500' : 'border-slate-200 bg-slate-50 hover:border-indigo-400'
          }`}>
            <i className="fa-solid fa-plus text-slate-400 group-hover:text-indigo-500 transition-colors"></i>
            <span className="text-[7px] font-black text-slate-400 uppercase mt-1">Anuncie</span>
          </div>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-tight mt-1">Sua Marca</span>
        </div>
      </div>
    </div>
  );
};

export default PartnerCarousel;

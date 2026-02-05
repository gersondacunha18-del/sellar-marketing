
import React from 'react';

interface AdItem {
  id: string;
  partner: string;
  title: string;
  image: string;
  tag: string;
  isVip?: boolean;
}

const ads: AdItem[] = [
  {
    id: 'ad1',
    partner: 'AgroSilas Construções',
    title: 'Silos de Alta Capacidade com 20% OFF',
    image: 'https://picsum.photos/seed/silo/400',
    tag: 'PATROCINADO',
    isVip: true
  },
  {
    id: 'ad2',
    partner: 'Genética Premium',
    title: 'Sêmen de Touros Campeões - Safra 2024',
    image: 'https://picsum.photos/seed/bull/400',
    tag: 'OFERTA'
  }
];

const PartnerAdRail: React.FC = () => {
  const handleAdClick = () => {
    window.dispatchEvent(new CustomEvent('show-notification', {
      detail: {
        title: 'Parceiro Premium',
        body: 'Redirecionando para a página exclusiva do parceiro...',
        type: 'info'
      }
    }));
  };

  return (
    <div className="hidden 2xl:flex flex-col gap-6 w-64 shrink-0 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="flex items-center justify-between mb-2 px-2">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Destaques Premium</h3>
        <i className="fa-solid fa-star text-amber-400 text-[10px] animate-pulse"></i>
      </div>

      {ads.map(ad => (
        <div key={ad.id} className={`group relative bg-white rounded-[24px] overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-1 ${ad.isVip ? 'border-amber-200 shadow-sm' : 'border-slate-100'}`}>
          <div className="aspect-square relative overflow-hidden">
            <img src={ad.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={ad.partner} />
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full">
              <span className="text-[8px] font-black text-slate-900 tracking-tighter uppercase">{ad.tag}</span>
            </div>
            {ad.isVip && (
              <div className="absolute top-3 right-3 bg-amber-400 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-crown text-[10px]"></i>
              </div>
            )}
          </div>
          <div className="p-4">
            <p className="text-[9px] font-black text-indigo-600 uppercase mb-1">{ad.partner}</p>
            <h4 className="text-xs font-bold text-slate-900 leading-tight mb-4 group-hover:text-indigo-600 transition-colors">
              {ad.title}
            </h4>
            <button 
              onClick={handleAdClick}
              className="w-full py-2 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:bg-[#002B5B] group-hover:text-white group-hover:border-[#002B5B] transition-all"
            >
              Ver Detalhes
            </button>
          </div>
        </div>
      ))}

      <div 
        onClick={() => window.dispatchEvent(new CustomEvent('open-sellar-chat'))}
        className="bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-200 rounded-[24px] p-6 text-center group cursor-pointer hover:border-indigo-400 hover:bg-white transition-all"
      >
        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:text-indigo-600 transition-all">
          <i className="fa-solid fa-bullhorn text-sm text-slate-400"></i>
        </div>
        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1">Anuncie Aqui</h4>
        <p className="text-[9px] text-slate-400 font-medium mb-4">Alcance +50k parceiros agro e investidores.</p>
        <button className="text-[9px] font-black text-indigo-600 uppercase underline tracking-widest decoration-2 underline-offset-4">
          Comprar Espaço
        </button>
      </div>
    </div>
  );
};

export default PartnerAdRail;

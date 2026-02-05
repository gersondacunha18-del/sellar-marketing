
import React from 'react';
import { Product } from '../types';

interface RightSidebarProps {
  liveAuctions: Product[];
}

const EconomicIndex: React.FC<{ label: string; value: string; change: string; isUp: boolean }> = ({ label, value, change, isUp }) => (
  <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors border-b border-slate-50 last:border-0 cursor-pointer">
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-black text-[#002B5B]">{value}</p>
    </div>
    <div className={`text-right ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
      <p className="text-[10px] font-black flex items-center justify-end gap-1">
        <i className={`fa-solid fa-caret-${isUp ? 'up' : 'down'}`}></i>
        {change}
      </p>
      <p className="text-[8px] font-bold uppercase opacity-60">Hoje</p>
    </div>
  </div>
);

const RightSidebar: React.FC<RightSidebarProps> = ({ liveAuctions }) => {
  const showDevAlert = () => {
    window.dispatchEvent(new CustomEvent('show-notification', {
      detail: {
        title: 'Módulo Sellar',
        body: 'Esta funcionalidade está sendo sincronizada com a base de dados central.',
        type: 'info'
      }
    }));
  };

  return (
    <aside className="hidden xl:flex flex-col gap-6 w-80 sticky top-8 h-fit pb-20">
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-chart-line text-indigo-400"></i>
            <h3 className="font-black text-[10px] uppercase tracking-widest">Indicadores de Mercado</h3>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
        <div className="p-2">
          <EconomicIndex label="Dólar Comercial" value="R$ 5,924" change="+0.42%" isUp={true} />
          <EconomicIndex label="Arroba Boi (CEPEA)" value="R$ 324,50" change="+1.15%" isUp={true} />
          <EconomicIndex label="Ouro BM&F" value="R$ 542,10" change="-0.12%" isUp={false} />
          <EconomicIndex label="Soja (Saca 60kg)" value="R$ 145,20" change="+0.05%" isUp={true} />
          <EconomicIndex label="Milho (Saca)" value="R$ 72,15" change="-0.85%" isUp={false} />
          <EconomicIndex label="Selic" value="13.75%" change="0.00%" isUp={true} />
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <button 
            onClick={showDevAlert}
            className="w-full text-center text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
          >
            Ver Relatório Completo Gemini IA
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Pregão em Tempo Real</h3>
          <span className="bg-rose-100 text-rose-600 text-[9px] font-black px-2 py-0.5 rounded-full">AO VIVO</span>
        </div>
        
        <div className="space-y-4">
          {liveAuctions.slice(0, 3).map(auction => (
            <div key={auction.id} className="group cursor-pointer" onClick={showDevAlert}>
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-100 group-hover:border-rose-400 transition-colors">
                  <img src={auction.images[0]} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-indigo-600">{auction.title}</h4>
                  <p className="text-[10px] font-black text-rose-500 mt-1">
                    LANCE: R$ {auction.currentBid?.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={showDevAlert}
          className="w-full mt-6 bg-[#002B5B] text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-blue-100"
        >
          Ver Todas as Lives
        </button>
      </div>

      {/* NEW: High Impact Billboard Space */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-500">
         <div className="relative aspect-[4/5] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
            <div className="absolute top-5 left-5 bg-amber-400 text-white px-3 py-1 rounded-full text-[8px] font-black tracking-widest shadow-lg">AD: MASTER CLASS</div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
               <h4 className="text-sm font-black uppercase italic leading-tight mb-1">Domine o Mercado de Gado de Corte</h4>
               <p className="text-[9px] font-medium opacity-80 line-clamp-2">Nova turma aberta para o treinamento avançado em leilões digitais.</p>
            </div>
         </div>
         <div className="p-4 flex items-center justify-between bg-slate-50 border-t border-slate-100">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Academy" className="w-full h-full" />
               </div>
               <span className="text-[8px] font-black text-slate-400 uppercase">Sellar Academy</span>
            </div>
            <i className="fa-solid fa-arrow-up-right-from-square text-xs text-indigo-600"></i>
         </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden group cursor-pointer" onClick={() => window.dispatchEvent(new CustomEvent('open-sellar-chat'))}>
        <i className="fa-solid fa-shield-halved absolute -bottom-4 -right-4 text-white/10 text-8xl group-hover:scale-110 transition-transform duration-700"></i>
        <h4 className="font-black text-xs uppercase tracking-widest mb-2 relative z-10">Dica de Segurança</h4>
        <p className="text-[11px] font-medium leading-relaxed opacity-80 relative z-10">
          Nunca realize pagamentos fora da plataforma. O <b>Sellar Pay</b> garante que sua comissão caia na hora e seu arremate seja seguro.
        </p>
      </div>
    </aside>
  );
};

export default RightSidebar;

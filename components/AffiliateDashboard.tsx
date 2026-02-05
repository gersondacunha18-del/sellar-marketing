
import React, { useState } from 'react';
import { User, UserLevel } from '../types';
import LevelBenefitsModal from './LevelBenefitsModal';

interface AffiliateDashboardProps {
  user: User;
}

const AffiliateDashboard: React.FC<AffiliateDashboardProps> = ({ user }) => {
  const [activeCategory, setActiveCategory] = useState('Tudo');
  const [showLevelModal, setShowLevelModal] = useState(false);

  const stats = [
    { label: 'Total Ganho', value: `R$ ${user.totalCommissions.toLocaleString()}`, icon: 'fa-wallet', color: 'text-emerald-600' },
    { label: 'Vendas Indicadas', value: '42', icon: 'fa-chart-line', color: 'text-blue-600' },
    { label: 'Cliques nos Links', value: '1.2k', icon: 'fa-mouse-pointer', color: 'text-purple-600' },
    { label: 'Rank Atual', value: user.level, icon: 'fa-medal', color: 'text-amber-500' },
  ];

  const activeLinks = [
    { id: 'l1', title: 'Bezerros Nelore PO', clicks: 245, sales: 2, commission: 2947.50, status: 'Ativo', image: 'https://picsum.photos/seed/nelore/100' },
    { id: 'l2', title: 'Marmita Fit Kit', clicks: 890, sales: 15, commission: 187.50, status: 'Ativo', image: 'https://picsum.photos/seed/marmita/100' },
    { id: 'l3', title: 'Trator John Deere', clicks: 120, sales: 0, commission: 0, status: 'Aguardando', image: 'https://picsum.photos/seed/trator/100' },
  ];

  const youtubeFeed = [
    { id: 'v1', title: 'Como escalar suas vendas de gado no digital', author: 'Sellar Academy', views: '12k', time: 'há 2 horas', thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&w=800&q=80', isLive: true, duration: 'LIVE' },
    { id: 'v2', title: 'Tendências do Mercado Imobiliário Rural 2025', author: 'Ricardo Albuquerque', views: '5.4k', time: 'há 5 horas', thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&w=801&q=80', isLive: false, duration: '12:45' },
    { id: 'v3', title: 'Dicas de Ouro para Afiliados Iniciantes', author: 'Maria Afiliada', views: '28k', time: 'ontem', thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', isLive: false, duration: '08:20' },
    { id: 'v4', title: 'Análise Técnica: Tratores e Implementos', author: 'AgroMáquinas Brasil', views: '1.2k', time: 'há 1 dia', thumbnail: 'https://images.unsplash.com/photo-1530260626688-048279320445?auto=format&fit=crop&w=800&q=80', isLive: false, duration: '15:10' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className={`w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 ${stat.color}`}>
              <i className={`fa-solid ${stat.icon} text-xl`}></i>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ranking / Progress Section */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10">
            <i className="fa-solid fa-trophy text-9xl text-indigo-600"></i>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <i className="fa-solid fa-ranking-star text-indigo-600"></i>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Seu progresso para o Rank Diamante</h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Faltam R$ 2.400 em comissões para atingir o próximo nível e desbloquear bônus de 2%.</p>
            
            <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full shadow-lg" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span>{user.level}</span>
              <span>Diamante</span>
            </div>
          </div>
        </div>

        {/* Improved Quick Level Info Card */}
        <div className="bg-[#002B5B] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black uppercase italic tracking-tighter mb-4">Benefícios de Parceiro</h3>
            <p className="text-[10px] font-medium opacity-70 mb-6 leading-relaxed">
              Cada nível desbloqueia novas taxas e ferramentas exclusivas Sellar. 
              {user.level === UserLevel.OURO && ' Como OURO, você já tem acesso ao Gemini IA!'}
            </p>
            <div className="space-y-3 mb-6">
              {[
                { name: UserLevel.INICIANTE, icon: 'fa-seedling', desc: 'Acesso base' },
                { name: UserLevel.BRONZE, icon: 'fa-medal', desc: 'Saque rápido' },
                { name: UserLevel.PRATA, icon: 'fa-award', desc: '+1% Bônus' },
                { name: UserLevel.OURO, icon: 'fa-crown', desc: 'IA & VIP' },
                { name: UserLevel.DIAMANTE, icon: 'fa-gem', desc: 'Master Mind' }
              ].map((lvl) => (
                <div key={lvl.name} className={`flex items-center gap-3 p-2 rounded-xl transition-all ${user.level === lvl.name ? 'bg-white/10 text-orange-400 border border-white/10' : 'opacity-40 grayscale'}`}>
                  <i className={`fa-solid ${lvl.icon} text-xs w-4 text-center`}></i>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">{lvl.name}</span>
                    <span className="text-[7px] font-bold uppercase tracking-tighter opacity-70 mt-0.5">{lvl.desc}</span>
                  </div>
                  {user.level === lvl.name && <span className="text-[7px] bg-orange-400 text-white px-1.5 py-0.5 rounded ml-auto font-black uppercase">Atual</span>}
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setShowLevelModal(true)}
            className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg border-b-4 border-orange-800 active:border-b-0 active:translate-y-1"
          >
            Ver Benefícios Completos
          </button>
        </div>
      </div>

      {/* SELLAR TV & NEWS */}
      <div className="space-y-6 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-500/20">
              <i className="fa-brands fa-youtube text-xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white leading-none">Sellar TV & News</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Sua dose diária de mercado</p>
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {['Tudo', 'Ao Vivo', 'Leilões', 'Tutoriais', 'Análises'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                  activeCategory === cat 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white' 
                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {youtubeFeed.map(video => (
            <div key={video.id} className="group cursor-pointer space-y-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-sm">
                <img 
                  src={video.thumbnail} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={video.title} 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <i className="fa-solid fa-play text-white text-xl ml-1"></i>
                  </div>
                </div>
                <div className={`absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-black text-white ${video.isLive ? 'bg-red-600 animate-pulse' : 'bg-black/80'}`}>
                  {video.duration}
                </div>
                {video.isLive && (
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter shadow-lg">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                    AO VIVO
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 px-1">
                <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0 overflow-hidden border border-white dark:border-slate-800">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.author}`} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {video.title}
                  </h4>
                  <div className="mt-1 flex flex-col">
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                      {video.author}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {video.views} visualizações • {video.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Links Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">Minhas Divulgações Ativas</h3>
          <button className="text-indigo-600 font-bold text-sm hover:underline uppercase tracking-widest text-[10px]">Ver Histórico</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Cliques</th>
                <th className="px-6 py-4 text-center">Vendas</th>
                <th className="px-6 py-4 text-right">Ganho Previsto</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {activeLinks.map(link => (
                <tr key={link.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={link.image} className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                      <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{link.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${link.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                      {link.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-slate-600 dark:text-slate-400">{link.clicks}</td>
                  <td className="px-6 py-4 text-center font-medium text-slate-600 dark:text-slate-400">{link.sales}</td>
                  <td className="px-6 py-4 text-right font-black text-indigo-600 dark:text-indigo-400">R$ {link.commission.toLocaleString('pt-BR')}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-slate-400 hover:text-indigo-600 p-2 transition-colors">
                      <i className="fa-solid fa-link"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {showLevelModal && <LevelBenefitsModal onClose={() => setShowLevelModal(false)} currentLevel={user.level as UserLevel} />}
    </div>
  );
};

export default AffiliateDashboard;

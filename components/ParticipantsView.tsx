
import React, { useState } from 'react';
import { User, UserLevel } from '../types';

interface ParticipantsViewProps {
  users: User[];
  isDarkMode: boolean;
  onBack: () => void;
}

const ParticipantsView: React.FC<ParticipantsViewProps> = ({ users, isDarkMode, onBack }) => {
  const [filter, setFilter] = useState<'ALL' | 'MERCHANT' | 'BUYER' | 'AFFILIATE'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => {
    const matchesFilter = filter === 'ALL' || u.type === filter || (filter === 'MERCHANT' && u.isPartner);
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (u as any).email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getRoleBadge = (type: string) => {
    switch(type) {
      case 'MERCHANT': return { label: 'Vendedor', color: 'bg-orange-100 text-orange-600 border-orange-200' };
      case 'BUYER': return { label: 'Comprador', color: 'bg-blue-100 text-blue-600 border-blue-200' };
      case 'AFFILIATE': return { label: 'Afiliado', color: 'bg-purple-100 text-purple-600 border-purple-200' };
      default: return { label: 'Híbrido / Master', color: 'bg-indigo-100 text-indigo-600 border-indigo-200' };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className={`group flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}
        >
          <i className="fa-solid fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
          <span className="text-[10px] font-black uppercase tracking-widest">Painel Principal</span>
        </button>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800 opacity-50"></div>
      </div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className={`text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-[#002B5B]'}`}>Participantes</h2>
            <div className="bg-indigo-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter animate-pulse shadow-lg shadow-indigo-500/20">
              <i className="fa-solid fa-lock mr-1.5"></i>
              Exclusivo Admin
            </div>
          </div>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">Visualização de Base de Dados e Governança Sellar</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative group">
             <input 
               type="text" 
               placeholder="Buscar por nome ou e-mail..." 
               className={`w-full md:w-64 border rounded-2xl py-3 px-10 text-[10px] font-black uppercase tracking-tight focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'}`} 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
             <i className="fa-solid fa-magnifying-glass absolute left-4 top-3.5 text-slate-300"></i>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            {['ALL', 'MERCHANT', 'BUYER', 'AFFILIATE'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {f === 'ALL' ? 'Todos' : f === 'MERCHANT' ? 'Vendedores' : f === 'BUYER' ? 'Compradores' : 'Afiliados'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className={`rounded-[32px] border shadow-2xl overflow-hidden transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className={`text-[10px] font-black uppercase tracking-[0.2em] border-b ${isDarkMode ? 'bg-slate-800/50 text-slate-500 border-slate-700' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                <th className="px-8 py-5">Perfil do Participante</th>
                <th className="px-8 py-5">Rank Sellar</th>
                <th className="px-8 py-5">Acesso de Rede</th>
                <th className="px-8 py-5">Criptografia Dados</th>
                <th className="px-8 py-5 text-right">Controle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((user) => {
                const badge = getRoleBadge(user.type);
                const isHybrid = user.type === 'HYBRID';
                return (
                  <tr key={user.id} className={`group transition-colors ${isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}`}>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full border-2 p-0.5 shrink-0 ${isHybrid ? 'border-indigo-500 shadow-indigo-200 shadow-lg' : 'border-slate-200'}`}>
                          <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div>
                          <p className={`font-black text-xs uppercase tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {user.name}
                            {isHybrid && <i className="fa-solid fa-gem text-[10px] text-indigo-500"></i>}
                          </p>
                          <p className="text-[10px] font-medium text-slate-400 lowercase italic">{(user as any).email || 'protegido via onboarding'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.level === UserLevel.DIAMANTE ? 'bg-cyan-400 animate-pulse' : 'bg-amber-400'}`}></div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{user.level}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${badge.color}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-emerald-500">
                          <i className="fa-solid fa-shield-check text-[10px]"></i>
                          <span className="text-[9px] font-black uppercase tracking-widest">Validado AI</span>
                        </div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">HASH: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 transition-colors flex items-center justify-center">
                          <i className="fa-solid fa-eye text-xs"></i>
                        </button>
                        {!isHybrid && (
                          <button className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500 transition-colors flex items-center justify-center">
                            <i className="fa-solid fa-ban text-xs"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`p-8 rounded-[32px] border border-dashed flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
         <div className="text-center md:text-left">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Auditoria Sellar Marketing</p>
            <p className="text-[9px] font-medium text-slate-400 mt-1 italic">Todos os perfis híbridos possuem supervisão mútua de logs.</p>
         </div>
         <button 
           onClick={onBack}
           className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-700 active:scale-95 transition-all"
         >
           Sair da Gestão
         </button>
      </div>
    </div>
  );
};

export default ParticipantsView;

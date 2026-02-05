
import React, { useState } from 'react';
import LevelBenefitsModal from './LevelBenefitsModal';
import { UserLevel, User } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleGoHome: () => void;
  hasNewAlert?: boolean;
  isDarkMode?: boolean;
  toggleTheme?: () => void;
  currentUser?: User | null;
}

export const BrandLogo: React.FC<{ size?: string, showText?: boolean, onClick?: () => void }> = ({ size = "w-16 h-16", showText = true, onClick }) => (
  <div 
    onClick={onClick} 
    className={`flex flex-col items-center md:items-start gap-1 select-none group ${onClick ? 'cursor-pointer' : ''} overflow-visible`}
  >
    <div className={`${size} relative transition-all duration-500 group-hover:scale-105 overflow-visible`}>
      <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl overflow-visible">
        <defs>
          <linearGradient id="tagGradDeep" x1="400" y1="120" x2="400" y2="440" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#001B3B" />
            <stop offset="100%" stopColor="#000A1A" />
          </linearGradient>
          <linearGradient id="goldRing" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>
          <filter id="iconGlow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Círculo de Fundo Decorativo */}
        <circle cx="400" cy="300" r="280" fill="url(#tagGradDeep)" opacity="0.05" />

        {/* Primary Dark Blue Tag (Fundo da Tag) */}
        <g filter="url(#iconGlow)">
          <path d="M300 140 C300 100, 500 100, 500 140 L550 440 C550 480, 250 480, 250 440 Z" fill="url(#tagGradDeep)" />
          <circle cx="400" cy="170" r="18" fill="white" />
        </g>

        {/* Martelo de Leilão Premium - Azul Escuro e Ouro */}
        <g transform="rotate(-35, 400, 300)" filter="url(#iconGlow)">
          {/* Cabo em Ouro Escuro */}
          <rect x="385" y="320" width="30" height="240" rx="15" fill="#8B6B08" stroke="#000" strokeWidth="1" />
          
          <g transform="translate(265, 200)">
             {/* Cabeça do Martelo - Azul Profundo */}
             <rect x="0" y="0" width="270" height="130" rx="20" fill="#001B3B" stroke="#FFD700" strokeWidth="3" />
             {/* Anéis de Ouro */}
             <rect x="30" y="0" width="25" height="130" fill="url(#goldRing)" />
             <rect x="215" y="0" width="25" height="130" fill="url(#goldRing)" />
             {/* Brilho de Luxo */}
             <rect x="10" y="10" width="250" height="15" rx="7.5" fill="rgba(255,255,255,0.15)" />
          </g>
        </g>

        {/* Moedas Flutuantes e Elementos Sociais */}
        <g filter="url(#iconGlow)">
           <circle cx="680" cy="350" r="50" fill="url(#goldRing)" stroke="#E65100" strokeWidth="2" />
           <text x="662" y="372" fill="#784100" fontSize="60" fontWeight="900" fontFamily="Arial Black">$</text>
           
           <circle cx="150" cy="480" r="40" fill="url(#goldRing)" stroke="#E65100" strokeWidth="1.5" />
           <text x="136" y="496" fill="#784100" fontSize="45" fontWeight="900" fontFamily="Arial Black">$</text>
           
           <path d="M600 180 C600 160, 660 160, 660 180 C660 210, 600 240, 600 240 C600 240, 540 210, 540 180 C540 160, 600 160, 600 180" fill="#F15A24" />
        </g>
      </svg>
    </div>
    {showText && (
      <div className="hidden md:block text-center md:text-left overflow-visible mt-2">
        <h1 className="flex flex-col leading-none items-center md:items-start -mt-4 overflow-visible">
          <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic bg-gradient-to-b from-[#FFD700] to-[#B8860B] bg-clip-text text-transparent drop-shadow-md pr-12 block whitespace-nowrap">
            Sellar
          </span>
          <span className="text-[#001B3B] dark:text-slate-300 uppercase text-[9px] md:text-[10px] tracking-[0.6em] font-black mt-1 ml-1 block whitespace-nowrap">
            Universal
          </span>
        </h1>
      </div>
    )}
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, handleGoHome, hasNewAlert, isDarkMode, toggleTheme, currentUser }) => {
  const [showLevelInfo, setShowLevelInfo] = useState(false);
  const isAdmin = currentUser?.role === 'HYBRID';

  const menuItems = [
    { id: 'feed', icon: 'fa-home', label: 'Início', action: handleGoHome },
    { id: 'auctions', icon: 'fa-gavel', label: 'Leilões Live', action: () => setActiveTab('auctions') },
    { id: 'marketplace', icon: 'fa-shopping-bag', label: 'Mercado', action: () => setActiveTab('marketplace') },
    { id: 'commissions', icon: 'fa-wallet', label: 'Minha Carteira', action: () => setActiveTab('commissions') },
    ...(isAdmin ? [{ id: 'participants', icon: 'fa-users-gear', label: 'Gestão Master', action: () => setActiveTab('participants') }] : []),
    { id: 'settings', icon: 'fa-gear', label: 'Ajustes', action: () => setActiveTab('settings') },
  ];

  return (
    <>
      <aside className={`hidden md:flex w-72 border-r h-screen sticky top-0 flex-col transition-all z-40 shrink-0 shadow-2xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="p-8 pb-4">
          <BrandLogo size="w-56 h-48" onClick={handleGoHome} />
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative group ${
                activeTab === item.id 
                ? (isDarkMode ? 'bg-slate-800 text-white font-black' : 'bg-[#F0F4F8] text-[#001B3B] font-black border border-blue-50') 
                : (isDarkMode ? 'text-slate-500 hover:bg-slate-800/50' : 'text-slate-500 hover:bg-slate-50')
              }`}
            >
              <i className={`fa-solid ${item.icon} text-lg w-6 shrink-0 text-center`}></i>
              <span className="text-left text-xs font-bold uppercase tracking-widest">{item.label}</span>
              {item.id === 'participants' && (
                 <div className="absolute right-4 bg-indigo-600 text-[8px] text-white px-2 py-0.5 rounded-md font-black">MASTER</div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 space-y-4 border-t border-slate-50 dark:bg-slate-800/20 dark:border-slate-800">
          <div className="flex justify-between items-center px-4 mb-2">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Aparência</span>
            <button onClick={toggleTheme} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-indigo-600 text-white shadow-indigo-500/20' : 'bg-slate-100 text-amber-500 border border-slate-200'}`}>
               <i className={`fa-solid ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
          </div>

          <div onClick={() => setShowLevelInfo(true)} className={`rounded-2xl p-4 border cursor-pointer transition-all shadow-sm group ${isDarkMode ? 'bg-slate-900 border-slate-700 hover:border-orange-500' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
             <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">• {isAdmin ? 'ADMIN MASTER' : `NÍVEL ${currentUser?.level.toUpperCase() || 'OURO'}`}</span>
                <i className={`fa-solid ${isAdmin ? 'fa-gem text-cyan-400' : 'fa-crown text-amber-500'} text-xs group-hover:scale-125 transition-transform`}></i>
             </div>
             <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${isAdmin ? 'from-cyan-400 to-indigo-600 w-full' : 'from-[#F15A24] to-[#BE1E2D] w-3/4'}`}></div>
             </div>
          </div>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-sellar-chat'))} className="w-full bg-[#001B3B] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl border-b-4 border-[#000] active:border-b-0 active:translate-y-1 hover:brightness-125 transition-all">
            {isAdmin ? 'Central de Comando' : 'Sellar Suporte'}
          </button>
        </div>
      </aside>

      {/* Navegação Mobile com Design Premium */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 border-t h-20 z-[1000] flex items-center justify-between px-4 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.1)] transition-colors duration-500 ${isDarkMode ? 'bg-slate-900/95 border-slate-800 backdrop-blur-md' : 'bg-white/95 border-slate-100 backdrop-blur-md'}`}>
        {menuItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`flex flex-col items-center justify-center flex-1 gap-1 transition-all h-full ${
              activeTab === item.id ? 'text-[#F15A24] scale-110' : (isDarkMode ? 'text-slate-500' : 'text-slate-400')
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg`}></i>
            <span className={`text-[8px] font-black uppercase tracking-tighter ${activeTab === item.id ? 'opacity-100' : 'opacity-60'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {showLevelInfo && <LevelBenefitsModal onClose={() => setShowLevelInfo(false)} currentLevel={isAdmin ? UserLevel.DIAMANTE : (currentUser?.level || UserLevel.OURO)} />}
    </>
  );
};

export default Sidebar;

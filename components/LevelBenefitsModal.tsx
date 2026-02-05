
import React from 'react';
import { UserLevel } from '../types';

interface LevelBenefitsModalProps {
  onClose: () => void;
  currentLevel: UserLevel;
}

const LevelBenefitsModal: React.FC<LevelBenefitsModalProps> = ({ onClose, currentLevel }) => {
  const levels = [
    {
      name: UserLevel.INICIANTE,
      color: 'bg-slate-400',
      icon: 'fa-seedling',
      req: 'Padrão Inicial',
      benefits: ['Acesso ao Marketplace', 'Suporte via Chat Central', 'Links de Afiliado Padrão']
    },
    {
      name: UserLevel.BRONZE,
      color: 'bg-orange-700',
      icon: 'fa-medal',
      req: 'R$ 1.000 em vendas',
      benefits: ['Selo Bronze no Perfil', 'Participação em Sorteios Mensais', 'Taxa de Saque Reduzida']
    },
    {
      name: UserLevel.PRATA,
      color: 'bg-slate-300',
      icon: 'fa-award',
      req: 'R$ 5.000 em vendas',
      benefits: ['Prioridade na Busca Global', '+1% de Bônus em Comissões', 'Selo de Verificado Prata']
    },
    {
      name: UserLevel.OURO,
      color: 'bg-amber-400',
      icon: 'fa-crown',
      req: 'R$ 20.000 em vendas',
      benefits: ['Gerador de Vídeos IA (Veo)', 'Suporte VIP via WhatsApp', 'Análise de Preço via Gemini']
    },
    {
      name: UserLevel.DIAMANTE,
      color: 'bg-cyan-400',
      icon: 'fa-gem',
      req: 'R$ 100.000 em vendas',
      benefits: ['Taxa de Plataforma Fixa 2%', 'Destaque na Home Global', 'Acesso ao Grupo Mastermind']
    }
  ];

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div className="bg-white rounded-[40px] w-full max-w-4xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-3xl font-black text-[#002B5B] uppercase tracking-tighter italic">Benefícios de Nível</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Sua trilha de sucesso no Sellar Marketing</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-red-500 transition-all shadow-sm">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-5 gap-4 bg-slate-100/50">
          {levels.map((lvl) => (
            <div 
              key={lvl.name}
              className={`p-6 rounded-[32px] transition-all border-2 flex flex-col items-center text-center ${
                currentLevel === lvl.name 
                ? 'bg-white border-indigo-500 shadow-xl scale-105 z-10' 
                : 'bg-white/40 border-transparent opacity-80'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl ${lvl.color} text-white flex items-center justify-center text-2xl shadow-lg mb-4`}>
                <i className={`fa-solid ${lvl.icon}`}></i>
              </div>
              <h3 className="font-black text-xs uppercase tracking-tighter text-slate-900 mb-1">{lvl.name}</h3>
              <p className="text-[10px] font-bold text-slate-400 mb-4">{lvl.req}</p>
              
              <div className="space-y-3 flex-1">
                {lvl.benefits.map((b, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <i className="fa-solid fa-check text-[10px] text-emerald-500 mb-1"></i>
                    <p className="text-[10px] font-medium text-slate-600 leading-tight">{b}</p>
                  </div>
                ))}
              </div>

              {currentLevel === lvl.name && (
                <div className="mt-4 bg-indigo-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase">Seu Nível</div>
              )}
            </div>
          ))}
        </div>

        <div className="p-8 bg-white text-center">
          <p className="text-sm text-slate-500 font-medium max-w-2xl mx-auto">
            Venda mais e convide novos parceiros para acelerar sua jornada. 
            Mantenha a constância para garantir as <span className="text-indigo-600 font-bold">taxas reduzidas</span> e <span className="text-indigo-600 font-bold">ferramentas exclusivas</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LevelBenefitsModal;

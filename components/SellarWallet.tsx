
import React, { useState } from 'react';
import { User, Transaction } from '../types';

interface SellarWalletProps {
  user: User;
  isDarkMode: boolean;
}

const SellarWallet: React.FC<SellarWalletProps> = ({ user, isDarkMode }) => {
  const [showAddFunds, setShowAddFunds] = useState(false);
  
  const transactions: Transaction[] = [
    { id: 't1', type: 'CREDIT', amount: 4500.00, description: 'Comissão: Lote Bezerros Nelore', timestamp: Date.now() - 86400000, status: 'COMPLETED' },
    { id: 't2', type: 'DEBIT', amount: 1200.00, description: 'Pagamento: Upgrade Rank Ouro', timestamp: Date.now() - 172800000, status: 'COMPLETED' },
    { id: 't3', type: 'CREDIT', amount: 150.50, description: 'Comissão: Venda direta Utilitários', timestamp: Date.now() - 259200000, status: 'COMPLETED' },
  ];

  return (
    <div className="space-y-6">
      {/* Principal Card - Glassmorphism */}
      <div className={`relative p-8 rounded-[40px] border overflow-hidden shadow-2xl transition-all ${
        isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-gradient-to-br from-[#002B5B] to-indigo-900 text-white border-white/10'
      }`}>
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <i className="fa-solid fa-building-columns text-9xl"></i>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Saldo Consolidado</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold opacity-60">R$</span>
                <h2 className="text-5xl font-black italic tracking-tighter">
                  {(user.balance_available + user.totalCommissions).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h2>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="text-[8px] font-black uppercase opacity-60">Bloqueado em Lances</p>
                <p className="text-sm font-bold">R$ {user.balance_locked.toLocaleString('pt-BR')}</p>
              </div>
              <div className="px-4 py-2 bg-emerald-500/20 backdrop-blur-md rounded-2xl border border-emerald-500/20 text-emerald-400">
                <p className="text-[8px] font-black uppercase opacity-80">Recebíveis Previstos</p>
                <p className="text-sm font-bold">R$ 12.450,00</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 justify-center">
            <button 
              onClick={() => setShowAddFunds(true)}
              className="bg-[#F15A24] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-plus-circle"></i>
              Adicionar Saldo
            </button>
            <button className="bg-white/10 text-white backdrop-blur-md px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <i className="fa-solid fa-arrow-up-from-bracket"></i>
              Configurar Gateway
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Métodos de Pagamento */}
        <div className={`p-8 rounded-[32px] border transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Gateways Conectados</h3>
            <i className="fa-solid fa-shield-halved text-emerald-500"></i>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm">
                  <i className="fa-brands fa-cc-visa text-xl"></i>
                </div>
                <div>
                  <p className="text-xs font-bold dark:text-white">Visa Final 4492</p>
                  <p className="text-[10px] text-slate-400 font-medium">Expira em 12/28</p>
                </div>
              </div>
              <span className="text-[9px] font-black text-emerald-500 uppercase">Ativo</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                  <i className="fa-solid fa-building-columns text-sm"></i>
                </div>
                <div>
                  <p className="text-xs font-bold dark:text-white">Chave PIX (CPF)</p>
                  <p className="text-[10px] text-slate-400 font-medium">Recebimento Instantâneo</p>
                </div>
              </div>
              <span className="text-[9px] font-black text-indigo-500 uppercase">Principal</span>
            </div>

            <button className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-all">
              + Conectar Novo Gateway
            </button>
          </div>
        </div>

        {/* Extrato Recente */}
        <div className={`p-8 rounded-[32px] border transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <h3 className={`text-xs font-black uppercase tracking-widest mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Extrato Financeiro</h3>
          <div className="space-y-6">
            {transactions.map(t => (
              <div key={t.id} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === 'CREDIT' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    <i className={`fa-solid ${t.type === 'CREDIT' ? 'fa-arrow-down' : 'fa-arrow-up'} text-[10px]`}></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold dark:text-white line-clamp-1">{t.description}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{new Date(t.timestamp).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <div className={`text-xs font-black ${t.type === 'CREDIT' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {t.type === 'CREDIT' ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 text-center text-[10px] font-black text-indigo-600 uppercase hover:underline">Ver Histórico Completo</button>
        </div>
      </div>

      {showAddFunds && (
        <div className="fixed inset-0 z-[1500] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
          <div className="bg-white rounded-[40px] w-full max-w-md p-8 animate-in zoom-in duration-300">
             <div className="flex justify-between items-center mb-8">
               <h3 className="text-2xl font-black text-[#002B5B] uppercase tracking-tighter italic">Adicionar Saldo</h3>
               <button onClick={() => setShowAddFunds(false)} className="text-slate-400 hover:text-red-500"><i className="fa-solid fa-xmark"></i></button>
             </div>

             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Valor do Depósito (BRL)</label>
                   <div className="relative">
                      <input type="number" placeholder="0,00" className="w-full bg-slate-100 border-none rounded-2xl p-4 font-black text-xl text-[#002B5B] outline-none" />
                      <span className="absolute right-4 top-4 text-slate-300 font-black">R$</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button className="p-4 border-2 border-indigo-500 bg-indigo-50 rounded-2xl flex flex-col items-center gap-2">
                      <i className="fa-solid fa-qrcode text-xl text-indigo-600"></i>
                      <span className="text-[9px] font-black uppercase">Via PIX</span>
                   </button>
                   <button className="p-4 border-2 border-slate-100 rounded-2xl flex flex-col items-center gap-2 opacity-60">
                      <i className="fa-solid fa-credit-card text-xl text-slate-400"></i>
                      <span className="text-[9px] font-black uppercase">Cartão</span>
                   </button>
                </div>

                <button className="w-full bg-[#002B5B] text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">
                   Gerar QR Code de Pagamento
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellarWallet;

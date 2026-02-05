
import React, { useState } from 'react';
import { UserLevel, Category } from '../types';
import { BrandLogo } from './Sidebar';
import LevelBenefitsModal from './LevelBenefitsModal';

interface OnboardingProps {
  onComplete: (userData: any) => void;
  isDarkMode: boolean;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, isDarkMode }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'MERCHANT' | 'BUYER' | 'AFFILIATE' | 'HYBRID' | null>(null);
  const [adminCode, setAdminCode] = useState('');
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    document: '',
    phone: ''
  });

  const handleNext = () => {
    if (step === 2) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setStep(3);
      }, 3000);
    } else {
      setStep(step + 1);
    }
  };

  const finish = () => {
    onComplete({
      ...formData,
      role: role === 'HYBRID' ? 'HYBRID' : role,
      type: role,
      level: role === 'HYBRID' ? UserLevel.DIAMANTE : UserLevel.INICIANTE,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
      isPartner: role === 'MERCHANT' || role === 'HYBRID'
    });
  };

  const standardRoles = [
    { id: 'MERCHANT', title: 'Vendedor / Parceiro', icon: 'fa-shop', desc: 'Anunciar lotes e gerir leilões.' },
    { id: 'BUYER', title: 'Comprador / Investidor', icon: 'fa-gavel', desc: 'Arrematar ativos de alto valor.' },
    { id: 'AFFILIATE', title: 'Afiliado Digital', icon: 'fa-bullhorn', desc: 'Divulgar links e ganhar comissões.' },
  ];

  return (
    <div className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 transition-colors duration-500 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F15A24] blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#002B5B] blur-[150px] rounded-full"></div>
      </div>

      <div className={`relative w-full max-w-2xl rounded-[48px] shadow-2xl border p-8 md:p-12 overflow-hidden animate-in fade-in zoom-in duration-500 transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800 backdrop-blur-xl' : 'bg-white/80 border-white backdrop-blur-xl'}`}>
        
        <div className="flex gap-2 mb-12">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-[#F15A24]' : 'bg-slate-200'}`}></div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <header className="text-center md:text-left">
              <div className="mb-6 inline-block"><BrandLogo size="w-20 h-20" showText={false} /></div>
              <h2 className={`text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-4 ${isDarkMode ? 'text-white' : 'text-[#002B5B]'}`}>
                Faça parte da elite.
              </h2>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Escolha seu perfil de atuação</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {standardRoles.map(opt => (
                <button 
                  key={opt.id}
                  onClick={() => { setRole(opt.id as any); setShowAdminInput(false); }}
                  className={`p-6 rounded-[32px] border-2 text-left transition-all hover:scale-[1.02] active:scale-95 ${
                    role === opt.id 
                    ? 'border-[#F15A24] bg-orange-50/10 shadow-lg' 
                    : (isDarkMode ? 'border-slate-800 bg-slate-800/50 text-slate-400' : 'border-slate-100 bg-slate-50 text-slate-500')
                  }`}
                >
                  <i className={`fa-solid ${opt.icon} text-2xl mb-3 ${role === opt.id ? 'text-[#F15A24]' : 'text-slate-400'}`}></i>
                  <h4 className={`font-black text-xs uppercase tracking-widest mb-1 ${role === opt.id && isDarkMode ? 'text-white' : ''}`}>{opt.title}</h4>
                  <p className="text-[10px] font-medium opacity-70">{opt.desc}</p>
                </button>
              ))}
              
              <button 
                onClick={() => setShowAdminInput(!showAdminInput)}
                className={`p-6 rounded-[32px] border-2 border-dashed text-left transition-all hover:scale-[1.02] ${
                  role === 'HYBRID' 
                  ? 'border-indigo-500 bg-indigo-50/10 shadow-lg' 
                  : (isDarkMode ? 'border-slate-800 bg-slate-800/20 text-slate-600' : 'border-slate-100 bg-slate-50/50 text-slate-400')
                }`}
              >
                <i className={`fa-solid fa-user-shield text-2xl mb-3 ${role === 'HYBRID' ? 'text-indigo-500' : 'text-slate-400'}`}></i>
                <h4 className="font-black text-xs uppercase tracking-widest mb-1">Acesso Gestor</h4>
                <p className="text-[10px] font-medium opacity-70">Apenas para administradores autorizados.</p>
              </button>
            </div>

            {/* Level Explanation Section */}
            <div className={`p-6 rounded-[32px] border ${isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Planos de Carreira Sellar</h4>
                <button 
                  onClick={() => setShowLevelModal(true)}
                  className="text-[9px] font-black uppercase tracking-tighter text-slate-400 hover:text-indigo-500 underline underline-offset-4"
                >
                  Ver Benefícios Completos
                </button>
              </div>
              <p className={`text-[11px] font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Nossa plataforma recompensa o desempenho. Comece como <b className="text-slate-400">Iniciante</b> e escale até <b className="text-cyan-400">Diamante</b> para desbloquear ferramentas IA, taxas exclusivas e bônus de comissão.
              </p>
            </div>

            {showAdminInput && (
              <div className="p-6 bg-indigo-600 rounded-[32px] animate-in slide-in-from-top-4 duration-300">
                <label className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-2 block">Token de Acesso Admin</label>
                <div className="flex gap-2">
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="flex-1 bg-white/10 border-none rounded-2xl p-4 text-white font-bold placeholder:text-white/30 outline-none focus:ring-2 focus:ring-white"
                    value={adminCode}
                    onChange={e => {
                      setAdminCode(e.target.value);
                      if(e.target.value === 'ADMIN123') setRole('HYBRID');
                    }}
                  />
                  {role === 'HYBRID' && (
                    <div className="w-14 h-14 bg-emerald-400 text-white rounded-2xl flex items-center justify-center animate-bounce">
                      <i className="fa-solid fa-check"></i>
                    </div>
                  )}
                </div>
                <p className="text-[9px] text-white/40 mt-3 italic">* Dica para demo: ADMIN123</p>
              </div>
            )}

            <button 
              disabled={!role}
              onClick={handleNext}
              className="w-full bg-[#002B5B] text-white py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all disabled:opacity-30"
            >
              Continuar para Identificação
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <header>
              <h2 className={`text-3xl font-black uppercase italic tracking-tighter leading-none mb-2 ${isDarkMode ? 'text-white' : 'text-[#002B5B]'}`}>Identificação Sellar</h2>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Seus dados estão protegidos por criptografia militar</p>
            </header>

            <div className="space-y-4">
              <div className="group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Nome Completo ou Razão Social</label>
                <input 
                  type="text" 
                  className={`w-full border rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-[#F15A24] outline-none transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100'}`}
                  placeholder="Ex: Ricardo Albuquerque"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">E-mail Corporativo</label>
                  <input 
                    type="email" 
                    className={`w-full border rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-[#F15A24] outline-none transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100'}`}
                    placeholder="contato@empresa.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">CPF ou CNPJ</label>
                  <input 
                    type="text" 
                    className={`w-full border rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-[#F15A24] outline-none transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100'}`}
                    placeholder="000.000.000-00"
                    value={formData.document}
                    onChange={e => setFormData({...formData, document: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 py-5 font-black text-slate-400 uppercase text-[10px] tracking-widest">Voltar</button>
              <button 
                disabled={!formData.name || !formData.email}
                onClick={handleNext}
                className="flex-[2] bg-[#F15A24] text-white py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-xl hover:brightness-110 transition-all disabled:opacity-30"
              >
                {isVerifying ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : <i className="fa-solid fa-shield-check mr-2"></i>}
                {isVerifying ? 'Analisando Perfil...' : 'Verificar Cadastro'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-8 animate-in zoom-in duration-500">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-inner ${role === 'HYBRID' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
              <i className={`fa-solid ${role === 'HYBRID' ? 'fa-user-crown' : 'fa-check'} text-4xl`}></i>
            </div>
            
            <header>
              <h2 className={`text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none mb-4 ${isDarkMode ? 'text-white' : 'text-[#002B5B]'}`}>
                {role === 'HYBRID' ? 'Portal de Gestão' : 'Acesso Autorizado.'}
              </h2>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] max-w-sm mx-auto">
                {role === 'HYBRID' 
                  ? 'Você foi autenticado como Administrador Master do SELLER Group.' 
                  : 'O Sellar Guard validou seus dados. Você já pode operar no mercado global.'}
              </p>
            </header>

            <div className={`p-6 rounded-[32px] border-2 border-dashed ${isDarkMode ? 'border-slate-800 bg-slate-800/30' : 'border-slate-100 bg-slate-50'}`}>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Status da Conta</p>
              <span className={`${role === 'HYBRID' ? 'text-indigo-600' : 'text-emerald-600'} font-black text-xs uppercase tracking-widest bg-white px-4 py-2 rounded-full shadow-sm`}>
                {role === 'HYBRID' ? 'ADMINISTRADOR MASTER' : 'VERIFICADO NÍVEL 1'}
              </span>
            </div>

            <button 
              onClick={finish}
              className={`w-full py-5 rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all text-white ${role === 'HYBRID' ? 'bg-indigo-600' : 'bg-[#002B5B]'}`}
            >
              Entrar na Plataforma
            </button>
          </div>
        )}
      </div>
      {showLevelModal && <LevelBenefitsModal onClose={() => setShowLevelModal(false)} currentLevel={role === 'HYBRID' ? UserLevel.DIAMANTE : UserLevel.INICIANTE} />}
    </div>
  );
};

export default Onboarding;

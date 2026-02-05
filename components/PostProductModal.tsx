
import React, { useState, useEffect } from 'react';
import { Category, Product } from '../types';
import { COMMISSION_RATES } from '../constants';
import { enhanceDescription } from '../services/geminiService';

interface PostProductModalProps {
  onClose: () => void;
  onPost: (product: Partial<Product>) => void;
}

const PostProductModal: React.FC<PostProductModalProps> = ({ onClose, onPost }) => {
  const [isAuction, setIsAuction] = useState(false);
  const [acceptedContract, setAcceptedContract] = useState(false);
  const [step, setStep] = useState(1);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [commissionType, setCommissionType] = useState<'PERCENT' | 'FIXED'>('PERCENT');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: Category.UTILITARIOS,
    images: ['https://picsum.photos/seed/newpost/800'],
    customCommission: 0,
    fixedCommissionValue: 0
  });

  const sysMinCommPercent = Math.round(COMMISSION_RATES[formData.category] * 100);

  useEffect(() => {
    // Ao trocar categoria, resetamos para o mínimo do sistema se for percentual
    if (commissionType === 'PERCENT') {
      setFormData(prev => ({
        ...prev,
        customCommission: sysMinCommPercent
      }));
    } else {
      // Se for fixo, sugerimos uma fatia do preço atual se houver
      const priceNum = Number(formData.price) || 0;
      setFormData(prev => ({
        ...prev,
        fixedCommissionValue: Math.round(priceNum * (sysMinCommPercent / 100))
      }));
    }
  }, [formData.category, commissionType]);

  const handleEnhance = async () => {
    if (!formData.title || isEnhancing) return;
    setIsEnhancing(true);
    try {
      const newDesc = await enhanceDescription(formData.title, formData.description);
      setFormData(prev => ({ ...prev, description: newDesc || prev.description }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleNext = () => {
    if (isAuction && step === 1) {
      setStep(2);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const finalPrice = Number(formData.price);
    // Calcula a taxa efetiva para o objeto Product
    const effectiveRate = commissionType === 'PERCENT' 
      ? formData.customCommission / 100 
      : (finalPrice > 0 ? formData.fixedCommissionValue / finalPrice : 0);

    onPost({
      ...formData,
      price: finalPrice,
      isAuction,
      commissionRate: effectiveRate,
      partnerName: 'Você (Parceiro)',
      isVerifiedPartner: true,
      sellerId: 'me',
      id: Math.random().toString(36).substr(2, 9),
      currentBid: isAuction ? finalPrice : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-[#002B5B]/90 backdrop-blur-md">
      <div className="bg-white rounded-[40px] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-2xl font-black text-[#002B5B] uppercase tracking-tighter italic">
              {step === 1 ? 'Novo Anúncio' : 'Contrato de Gestão'}
            </h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Monitorado pela Administração Central</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-red-500 transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="p-8 max-h-[60vh] overflow-y-auto no-scrollbar">
          {step === 1 ? (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsAuction(false)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${!isAuction ? 'border-[#F15A24] bg-orange-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}
                >
                  <i className="fa-solid fa-tag text-xl"></i>
                  <span className="font-black text-[10px] uppercase">Venda Direta</span>
                </button>
                <button 
                  onClick={() => setIsAuction(true)}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${isAuction ? 'border-[#BE1E2D] bg-red-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}
                >
                  <i className="fa-solid fa-gavel text-xl"></i>
                  <span className="font-black text-[10px] uppercase">Leilão Live</span>
                </button>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Título do Lote</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-100 border-none rounded-2xl p-4 font-bold text-slate-700 focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Ex: Lote de 50 Bezerros Nelore"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Preço Base (BRL)</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-100 border-none rounded-2xl p-4 font-bold text-slate-700"
                    placeholder="R$ 0,00"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Categoria</label>
                  <select 
                    className="w-full bg-slate-100 border-none rounded-2xl p-4 font-bold text-slate-700 appearance-none"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value as Category})}
                  >
                    {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              {/* SEÇÃO DE COMISSÃO MELHORADA */}
              <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest block">Oferta de Comissão</label>
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Quanto os afiliados ganham por indicação</p>
                  </div>
                  <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    <button 
                      onClick={() => setCommissionType('PERCENT')}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all ${commissionType === 'PERCENT' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400'}`}
                    >
                      %
                    </button>
                    <button 
                      onClick={() => setCommissionType('FIXED')}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all ${commissionType === 'FIXED' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400'}`}
                    >
                      R$
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-6">
                  {commissionType === 'PERCENT' ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <input 
                          type="range" 
                          min={sysMinCommPercent} 
                          max="40" 
                          step="0.5"
                          className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                          value={formData.customCommission}
                          onChange={e => setFormData({...formData, customCommission: Number(e.target.value)})}
                        />
                        <div className="relative">
                          <input 
                            type="number"
                            min={sysMinCommPercent}
                            className="w-20 text-center bg-white border border-slate-200 rounded-xl py-3 font-black text-indigo-600 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={formData.customCommission}
                            onChange={e => setFormData({...formData, customCommission: Math.max(sysMinCommPercent, Number(e.target.value))})}
                          />
                          <span className="absolute right-2 top-3 text-[10px] font-black text-slate-300">%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Mínimo sugerido: {sysMinCommPercent}%</span>
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Atratividade: {formData.customCommission > 10 ? 'Alta 🔥' : 'Média'}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <input 
                          type="number"
                          placeholder="Valor em R$"
                          className="w-full bg-white border border-slate-200 rounded-2xl p-4 font-black text-indigo-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                          value={formData.fixedCommissionValue}
                          onChange={e => setFormData({...formData, fixedCommissionValue: Number(e.target.value)})}
                        />
                        <i className="fa-solid fa-coins absolute right-5 top-4.5 text-slate-200"></i>
                      </div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter italic">
                        * O valor será fixo independente de alterações no lance final (se leilão).
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Descrição do Lote</label>
                  <button 
                    onClick={handleEnhance}
                    disabled={isEnhancing || !formData.title}
                    className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-800 disabled:opacity-40"
                  >
                    <i className={`fa-solid ${isEnhancing ? 'fa-spinner fa-spin' : 'fa-wand-magic-sparkles'}`}></i>
                    IA MODERADA
                  </button>
                </div>
                <textarea 
                  className="w-full bg-slate-100 border-none rounded-2xl p-4 font-bold text-slate-700 h-24 text-xs"
                  placeholder="Detalhes técnicos, localização, etc..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-[40px] border-4 border-indigo-500/30">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center"><i className="fa-solid fa-shield-halved text-white"></i></div>
                   <h4 className="font-black text-lg uppercase tracking-tighter italic">Governança Centralizada</h4>
                </div>
                <ul className="space-y-4 text-[11px] font-medium opacity-90">
                  <li className="flex gap-3">
                    <i className="fa-solid fa-check-double text-emerald-400 mt-0.5"></i>
                    <span>A plataforma é <b>exclusivamente administrada</b> por nós. Temos poder de veto e moderação sobre qualquer anúncio.</span>
                  </li>
                  <li className="flex gap-3">
                    <i className="fa-solid fa-check-double text-emerald-400 mt-0.5"></i>
                    <span>Toda transação financeira é retida pela nossa central até a confirmação de entrega física do lote.</span>
                  </li>
                  <li className="flex gap-3 text-indigo-400 font-black">
                    <i className="fa-solid fa-lock mt-0.5"></i>
                    <span>O <b>Responsável Sellar</b> reserva-se o direito de intervir em leilões em tempo real para garantir a integridade do pregão.</span>
                  </li>
                </ul>
              </div>

              <label className="flex items-center gap-3 p-5 bg-slate-50 rounded-[24px] cursor-pointer border-2 border-slate-100">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded-lg text-indigo-600 focus:ring-indigo-500" 
                  checked={acceptedContract}
                  onChange={e => setAcceptedContract(e.target.checked)}
                />
                <span className="text-xs font-bold text-slate-700 leading-tight">Compreendo que opero sob a supervisão direta da Administração Central da plataforma.</span>
              </label>
            </div>
          )}
        </div>

        <div className="p-8 bg-slate-50 flex gap-4">
          {step === 2 && (
            <button onClick={() => setStep(1)} className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600 uppercase text-[10px] tracking-widest">Voltar</button>
          )}
          <button 
            disabled={isAuction && step === 2 && !acceptedContract}
            onClick={handleNext}
            className="flex-[2] bg-[#002B5B] text-white py-4 rounded-2xl font-black shadow-xl hover:bg-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed uppercase text-[10px] tracking-widest"
          >
            {step === 1 ? (isAuction ? 'Revisar Contrato' : 'Publicar Anúncio') : 'Confirmar e Publicar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostProductModal;


import React, { useState, useMemo, useEffect } from 'react';
import Sidebar, { BrandLogo } from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import PartnerAdRail from './components/PartnerAdRail';
import MarketTicker from './components/MarketTicker';
import FeedPost from './components/FeedPost';
import AuctionCard from './components/AuctionCard';
import AffiliateDashboard from './components/AffiliateDashboard';
import PostProductModal from './components/PostProductModal';
import NotificationToast from './components/NotificationToast';
import ChatAssistant from './components/ChatAssistant';
import Onboarding from './components/Onboarding';
import ParticipantsView from './components/ParticipantsView';
import AuctionDetailModal from './components/AuctionDetailModal';
import PartnerCarousel from './components/PartnerCarousel';
import SellarWallet from './components/SellarWallet';
import { Product, Category, User, UserLevel } from './types';
import { SAMPLE_USERS, COMMISSION_RATES } from './constants';
import { NotificationData } from './services/notificationService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedAuctionProduct, setSelectedAuctionProduct] = useState<Product | null>(null);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Estados de Filtro Avançado
  const [filterSearch, setFilterSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterMinPrice, setFilterMinPrice] = useState<string>('');
  const [filterMaxPrice, setFilterMaxPrice] = useState<string>('');
  const [filterIsAuction, setFilterIsAuction] = useState<boolean | null>(null);

  // Usuário Logado (Estado Global)
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'guest',
    name: 'Visitante',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
    level: UserLevel.INICIANTE,
    type: 'BUYER',
    role: 'BUYER',
    isPartner: false,
    totalSales: 0,
    totalCommissions: 0,
    balance_available: 0,
    balance_locked: 0
  });

  // Base de Dados UNIVERSAL (Agro, Tech, Real Estate, Luxo)
  const [products, setProducts] = useState<Product[]>([
    { id: 'p1', sellerId: 'u101', partnerName: 'Fazenda Elite Nelore', isVerifiedPartner: true, title: 'Touro Reprodutor Nelore PO', description: 'Genética premiada, pronto para coleta de sêmen.', price: 125000, category: Category.ANIMAIS, images: ['https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80'], commissionRate: 0.045, isAuction: true, currentBid: 128500, auctionEndTime: Date.now() + 1800000 },
    { id: 'p2', sellerId: 'u102', partnerName: 'Luxo Imóveis', isVerifiedPartner: true, title: 'Cobertura Duplex em Balneário Camboriú', description: '4 suítes, vista definitiva para o mar, automação completa.', price: 8500000, category: Category.IMOVEIS, images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'], commissionRate: 0.02, isAuction: false },
    { id: 'p3', sellerId: 'u103', partnerName: 'Tech Store Brasil', isVerifiedPartner: true, title: 'Lote MacBook Pro M3 Max - 10 Unidades', description: 'Equipamentos lacrados, garantia global Apple.', price: 245000, category: Category.UTILITARIOS, images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'], commissionRate: 0.08, isAuction: true, currentBid: 240000 },
    { id: 'p4', sellerId: 'u104', partnerName: 'Concessionária VIP', isVerifiedPartner: true, title: 'Porsche 911 Carrera S 2024', description: 'Cor Shark Blue, Interior em couro premium, 0km.', price: 1100000, category: Category.VEICULOS, images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'], commissionRate: 0.045, isAuction: true, currentBid: 1050000 },
    { id: 'p5', sellerId: 'u105', partnerName: 'Consultoria Sellar', isVerifiedPartner: true, title: 'Mentoria Business Elite 2025', description: 'Acompanhamento estratégico para escala de negócios digitais.', price: 15000, category: Category.SERVICOS, images: ['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'], commissionRate: 0.15, isAuction: false },
    { id: 'news1', sellerId: 'admin', partnerName: 'Sellar News', isVerifiedPartner: true, title: 'A Ascensão dos Marketplaces Descentralizados', description: 'Especialistas explicam por que o modelo Sellar está dominando as transações de alto valor.', price: 0, category: Category.SERVICOS, images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'], commissionRate: 0, isNews: true, isAuction: false } as any,
  ]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if ((p as any).isNews) return false;
      const matchesSearch = p.title.toLowerCase().includes(filterSearch.toLowerCase());
      const matchesCategory = filterCategory === 'ALL' || p.category === filterCategory;
      const matchesMinPrice = filterMinPrice === '' || p.price >= Number(filterMinPrice);
      const matchesMaxPrice = filterMaxPrice === '' || p.price <= Number(filterMaxPrice);
      const matchesAuction = filterIsAuction === null || p.isAuction === filterIsAuction;
      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesAuction;
    });
  }, [products, filterSearch, filterCategory, filterMinPrice, filterMaxPrice, filterIsAuction]);

  const addNotification = (notif: Omit<NotificationData, 'id' | 'timestamp'>) => {
    const newNotif: NotificationData = {
      ...notif,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      type: notif.type || 'info'
    };
    setNotifications(prev => [...prev, newNotif]);
  };

  const handleOnboardingComplete = (userData: any) => {
    const newUser: User = {
      ...userData,
      id: 'user-' + Math.random().toString(36).substr(2, 5),
      totalSales: 0,
      totalCommissions: userData.role === 'HYBRID' ? 15000 : 0,
      balance_available: 5000,
      balance_locked: 0
    };
    setCurrentUser(newUser);
    setIsRegistered(true);
    setShowOnboarding(false);
    addNotification({ title: 'Acesso Liberado', body: `Bem-vindo ao Sellar Universal, ${userData.name}!`, type: 'success' });
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'} text-slate-900`}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleGoHome={() => setActiveTab('feed')}
        isDarkMode={isDarkMode} 
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        currentUser={currentUser}
      />
      
      <div className="fixed top-0 right-0 z-[1200] pointer-events-none p-4 space-y-4 w-full md:w-auto">
        {notifications.map(n => <div key={n.id} className="pointer-events-auto"><NotificationToast notification={n} onClose={(id) => setNotifications(prev => prev.filter(x => x.id !== id))} /></div>)}
      </div>

      <ChatAssistant currentUser={currentUser} products={products} />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-24 md:pb-0">
        <MarketTicker />
        
        <main className="flex-1 py-4 md:py-8 px-4 md:px-8 z-10 overflow-y-auto w-full">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-8">
            <PartnerAdRail />
            
            <div className="flex-1 min-w-0 w-full">
              {activeTab === 'feed' && (
                <div className="max-w-2xl mx-auto w-full space-y-8">
                   <div className="flex justify-between items-center mb-6">
                      <h2 className={`text-3xl font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-[#001B3B]'}`}>Moments & Feed</h2>
                      {!isRegistered && <button onClick={() => setShowOnboarding(true)} className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase shadow-lg">Entrar na Elite</button>}
                   </div>
                   <PartnerCarousel isDarkMode={isDarkMode} />
                   <div className="space-y-6">
                    {products.map(p => <FeedPost key={p.id} product={p} isNews={(p as any).isNews} onProductClick={(prod) => prod.isAuction && setSelectedAuctionProduct(prod)} />)}
                   </div>
                </div>
              )}

              {activeTab === 'commissions' && currentUser && (
                <div className="space-y-8 max-w-5xl mx-auto">
                  <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Sellar Global Pay</h2>
                  <SellarWallet user={currentUser} isDarkMode={isDarkMode} />
                  <AffiliateDashboard user={currentUser} />
                </div>
              )}

              {activeTab === 'auctions' && (
                <div className="max-w-4xl mx-auto space-y-12">
                   <div className="text-center">
                      <h2 className={`text-5xl font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-[#001B3B]'}`}>Live Auditory</h2>
                      <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Arremate ativos mundiais em tempo real</p>
                   </div>
                   {products.filter(p => p.isAuction).map(p => <AuctionCard key={p.id} product={p} onBid={(val) => addNotification({title: 'Lance Registrado', body: `Confirmado: R$ ${val.toLocaleString()} pelo ativo.`, type: 'success'})} />)}
                </div>
              )}

              {activeTab === 'marketplace' && (
                <div className="max-w-6xl mx-auto space-y-8">
                   <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                      <div>
                        <h2 className={`text-4xl font-black italic uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-[#001B3B]'}`}>Universal Market</h2>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Conectando grandes ofertas a investidores globais</p>
                      </div>
                      <button 
                        onClick={() => setIsPostModalOpen(true)}
                        className="bg-[#001B3B] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                      >
                        <i className="fa-solid fa-plus-circle text-sm"></i>
                        Listar Novo Ativo
                      </button>
                   </div>

                   {/* Filtros de Luxo */}
                   <div className={`p-8 rounded-[40px] border shadow-2xl transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                        <div className="md:col-span-4 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">O que você procura?</label>
                          <input 
                            type="text"
                            placeholder="Pesquisar..."
                            value={filterSearch}
                            onChange={(e) => setFilterSearch(e.target.value)}
                            className={`w-full h-12 rounded-xl border px-4 font-bold text-xs focus:ring-2 focus:ring-indigo-500 outline-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                          />
                        </div>
                        <div className="md:col-span-3 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Segmento</label>
                          <select 
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className={`w-full h-12 rounded-xl border px-4 font-bold text-xs appearance-none focus:ring-2 focus:ring-indigo-500 outline-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                          >
                            <option value="ALL">Todas as Categorias</option>
                            {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                          </select>
                        </div>
                        <div className="md:col-span-5 flex gap-4">
                           <div className="flex-1">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Mínimo</label>
                             <input type="number" value={filterMinPrice} onChange={e => setFilterMinPrice(e.target.value)} className={`w-full h-12 rounded-xl border px-4 font-black text-xs ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`} />
                           </div>
                           <div className="flex-1">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Máximo</label>
                             <input type="number" value={filterMaxPrice} onChange={e => setFilterMaxPrice(e.target.value)} className={`w-full h-12 rounded-xl border px-4 font-black text-xs ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'}`} />
                           </div>
                        </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                      {filteredProducts.map(p => (
                        <FeedPost key={p.id} product={p} onProductClick={(prod) => prod.isAuction && setSelectedAuctionProduct(prod)} />
                      ))}
                   </div>
                </div>
              )}

              {activeTab === 'participants' && currentUser?.role === 'HYBRID' && (
                <ParticipantsView users={SAMPLE_USERS as any} isDarkMode={isDarkMode} onBack={() => setActiveTab('feed')} />
              )}
            </div>

            <RightSidebar liveAuctions={products.filter(p => p.isAuction)} />
          </div>
        </main>
      </div>

      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} isDarkMode={isDarkMode} />}
      {isPostModalOpen && <PostProductModal onClose={() => setIsPostModalOpen(false)} onPost={(newProd) => { 
        setProducts(prev => [{...newProd, id: 'p' + Date.now()} as Product, ...prev]);
        addNotification({ title: 'Ativo Listado', body: 'Seu lote passará por auditoria e será publicado em breve.', type: 'success' });
      }} />}
      {selectedAuctionProduct && <AuctionDetailModal product={selectedAuctionProduct} onClose={() => setSelectedAuctionProduct(null)} isDarkMode={isDarkMode} onBid={(val) => { addNotification({ title: 'Lance Realizado', body: `R$ ${val.toLocaleString()} confirmados no auditório.`, type: 'success' }); setSelectedAuctionProduct(null); }} />}
    </div>
  );
};

export default App;


export enum UserLevel {
  INICIANTE = 'Iniciante',
  BRONZE = 'Bronze',
  PRATA = 'Prata',
  OURO = 'Ouro',
  DIAMANTE = 'Diamante'
}

export enum Category {
  UTILITARIOS = 'Utilitários',
  ALIMENTOS = 'Alimentos',
  VEICULOS = 'Veículos',
  ANIMAIS = 'Animais',
  IMOVEIS = 'Imóveis',
  MAQUINAS = 'Máquinas',
  SERVICOS = 'Serviços'
}

/* Added AuctionStatus enum to fix "Module '../types' has no exported member 'AuctionStatus'" error */
export enum AuctionStatus {
  NOT_REGISTERED = 'NOT_REGISTERED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  level: UserLevel;
  type: 'MERCHANT' | 'AFFILIATE' | 'HYBRID' | 'BUYER';
  role?: 'MERCHANT' | 'AFFILIATE' | 'HYBRID' | 'BUYER';
  isPartner: boolean;
  totalSales: number;
  totalCommissions: number;
  balance_available: number;
  balance_locked: number;
  email?: string;
}

export interface Product {
  id: string;
  sellerId: string;
  partnerName: string;
  isVerifiedPartner: boolean;
  title: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  commissionRate: number;
  isAuction: boolean;
  auctionEndTime?: number;
  currentBid?: number;
  bids?: Bid[];
}

export interface Bid {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: number;
}

export interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  timestamp: number;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

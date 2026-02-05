
import { Category } from './types';

export const COMMISSION_RATES: Record<Category, number> = {
  [Category.ALIMENTOS]: 0.05,
  [Category.UTILITARIOS]: 0.08,
  [Category.VEICULOS]: 0.045, 
  [Category.ANIMAIS]: 0.045,
  [Category.IMOVEIS]: 0.02, 
  [Category.MAQUINAS]: 0.06,
  [Category.SERVICOS]: 0.10
};

export const LEVEL_THRESHOLDS = {
  BRONZE: 1000,
  PRATA: 5000,
  OURO: 20000,
  DIAMANTE: 100000
};

export const SAMPLE_USERS = [
  {
    id: 'u1',
    name: 'Ricardo',
    avatar: 'https://picsum.photos/seed/u1/100',
    level: 'Ouro' as any,
    type: 'MERCHANT' as any,
    totalSales: 25000,
    totalCommissions: 0,
    isPartner: true
  },
  {
    id: 'u2',
    name: 'Maria Afiliada',
    avatar: 'https://picsum.photos/seed/u2/100',
    level: 'Diamante' as any,
    type: 'AFFILIATE' as any,
    totalSales: 0,
    totalCommissions: 12400,
    isPartner: true
  }
];

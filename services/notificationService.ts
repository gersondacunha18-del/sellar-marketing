
export interface NotificationData {
  id: string;
  title: string;
  body: string;
  icon?: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
}

class NotificationService {
  private permission: NotificationPermission = 'default';

  constructor() {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      this.permission = Notification.permission;
    }
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('Este navegador não suporta notificações desktop.');
      return false;
    }

    const permission = await Notification.requestPermission();
    this.permission = permission;
    return permission === 'granted';
  }

  get isGranted(): boolean {
    return this.permission === 'granted';
  }

  // Envia uma notificação do sistema (Push Simulation)
  sendSystemNotification(title: string, options?: NotificationOptions) {
    if (this.permission === 'granted') {
      new Notification(title, {
        icon: '/favicon.ico', // Fallback icon
        ...options,
      });
    }
  }

  // Alerta para início de leilão
  notifyAuctionStart(title: string) {
    this.sendSystemNotification(`🔨 LEILÃO INICIADO!`, {
      body: `O lote "${title}" acaba de abrir para lances. Entre na sala agora!`,
      tag: `start-auction-${title}`,
    });
  }

  // Helper para lembrete de leilão finalizando
  notifyAuctionEnding(title: string, timeLeft: string) {
    this.sendSystemNotification(`⚠️ Leilão Finalizando!`, {
      body: `${title} encerra em ${timeLeft}. Dê seu lance agora!`,
      tag: `auction-${title}`,
      requireInteraction: true,
    });
  }
}

export const notificationService = new NotificationService();

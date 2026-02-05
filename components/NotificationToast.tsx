
import React, { useEffect, useState } from 'react';
import { NotificationData } from '../services/notificationService';

interface NotificationToastProps {
  notification: NotificationData;
  onClose: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(notification.id), 300);
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

  const typeStyles = {
    info: 'bg-[#002B5B] border-blue-400',
    success: 'bg-emerald-600 border-emerald-400',
    warning: 'bg-amber-500 border-amber-300',
    error: 'bg-rose-600 border-rose-400',
  };

  const icons = {
    info: 'fa-info-circle',
    success: 'fa-check-circle',
    warning: 'fa-exclamation-triangle',
    error: 'fa-times-circle',
  };

  return (
    <div 
      className={`fixed top-6 right-6 z-[300] max-w-sm w-full transition-all duration-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <div className={`p-4 rounded-3xl border shadow-2xl text-white ${typeStyles[notification.type]} flex gap-4 items-start`}>
        <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
          <i className={`fa-solid ${icons[notification.type]} text-lg`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-black text-xs uppercase tracking-widest mb-1">{notification.title}</h4>
          <p className="text-[11px] font-medium opacity-90 leading-snug">{notification.body}</p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/50 hover:text-white transition-colors"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;

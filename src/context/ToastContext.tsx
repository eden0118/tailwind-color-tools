import { createContext, useContext, ReactNode } from 'react';
import { useToast as useToastLogic } from '@/hooks/useToast';
import Toast from '@/components/Toast';

/**
 * @fileoverview
 * ToastContext - 提供全局 Toast 功能
 *
 * 使用方式：
 * 1. 在 App 根元件中使用 ToastProvider
 * 2. 在任何子元件中使用 useToastContext() 來訪問 showToast
 */

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error', duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toasts, showToast, removeToast } = useToastLogic();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-0">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onRemove={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

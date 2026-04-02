import { useState, useCallback } from 'react';

/**
 * @fileoverview
 * useToast Hook - 管理 Toast 通知的邏輯
 *
 * 提供：
 * - 顯示 toast 的方法
 * - 管理多個 toast 的狀態
 * - 自動移除 toast
 */

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error';
  duration?: number;
}

interface UseToastReturn {
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'error', duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToast = (): UseToastReturn => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' = 'success', duration: number = 2000) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return {
    toasts,
    showToast,
    removeToast,
  };
};

import { useEffect } from 'react';
import { Check } from 'lucide-react';

/**
 * @fileoverview
 * Toast 通知元件 - 用於顯示複製成功、錯誤等短暫提示
 *
 * 特性：
 * - 畫面中央顯示
 * - 自動淡出
 * - 支援成功、錯誤等多種狀態
 */

interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = 'success',
  duration = 2000,
  onRemove,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  return (
    <div
      className={`animate-fade-in-scale fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-lg px-6 py-3 shadow-xl ${
        type === 'success' ? 'bg-accent text-background' : 'bg-red-500 text-white'
      }`}
      role="status"
      aria-live="polite"
    >
      {type === 'success' && <Check size={20} strokeWidth={3} />}
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Toast;

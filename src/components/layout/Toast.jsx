import React, { useEffect, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const [isExiting, setIsExiting] = useState(false);


  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(onClose, 300); // Wait for fade-out animation
  }, [onClose]);


  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  const styles = {
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      text: 'text-emerald-800',
      icon: <CheckCircle size={18} className="text-emerald-500" />,
      progress: 'bg-emerald-500'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-100',
      text: 'text-red-800',
      icon: <AlertCircle size={18} className="text-red-500" />,
      progress: 'bg-red-500'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-800',
      icon: <Info size={18} className="text-blue-500" />,
      progress: 'bg-blue-500'
    }
  };

  const currentStyle = styles[type] || styles.success;

  return (
    <div className={`fixed top-6 right-6 z-[9999] min-w-[300px] animate-in slide-in-from-right-full duration-300 ${isExiting ? 'animate-out fade-out slide-out-to-right-full' : ''}`}>
      <div className={`${currentStyle.bg} ${currentStyle.border} border rounded-2xl shadow-xl overflow-hidden`}>
        <div className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {currentStyle.icon}
            <p className={`text-sm font-bold ${currentStyle.text}`}>
              {message}
            </p>
          </div>
          <button 
            onClick={handleClose}
            className="p-1 hover:bg-black/5 rounded-lg transition-colors text-gray-400"
          >
            <X size={16} />
          </button>
        </div>
        
        <div className="h-1 w-full bg-black/5">
          <div 
            className={`h-full ${currentStyle.progress}`}
            style={{ 
              animation: `progress ${duration}ms linear forwards` 
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
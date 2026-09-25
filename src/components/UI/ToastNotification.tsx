import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useCart();

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            className="pointer-events-auto p-4 rounded-2xl bg-darkbrown text-white shadow-2xl border border-gold-500/40 flex items-start gap-3 relative overflow-hidden backdrop-blur-md"
          >
            {/* Left Accent Strip */}
            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-gold-400 to-warm-500" />

            <div className="mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-gold-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
            </div>

            <div className="flex-1 pr-4">
              <h5 className="font-extrabold text-xs text-gold-300 uppercase tracking-wide">{toast.title}</h5>
              <p className="text-xs text-cream/90 mt-0.5 font-medium leading-relaxed">{toast.message}</p>
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-cream/60 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

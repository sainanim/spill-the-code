"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export interface ToastState {
  id: number;
  message: string;
}

interface CartToastProps {
  toast: ToastState | null;
  onViewCart: () => void;
}

export default function CartToast({ toast, onViewCart }: CartToastProps) {
  return (
    <div className="fixed bottom-10 left-1/2 z-[70] pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 -translate-x-1/2 pointer-events-auto flex items-center gap-4 bg-white border border-slate-200 shadow-xl rounded-xl pl-4 pr-5 py-4 text-base text-[var(--text-primary)] max-w-sm"
          >
            <CheckCircle2 className="h-6 w-6 text-[#197602] flex-shrink-0" />
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={onViewCart}
              className="text-[var(--color-primary)] font-semibold hover:underline whitespace-nowrap"
            >
              View Cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

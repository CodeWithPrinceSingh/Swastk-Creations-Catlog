import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function Modal({ open, onClose, title, children }) {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center p-4 py-10 overflow-y-auto">
      <div className="fixed inset-0 bg-ink/40" onClick={onClose} />

      <div className="relative bg-white rounded-xl w-full max-w-lg shadow-cardHover flex flex-col max-h-full">
        {/* Header — always visible, never scrolls away */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-rose-50 shrink-0">
          <h2 className="font-display text-xl text-ink">{title}</h2>
          <button onClick={onClose} aria-label="Close">
            <X size={20} className="text-inkmuted hover:text-ink" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

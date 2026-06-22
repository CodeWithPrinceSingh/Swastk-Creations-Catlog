import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-cardHover">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-display text-xl text-ink">{title}</h2>
          <button onClick={onClose} aria-label="Close">
            <X size={20} className="text-inkmuted hover:text-ink" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

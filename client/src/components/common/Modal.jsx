import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Modal({ open, onClose, title, children }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      // Always start scrolled to the top when the modal opens
      scrollRef.current.scrollTop = 0;
    }
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-ink/40" onClick={onClose} />
      <div
        ref={scrollRef}
        className="relative bg-white rounded-xl w-full max-w-lg my-8 sm:my-0 max-h-[85vh] overflow-y-auto p-6 shadow-cardHover"
      >
        <div className="flex justify-between items-center mb-5 sticky -top-6 -mt-6 -mx-6 px-6 pt-6 pb-3 bg-white z-10">
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

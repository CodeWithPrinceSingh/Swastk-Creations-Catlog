import { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink } from 'lucide-react';
import Modal from '../common/Modal.jsx';
import { fetchStoreInfo } from '../../api/store.js';

let cachedStore = null;

export default function VisitStoreModal({ open, onClose, productName }) {
  const [store, setStore] = useState(cachedStore);
  const [loading, setLoading] = useState(!cachedStore);

  useEffect(() => {
    if (!open || cachedStore) return;
    fetchStoreInfo()
      .then((res) => {
        cachedStore = res.store;
        setStore(res.store);
      })
      .finally(() => setLoading(false));
  }, [open]);

  if (!open) return null;

  const whatsappMessage = encodeURIComponent(
    productName ? `Hi, I'm interested in "${productName}" — is it available?` : 'Hi, I would like to know more about your collection.'
  );

  return (
    <Modal open={open} onClose={onClose} title="Visit Our Store">
      {loading || !store ? (
        <p className="text-sm text-inkmuted py-6 text-center">Loading store details...</p>
      ) : (
        <div className="space-y-5 h-full">
          {productName && (
            <p className="text-sm text-ink bg-blush rounded-md px-4 py-3">
              Interested in <span className="font-semibold">{productName}</span>? Visit us in
              person to see it, try it on, and take it home.
            </p>
          )}

          <div className="rounded-lg overflow-hidden border border-rose-100 h-48">
            <iframe
              title="Store location map"
              src={store.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>

          <div className="space-y-3 text-sm">
            <p className="flex items-start gap-3">
              <MapPin size={16} className="text-rose-500 mt-0.5 shrink-0" />
              <span>
                {store.address.line1}, {store.address.city}, {store.address.state} -{' '}
                {store.address.pincode}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Clock size={16} className="text-rose-500 shrink-0" /> {store.hours}
            </p>
            <p className="flex items-center gap-3">
              <Phone size={16} className="text-rose-500 shrink-0" /> {store.phone}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={store.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 border border-rose-300 text-rose-600 font-semibold text-sm tracking-wide py-3 rounded-md hover:bg-rose-50 transition-colors"
            >
              <ExternalLink size={15} /> Get Directions
            </a>
            <a
              href={`https://wa.me/${store.whatsapp.replace(/[^\d]/g, '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 transition-colors text-white font-semibold text-sm tracking-wide py-3 rounded-md"
            >
              <MessageCircle size={15} /> Ask on WhatsApp
            </a>
          </div>
        </div>
      )}
    </Modal>
  );
}

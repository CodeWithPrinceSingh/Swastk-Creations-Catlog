import { useState } from 'react';
import { MessageSquarePlus, X } from 'lucide-react';
import StarRating from '../common/StarRating.jsx';
import { submitTestimonial } from '../../api/misc.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function TestimonialForm() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [location, setLocation] = useState('');
  const [quote, setQuote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => {
    setRating(0);
    setLocation('');
    setQuote('');
    setDone(false);
  };

  const handleSubmit = async () => {
    if (!rating) {
      showToast('Pehle star rating choose karein.', { type: 'error' });
      return;
    }
    if (!quote.trim()) {
      showToast('Apna experience likhein.', { type: 'error' });
      return;
    }
    setSubmitting(true);
    try {
      await submitTestimonial({ rating, location, quote });
      setDone(true);
    } catch (err) {
      showToast(err?.response?.data?.message || 'Submit nahi ho saka, dobara try karein.', {
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <p className="text-center text-sm text-inkmuted mt-8">
        <a href="/login" className="text-rose-600 underline font-medium">
          Login karein
        </a>{' '}
        apna experience share karne ke liye.
      </p>
    );
  }

  return (
    <div className="mt-10 text-center">
      {!open ? (
        <button
          onClick={() => { reset(); setOpen(true); }}
          className="inline-flex items-center gap-2 border border-rose-300 text-rose-600 hover:bg-rose-50 transition-colors text-sm font-semibold px-5 py-2.5 rounded-full"
        >
          <MessageSquarePlus size={15} />
          Apna experience share karein
        </button>
      ) : (
        <div className="max-w-lg mx-auto bg-white border border-rose-100 rounded-2xl p-7 shadow-card text-left relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-rose-300 hover:text-rose-600"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {done ? (
            <div className="text-center py-4">
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-semibold text-ink">Shukriya, {user.name}!</p>
              <p className="text-sm text-inkmuted mt-1">
                Aapka review mila. Admin approval ke baad homepage par dikhega.
              </p>
              <button
                onClick={() => { reset(); setOpen(false); }}
                className="mt-5 text-sm text-rose-600 underline"
              >
                Theek hai
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-ink mb-5 text-base">Apna experience likhein</h3>

              <div className="mb-4">
                <p className="text-xs text-inkmuted mb-1">Rating *</p>
                <StarRating rating={rating} size={24} interactive onChange={setRating} />
              </div>

              <div className="mb-3">
                <label className="text-xs text-inkmuted block mb-1">Aapka shahar (optional)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Jaise: Delhi, Jaipur…"
                  className="w-full border border-rose-200 rounded-md px-3 py-2 text-sm text-ink placeholder:text-inkmuted focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>

              <div className="mb-5">
                <label className="text-xs text-inkmuted block mb-1">Aapka review *</label>
                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Apna experience yahaan likhein…"
                  rows={4}
                  className="w-full border border-rose-200 rounded-md px-3 py-2 text-sm text-ink placeholder:text-inkmuted focus:outline-none focus:ring-1 focus:ring-rose-400 resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-50 transition-colors text-white text-sm font-semibold py-3 rounded-md"
              >
                {submitting ? 'Submit ho raha hai…' : 'Review Submit Karein'}
              </button>
              <p className="text-xs text-inkmuted mt-3 text-center">
                Review approval ke baad homepage par dikhega.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

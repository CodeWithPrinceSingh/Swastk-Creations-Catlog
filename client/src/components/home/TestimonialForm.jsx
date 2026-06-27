import { useState } from 'react';
import { MessageSquarePlus, X } from 'lucide-react';
import { submitTestimonial } from '../../api/misc.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

// Self-contained interactive star picker
function StarPicker({ value, onChange }) {
  const [hov, setHov] = useState(0);
  const active = hov || value;
  return (
    <div style={{ display: 'flex', gap: 4 }} onMouseLeave={() => setHov(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          onMouseEnter={() => setHov(n)}
          onClick={() => onChange(n)}
          style={{
            fontSize: 32,
            cursor: 'pointer',
            color: n <= active ? '#f59e0b' : '#fbcfe8',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialForm() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [location, setLocation] = useState('');
  const [quote, setQuote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const reset = () => { setRating(0); setLocation(''); setQuote(''); setDone(false); };

  const handleSubmit = async () => {
    if (!rating) { showToast('Please select a star rating.', { type: 'error' }); return; }
    if (!quote.trim()) { showToast('Please write your experience.', { type: 'error' }); return; }
    setSubmitting(true);
    try {
      await submitTestimonial({ rating, location, quote });
      setDone(true);
    } catch (err) {
      showToast(err?.response?.data?.message || 'Could not submit. Please try again.', { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <p className="text-center text-sm text-inkmuted mt-8">
        <a href="/login" className="text-rose-600 underline font-medium">Sign in</a> to share your experience.
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
          <MessageSquarePlus size={15} /> Share Your Experience
        </button>
      ) : (
        <div className="max-w-lg mx-auto bg-white border border-rose-100 rounded-2xl p-7 shadow-card text-left relative">
          <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-rose-300 hover:text-rose-600" aria-label="Close">
            <X size={18} />
          </button>

          {done ? (
            <div className="text-center py-4">
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-semibold text-ink">Thank you, {user.name}!</p>
              <p className="text-sm text-inkmuted mt-1">Your review will appear after admin approval.</p>
              <button onClick={() => { reset(); setOpen(false); }} className="mt-5 text-sm text-rose-600 underline">Close</button>
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-ink mb-5 text-base">Write a Review</h3>

              <div className="mb-4">
                <p className="text-xs text-inkmuted mb-2">Your rating *</p>
                <StarPicker value={rating} onChange={setRating} />
                {rating > 0 && <p className="text-xs text-amber-600 mt-1">{rating} / 5 selected</p>}
              </div>

              <div className="mb-3">
                <label className="text-xs text-inkmuted block mb-1">Your city (optional)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Delhi, Jaipur…"
                  className="w-full border border-rose-200 rounded-md px-3 py-2 text-sm text-ink placeholder:text-inkmuted focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>

              <div className="mb-5">
                <label className="text-xs text-inkmuted block mb-1">Your review *</label>
                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Share your experience here…"
                  rows={4}
                  className="w-full border border-rose-200 rounded-md px-3 py-2 text-sm text-ink placeholder:text-inkmuted focus:outline-none focus:ring-1 focus:ring-rose-400 resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-50 transition-colors text-white text-sm font-semibold py-3 rounded-md"
              >
                {submitting ? 'Submitting…' : 'Submit Review'}
              </button>
              <p className="text-xs text-inkmuted mt-3 text-center">Your review will be visible after admin approval.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { CheckCircle, Trash2, UserCircle2 } from 'lucide-react';
import StarRating from '../../components/common/StarRating.jsx';
import {
  fetchPendingTestimonials,
  approveTestimonial,
  deleteTestimonial,
  fetchTestimonials,
} from '../../api/misc.js';
import { useToast } from '../../context/ToastContext.jsx';

export default function AdminTestimonialsPage() {
  const { showToast } = useToast();
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    Promise.all([fetchPendingTestimonials(), fetchTestimonials()])
      .then(([pendRes, appRes]) => {
        setPending(pendRes.testimonials || []);
        setApproved(appRes.testimonials || []);
      })
      .catch(() => showToast('Data load nahi ho saka.', { type: 'error' }))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleApprove = async (id) => {
    try {
      await approveTestimonial(id);
      showToast('Review approve ho gaya!', { type: 'success' });
      load();
    } catch {
      showToast('Approve nahi ho saka.', { type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTestimonial(id);
      showToast('Review delete ho gaya.', { type: 'info' });
      load();
    } catch {
      showToast('Delete nahi ho saka.', { type: 'error' });
    }
  };

  if (loading) return <p className="p-6 text-sm text-inkmuted">Loading…</p>;

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="font-display text-2xl text-ink mb-8">Testimonials Manage Karein</h1>

      {/* Pending */}
      <section className="mb-12">
        <h2 className="text-base font-semibold text-ink mb-4">
          Pending Approval{' '}
          {pending.length > 0 && (
            <span className="ml-2 bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full">
              {pending.length}
            </span>
          )}
        </h2>

        {pending.length === 0 ? (
          <p className="text-sm text-inkmuted">Koi pending review nahi hai.</p>
        ) : (
          <div className="space-y-4">
            {pending.map((t) => (
              <TestimonialRow
                key={t.id}
                t={t}
                onApprove={() => handleApprove(t.id)}
                onDelete={() => handleDelete(t.id)}
                showApprove
              />
            ))}
          </div>
        )}
      </section>

      {/* Approved */}
      <section>
        <h2 className="text-base font-semibold text-ink mb-4">Approved Reviews ({approved.length})</h2>
        {approved.length === 0 ? (
          <p className="text-sm text-inkmuted">Koi approved review nahi.</p>
        ) : (
          <div className="space-y-4">
            {approved.map((t) => (
              <TestimonialRow key={t.id} t={t} onDelete={() => handleDelete(t.id)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function TestimonialRow({ t, onApprove, onDelete, showApprove }) {
  return (
    <div className="bg-white border border-rose-100 rounded-xl p-5 flex gap-4 items-start">
      <UserCircle2 size={36} className="text-rose-200 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-ink">{t.name}</p>
          {t.location && <span className="text-xs text-inkmuted">• {t.location}</span>}
          <StarRating rating={t.rating} size={12} />
        </div>
        <p className="text-sm text-ink mt-1 leading-relaxed">"{t.quote}"</p>
        <p className="text-xs text-inkmuted mt-1">
          {new Date(t.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>
      <div className="flex gap-2 shrink-0">
        {showApprove && (
          <button
            onClick={onApprove}
            title="Approve"
            className="text-emerald-500 hover:text-emerald-700 transition-colors"
          >
            <CheckCircle size={18} />
          </button>
        )}
        <button
          onClick={onDelete}
          title="Delete"
          className="text-rose-300 hover:text-rose-600 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

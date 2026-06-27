import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import StarRating from '../common/StarRating.jsx';
import { fetchReviews, submitReview, deleteReview } from '../../api/reviews.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function ReviewSection({ productId, onRatingUpdate }) {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formRating, setFormRating] = useState(0);
  const [formTitle, setFormTitle] = useState('');
  const [formBody, setFormBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    fetchReviews(productId)
      .then((data) => setReviews(data.reviews || []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, [productId]);

  const myReview = user ? reviews.find((r) => r.user === user.id) : null;

  const handleSubmit = async () => {
    if (!formRating) {
      showToast('Please select a star rating.', { type: 'error' });
      return;
    }
    setSubmitting(true);
    try {
      const { review } = await submitReview({
        productId,
        rating: formRating,
        title: formTitle,
        body: formBody,
      });

      setReviews((prev) => {
        const without = prev.filter((r) => r.user !== review.user);
        return [review, ...without];
      });

      setFormRating(0);
      setFormTitle('');
      setFormBody('');
      showToast('Review submitted!', { type: 'success' });
      onRatingUpdate?.();
    } catch (err) {
      showToast(err?.response?.data?.message || 'Failed to submit review.', { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      showToast('Review deleted.', { type: 'info' });
      onRatingUpdate?.();
    } catch {
      showToast('Failed to delete review.', { type: 'error' });
    }
  };

  return (
    <section className="mt-16 border-t border-rose-100 pt-10">
      <h2 className="font-display text-2xl text-ink mb-8">Customer Reviews</h2>

      {/* Write / update a review */}
      {user ? (
        <div className="bg-blush rounded-xl p-6 mb-10">
          <h3 className="text-sm font-semibold text-ink mb-4">
            {myReview ? 'Update your review' : 'Write a review'}
          </h3>

          <div className="mb-4">
            <p className="text-xs text-inkmuted mb-1">Your rating *</p>
            <StarRating
              rating={formRating || myReview?.rating || 0}
              size={22}
              interactive
              onChange={setFormRating}
            />
          </div>

          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder={myReview?.title || 'Review title (optional)'}
            className="w-full border border-rose-200 rounded-md px-3 py-2 text-sm text-ink placeholder:text-inkmuted focus:outline-none focus:ring-1 focus:ring-rose-400 mb-3 bg-white"
          />

          <textarea
            value={formBody}
            onChange={(e) => setFormBody(e.target.value)}
            placeholder={myReview?.body || 'Share your thoughts about this product…'}
            rows={3}
            className="w-full border border-rose-200 rounded-md px-3 py-2 text-sm text-ink placeholder:text-inkmuted focus:outline-none focus:ring-1 focus:ring-rose-400 bg-white resize-none"
          />

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 transition-colors text-white text-sm font-semibold px-6 py-2.5 rounded-md"
          >
            {submitting ? 'Submitting…' : myReview ? 'Update Review' : 'Submit Review'}
          </button>
        </div>
      ) : (
        <p className="text-sm text-inkmuted mb-8">
          <a href="/login" className="text-rose-600 underline font-medium">Sign in</a> to leave a review.
        </p>
      )}

      {/* Review list */}
      {loading ? (
        <p className="text-sm text-inkmuted">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-inkmuted">No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((r) => (
            <div key={r.id} className="border-b border-rose-50 pb-6 last:border-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <StarRating rating={r.rating} size={14} />
                  {r.title && (
                    <p className="text-sm font-semibold text-ink mt-1">{r.title}</p>
                  )}
                  <p className="text-xs text-inkmuted mt-0.5">
                    {r.userName} ·{' '}
                    {new Date(r.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                {user && (user.id === r.user || user.role === 'admin') && (
                  <button
                    onClick={() => handleDelete(r.id)}
                    aria-label="Delete review"
                    className="text-rose-300 hover:text-rose-600 transition-colors mt-0.5 shrink-0"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
              {r.body && <p className="text-sm text-ink leading-relaxed mt-2">{r.body}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

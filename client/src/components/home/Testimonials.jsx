import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, UserCircle2 } from 'lucide-react';
import SectionHeading from '../common/SectionHeading.jsx';
import StarRating from '../common/StarRating.jsx';
import TestimonialForm from './TestimonialForm.jsx';

export default function Testimonials({ testimonials = [] }) {
  const [start, setStart] = useState(0);
  const perPage = 3;
  const visible = testimonials.slice(start, start + perPage);

  const canPrev = start > 0;
  const canNext = start + perPage < testimonials.length;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading eyebrow="WHAT OUR BRIDES SAY" title="Real Brides," accent="Real Stories" />

      {testimonials.length === 0 ? (
        <p className="text-center text-sm text-inkmuted py-8">
          Abhi tak koi review nahi. Pehle review likhne wale banein!
        </p>
      ) : (
        <div className="relative flex items-center gap-4">
          <button
            onClick={() => setStart((s) => Math.max(0, s - 1))}
            disabled={!canPrev}
            aria-label="Previous testimonials"
            className="hidden sm:flex bg-white shadow-card rounded-full p-2 disabled:opacity-30 hover:bg-blush transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="grid sm:grid-cols-3 gap-5 flex-1">
            {visible.map((t) => (
              <div key={t.id} className="bg-white border border-rose-100 rounded-xl p-6 relative">
                <Quote size={28} className="text-rose-100 absolute top-4 right-4" />
                <StarRating rating={t.rating} />
                <p className="text-sm text-ink mt-3 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 mt-5">
                  {t.avatar ? (
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle2 size={36} className="text-rose-200 shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    {t.location && (
                      <p className="text-xs text-inkmuted">{t.location}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStart((s) => Math.min(testimonials.length - perPage, s + 1))}
            disabled={!canNext}
            aria-label="Next testimonials"
            className="hidden sm:flex bg-white shadow-card rounded-full p-2 disabled:opacity-30 hover:bg-blush transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Customer review submit form */}
      <TestimonialForm />
    </section>
  );
}

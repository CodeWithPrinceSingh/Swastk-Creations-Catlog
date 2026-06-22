import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterStrip() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="bg-blush">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="bg-rose-600 text-white rounded-full p-3 shrink-0">
            <Mail size={18} />
          </span>
          <div>
            <p className="font-display text-lg text-ink">Stay Updated with</p>
            <p className="font-display text-lg text-rose-600 italic">Our Latest Collections &amp; Offers</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full sm:w-auto max-w-md">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-l-md border border-rose-200 text-sm outline-none focus:border-rose-500 bg-white"
          />
          <button
            type="submit"
            className="bg-rose-700 text-white text-sm font-semibold tracking-wide px-6 py-3 rounded-r-md hover:bg-rose-800 transition-colors whitespace-nowrap"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
      {submitted && (
        <p className="text-center text-sm text-rose-700 pb-4 -mt-4">
          Thank you for subscribing — happily ever after starts in your inbox.
        </p>
      )}
    </section>
  );
}

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { submitContactForm } from '../api/contact.js';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await submitContactForm(form);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message || 'We could not send your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-10">Contact Us</h1>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <p className="text-sm text-inkmuted leading-relaxed mb-6">
            Have a question about an order, sizing, or a custom bridal piece? We'd love to hear
            from you.
          </p>
          <div className="space-y-4 text-sm">
            <p className="flex items-center gap-3"><MapPin size={16} className="text-rose-500" />GF-06 Elan Epic, Sector 70 Gurugram 122101</p>
            <p className="flex items-center gap-3"><Phone size={16} className="text-rose-500" /> +91 93110 97920</p>
            <p className="flex items-center gap-3"><Mail size={16} className="text-rose-500" /> creations.swastik12@gmail.com</p>
            <p className="flex items-center gap-3"><Clock size={16} className="text-rose-500" /> Mon - Sat: 10AM - 10PM</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} />
          <label className="block">
            <span className="text-xs font-medium text-inkmuted mb-1.5 block">Message</span>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full border border-rose-200 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-rose-500"
            />
          </label>

          {error && <p className="text-sm text-rose-600 bg-rose-50 rounded-md px-3 py-2">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-rose-600 hover:bg-rose-700 transition-colors text-white font-semibold text-sm tracking-wide py-3 rounded-md disabled:opacity-60"
          >
            {submitting ? 'SENDING...' : 'SEND MESSAGE'}
          </button>
          {sent && <p className="text-sm text-rose-600">Thank you — we'll get back to you soon.</p>}
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-inkmuted mb-1.5 block">{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-rose-200 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-rose-500"
      />
    </label>
  );
}

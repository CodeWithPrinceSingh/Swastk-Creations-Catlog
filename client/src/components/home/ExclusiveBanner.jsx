import { Link } from 'react-router-dom';
import { ShieldCheck, Hand, MapPin, Sparkles } from 'lucide-react';

const trustItems = [
  { icon: ShieldCheck, title: 'Premium Quality', copy: 'Finest craftsmanship' },
  { icon: Hand, title: 'Try Before You Buy', copy: 'See and feel every piece' },
  { icon: Sparkles, title: 'Custom Fitting', copy: 'Tailored to you, in-store' },
  { icon: MapPin, title: 'Visit Our Showroom', copy: 'Jaipur, Rajasthan' },
];

export default function ExclusiveBanner() {
  return (
    <section className="relative bg-rose-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[340px_1fr] items-stretch">
        <div className="relative hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80"
            alt="Bride wearing exclusive collection jewellery"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>

        <div className="py-12 lg:pl-12 text-cream">
          <p className="eyebrow text-rose-200 mb-2">EXCLUSIVE COLLECTION</p>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight max-w-md">
            Designed for the Bride, <span className="italic text-rose-200">Inspired</span> by Tradition
          </h2>
          <Link
            to="/shop"
            className="inline-block mt-6 bg-rose-600 hover:bg-rose-500 transition-colors text-white text-sm font-semibold tracking-wide px-7 py-3 rounded-md"
          >
            SHOP COLLECTION
          </Link>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 border-t border-white/15 pt-8">
            {trustItems.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="flex items-start gap-2.5">
                <span className="border border-rose-300/40 rounded-full p-2 shrink-0">
                  <Icon size={16} className="text-rose-200" />
                </span>
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-xs text-rose-200/80 mt-0.5">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

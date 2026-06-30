import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    eyebrow: 'STEP INTO YOUR',
    titleA: 'Happily',
    titleB: 'Ever',
    titleC: 'After',
    copy: 'Exquisite Bridal Collection for the Most Memorable Day of Your Life.',
    cta: '/shop?category=6a3a4ffd5cea058befca96ab',
    image:
      'https://res.cloudinary.com/dfywwcbpw/image/upload/v1781951603/e7fa9192-1047-43e4-802a-275eb32a6815_sgueqk.png',
  },
  {
    eyebrow: 'CRAFTED FOR',
    titleA: 'Timeless',
    titleB: 'Tradition',
    titleC: '',
    copy: 'Handpicked Jewellery and Silks for Every Ceremony.',
    cta: '/shop?category=6a3a634e1ba6ec2a4e9f6c68',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1400&q=80',
  },
  {
    eyebrow: 'EVERYTHING YOU NEED',
    titleA: 'From Mehendi',
    titleB: 'to',
    titleC: 'Reception',
    copy: 'Curated Looks for Every Moment of Your Celebration.',
    cta: '/shop?category=6a3a634f1ba6ec2a4e9f6c77',
    image:
      'https://res.cloudinary.com/dfywwcbpw/image/upload/v1781952150/98346fab-971d-43a0-8249-7cab03548293_cge9ui.png',
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[index];

  return (
    <section className="relative h-[820px] sm:h-[600px] overflow-hidden">
      {slides.map((s, i) => (
        <img
          key={i}
          src={s.image}
          alt=""
          aria-hidden={i !== index}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/15 to-transparent" />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-lg text-white">
          <p className="eyebrow mb-4 text-white/90">{slide.eyebrow}</p>
          <h1 className="font-display text-5xl sm:text-6xl leading-[1.05]">
            {slide.titleA} <br />
            {slide.titleB && <em className="text-rose-300 italic">{slide.titleB}</em>} {slide.titleC}
          </h1>
          <p className="mt-5 text-white/85 text-base sm:text-lg leading-relaxed max-w-md">{slide.copy}</p>
          <Link
            to={slide.cta}
            className="inline-block mt-8 bg-rose-600 hover:bg-rose-700 transition-colors text-white text-sm font-semibold tracking-wide px-8 py-3.5 rounded-md"
          >
            SHOP NOW
          </Link>
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-ink rounded-full p-2 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-ink rounded-full p-2 transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

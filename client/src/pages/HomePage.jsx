import { useEffect, useState } from 'react';
import Hero from '../components/home/Hero.jsx';
import CategoryGrid from '../components/home/CategoryGrid.jsx';
import StatsBanner from '../components/home/StatsBanner.jsx';
import FeaturedProducts from '../components/home/FeaturedProducts.jsx';
import CategoryProductRow from '../components/home/CategoryProductRow.jsx';
import QuizBanner from '../components/home/QuizBanner.jsx';
import ExclusiveBanner from '../components/home/ExclusiveBanner.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import NewsletterStrip from '../components/layout/NewsletterStrip.jsx';
import Loader from '../components/common/Loader.jsx';
import Reveal from '../components/common/Reveal.jsx';
import { fetchCategories } from '../api/categories.js';
import { fetchFeaturedProducts } from '../api/products.js';
import { fetchTestimonials } from '../api/misc.js';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([fetchCategories(), fetchFeaturedProducts(), fetchTestimonials()])
      .then(([catRes, prodRes, testRes]) => {
        setCategories(catRes.categories);
        setProducts(prodRes.products);
        setTestimonials(testRes.testimonials);
      })
      .catch((err) => setError(err.message || 'Could not load the homepage right now.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader label="Preparing your happily ever after..." />;

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-rose-600 text-sm">{error}</p>
        <p className="text-inkmuted text-xs mt-2">
          Make sure the API server is running at the configured VITE_API_URL.
        </p>
      </div>
    );
  }

  return (
    <>
      <Hero />

      <Reveal>
        <CategoryGrid categories={categories} />
      </Reveal>

      <StatsBanner />

      <Reveal>
        <FeaturedProducts products={products} />
      </Reveal>

      {categories.map((cat, index) => (
        <Reveal key={cat.id} direction={index % 2 === 0 ? 'left' : 'right'}>
          <CategoryProductRow category={cat} eyebrow="HANDPICKED FOR YOU" tinted={index % 2 === 0} />
        </Reveal>
      ))}

      <Reveal>
        <QuizBanner />
      </Reveal>

     

      <Reveal>
        <Testimonials testimonials={testimonials} />
      </Reveal>

      <NewsletterStrip />
    </>
  );
}

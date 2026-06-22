import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import SectionHeading from '../common/SectionHeading.jsx';

export default function CategoryGrid({ categories = [] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <SectionHeading eyebrow="SHOP BY CATEGORY" title="Everything You Need for Your" accent="Big Day" />

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-8">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/shop?category=${cat.id}`} className="flex flex-col items-center group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-rose-100 group-hover:border-rose-400 transition-colors">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-ink mt-3 text-center">{cat.name}</p>
            <ChevronDown size={14} className="text-rose-400 mt-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}

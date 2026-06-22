import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail, MapPin, Clock } from 'lucide-react';

const shopLinks = [
  ['Bridal Lehengas', '/shop?category=cat-lehengas'],
  ['Wedding Sarees', '/shop?category=cat-sarees'],
  ['Bridal Jewellery', '/shop?category=cat-jewellery'],
  ['Bridal Makeup', '/shop?category=cat-makeup'],
];

const careLinks = [
  ['Contact Us', '/contact'],
  ['FAQs', '/faqs'],
  ['Shipping & Delivery', '/shipping'],
  ['Returns & Exchanges', '/returns'],
];

const companyLinks = [
  ['About Us', '/about'],
  ['Our Story', '/about'],
  ['Privacy Policy', '/privacy'],
  ['Terms & Conditions', '/terms'],
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <span className="font-display text-2xl text-rose-700 flex items-center gap-1.5">
            <span className="text-gold text-base">卐</span>SWASTIK CREATIONS
          </span>
          <p className="text-[10px] tracking-widest2 text-inkmuted mt-0.5">Your Dream, Our Creation</p>
          <p className="text-sm text-inkmuted mt-4 leading-relaxed max-w-xs">
            Your one-stop destination for all things bridal. Because you deserve nothing but the best.
          </p>
        </div>

        <FooterCol title="Shop" links={shopLinks} />
        <FooterCol title="Customer Care" links={careLinks} />
        <FooterCol title="Company" links={companyLinks} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <h4 className="text-rose-600 eyebrow mb-3">Contact Us</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-inkmuted">
          <p className="flex items-center gap-2"><MapPin size={14} className="text-rose-500 shrink-0" /> GF-06 Elan Epic, Sector 70 Gurugram 122101</p>
          <p className="flex items-center gap-2"><Phone size={14} className="text-rose-500 shrink-0" /> +91 93110 97920</p>
          <p className="flex items-center gap-2"><Mail size={14} className="text-rose-500 shrink-0" /> creations.swastik12@gmail.com</p>
          <p className="flex items-center gap-2"><Clock size={14} className="text-rose-500 shrink-0" /> Mon - Sun: 10AM - 10PM</p>
        </div>
      </div>

      <div className="border-t border-rose-100 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-inkmuted">© 2026 @Swastik_Team. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/sswastik_creationss/" aria-label="Instagram" className="text-rose-600 hover:text-rose-700"><Instagram size={16} /></a>
            <a href="https://www.facebook.com/sswastik_creationss/" aria-label="Facebook" className="text-rose-600 hover:text-rose-700"><Facebook size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-rose-600 eyebrow mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-sm text-inkmuted hover:text-rose-600 transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

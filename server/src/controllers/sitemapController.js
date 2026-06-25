import { db } from '../data/store.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { isMongoMode } from '../utils/dataSource.js';

const SITE_URL = (process.env.CLIENT_ORIGIN || 'https://swastik-creations-catlog.vercel.app').replace(/\/$/, '');

// Static, public-facing pages that don't depend on database content.
// Keep this list in sync with the routes in client/src/App.jsx.
const STATIC_PATHS = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/shop', changefreq: 'daily', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.5' },
  { path: '/contact', changefreq: 'monthly', priority: '0.5' },
  { path: '/gallery', changefreq: 'weekly', priority: '0.5' },
  { path: '/faqs', changefreq: 'monthly', priority: '0.3' },
  { path: '/shipping', changefreq: 'monthly', priority: '0.3' },
  { path: '/returns', changefreq: 'monthly', priority: '0.3' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.2' },
  { path: '/terms', changefreq: 'yearly', priority: '0.2' },
];

const escapeXml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const urlEntry = ({ loc, lastmod, changefreq, priority }) => `
  <url>
    <loc>${escapeXml(loc)}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

export const getSitemap = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const entries = STATIC_PATHS.map((p) =>
      urlEntry({ loc: `${SITE_URL}${p.path}`, lastmod: today, changefreq: p.changefreq, priority: p.priority })
    );

    if (isMongoMode()) {
      const [categories, products] = await Promise.all([
        Category.find().select('slug updatedAt'),
        Product.find().select('slug updatedAt'),
      ]);

      categories.forEach((cat) => {
        entries.push(
          urlEntry({
            loc: `${SITE_URL}/shop?category=${cat._id}`,
            lastmod: cat.updatedAt ? cat.updatedAt.toISOString().split('T')[0] : today,
            changefreq: 'weekly',
            priority: '0.7',
          })
        );
      });

      products.forEach((p) => {
        entries.push(
          urlEntry({
            loc: `${SITE_URL}/product/${p.slug}`,
            lastmod: p.updatedAt ? p.updatedAt.toISOString().split('T')[0] : today,
            changefreq: 'weekly',
            priority: '0.8',
          })
        );
      });
    } else {
      // ---- Mock mode ----
      db.categories.forEach((cat) => {
        entries.push(
          urlEntry({
            loc: `${SITE_URL}/shop?category=${cat.id}`,
            lastmod: today,
            changefreq: 'weekly',
            priority: '0.7',
          })
        );
      });

      db.products.forEach((p) => {
        entries.push(
          urlEntry({
            loc: `${SITE_URL}/product/${p.slug}`,
            lastmod: today,
            changefreq: 'weekly',
            priority: '0.8',
          })
        );
      });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join('')}
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    next(err);
  }
};

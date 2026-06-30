const galleryImages = [
  '	https://instagram.fdel27-3.fna.fbcdn.net/v/t51.827…OeCJLRrl1WCjhlKo9S3uk0k1kZBukXcrTwwYg&oe=6A494529',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600',
  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600',
  'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600',
  'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=600',
  'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600',
];

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <p className="eyebrow text-rose-600 mb-2">REAL MOMENTS</p>
        <h1 className="font-display text-3xl sm:text-4xl text-ink">Our Gallery</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((src, i) => (
          <div key={i} className="aspect-square rounded-lg overflow-hidden bg-blush">
            <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

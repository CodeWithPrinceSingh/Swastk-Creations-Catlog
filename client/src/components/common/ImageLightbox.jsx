import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

// Full-screen lightbox for viewing product images at full size, with
// click-to-zoom and left/right navigation through the gallery.
export default function ImageLightbox({ images, startIndex = 0, open, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (open) {
      setIndex(startIndex);
      setZoomed(false);
    }
  }, [open, startIndex]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, images.length, onClose]);

  if (!open) return null;

  const goPrev = (e) => {
    e.stopPropagation();
    setZoomed(false);
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  const goNext = (e) => {
    e.stopPropagation();
    setZoomed(false);
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center animate-lightbox-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/30 rounded-full p-2"
      >
        <X size={22} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setZoomed((z) => !z);
        }}
        aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
        className="absolute top-4 left-4 z-10 text-white/80 hover:text-white bg-black/30 rounded-full p-2"
      >
        {zoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white bg-black/30 rounded-full p-2"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white bg-black/30 rounded-full p-2"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <img
        src={images[index]}
        alt=""
        onClick={(e) => {
          e.stopPropagation();
          setZoomed((z) => !z);
        }}
        className={`max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-300 cursor-zoom-in ${
          zoomed ? 'scale-150 cursor-zoom-out' : ''
        }`}
      />

      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setZoomed(false);
                setIndex(i);
              }}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

import { Sparkle, MapPin } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-rose-700 text-cream text-xs sm:text-sm py-2.5 px-4 text-center font-medium tracking-wide">
      <span className="inline-flex items-center gap-1.5">
        <Sparkle size={13} className="text-gold" aria-hidden="true" />
        BROWSE OUR FULL COLLECTION ONLINE
      </span>
      <span className="mx-3 opacity-50 hidden sm:inline">|</span>
      <span className="hidden sm:inline-flex items-center gap-1.5">
        <MapPin size={13} className="text-gold" aria-hidden="true" />
        VISIT US IN GURUGRAM TO SHOP IN PERSON
      </span>
    </div>
  );
}

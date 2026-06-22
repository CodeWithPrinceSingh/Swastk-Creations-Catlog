export default function SectionHeading({ eyebrow, title, accent, align = 'center' }) {
  return (
    <div className={`mb-10 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <p className={`eyebrow text-rose-600 flex items-center gap-2 mb-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="text-gold">✦</span>
          {eyebrow}
          <span className="text-gold">✦</span>
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl text-ink">
        {title}
        {accent && <em className="text-rose-500 not-italic font-medium italic"> {accent}</em>}
      </h2>
    </div>
  );
}

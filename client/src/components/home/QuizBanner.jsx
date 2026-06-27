import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import StyleQuiz from './StyleQuiz.jsx';

export default function QuizBanner() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-gradient-to-r from-rose-50 via-blush to-rose-50 border border-rose-200 rounded-2xl px-6 sm:px-10 py-10 text-center relative overflow-hidden">
        <Sparkles size={120} className="text-rose-200 absolute -top-6 -right-6 rotate-12 opacity-50" />
        <Sparkles size={80} className="text-gold/30 absolute bottom-0 left-4 -rotate-12" />

        <p className="eyebrow text-rose-600 mb-2 relative">✦ NOT SURE WHERE TO START? ✦</p>
        <h2 className="font-display text-2xl sm:text-3xl text-ink relative">
          Find Your Perfect <em className="text-rose-500 italic">Style</em>
        </h2>
        <p className="text-sm text-inkmuted mt-2 max-w-md mx-auto relative">
          Answer a few quick questions and we'll recommend the perfect collection for your big day.
        </p>

        <button
          onClick={() => setQuizOpen(true)}
          className="relative mt-6 inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 transition-colors text-white text-sm font-semibold tracking-wide px-7 py-3.5 rounded-md"
        >
          <Sparkles size={15} /> TAKE THE STYLE QUIZ
        </button>
      </div>

      <StyleQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />
    </section>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import Modal from '../common/Modal.jsx';
import ProductCard from '../product/ProductCard.jsx';
import Loader from '../common/Loader.jsx';
import { quizQuestions, categoryKeywordMap, calculateQuizResult } from '../../data/quizData.js';
import { fetchCategories } from '../../api/categories.js';
import { fetchProducts } from '../../api/products.js';

export default function StyleQuiz({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // { category, products }

  const totalSteps = quizQuestions.length;
  const isLastStep = step === totalSteps - 1;

  const handleAnswer = async (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (!isLastStep) {
      setStep((s) => s + 1);
      return;
    }

    // Last question answered — compute result
    setLoading(true);
    try {
      const winningKey = calculateQuizResult(newAnswers);
      const keywords = categoryKeywordMap[winningKey] || [];

      const { categories } = await fetchCategories();
      const matchedCategory =
        categories.find((c) => keywords.some((kw) => c.name.toLowerCase().includes(kw))) ||
        categories[0];

      let products = [];
      if (matchedCategory) {
        const res = await fetchProducts({ category: matchedCategory.id, pageSize: 4 });
        products = res.products;
      }

      setResult({ category: matchedCategory, products });
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  const handleClose = () => {
    handleRestart();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="">
      {!result && !loading && (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={18} className="text-rose-500" />
            <h2 className="font-display text-xl text-ink">Find Your Style</h2>
          </div>
          <p className="text-xs text-inkmuted mb-5">
            Question {step + 1} of {totalSteps}
          </p>

          {/* Progress bar */}
          <div className="h-1.5 bg-rose-100 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>

          <h3 className="font-display text-lg text-ink mb-4">{quizQuestions[step].question}</h3>

          <div className="space-y-3">
            {quizQuestions[step].options.map((option) => (
              <button
                key={option.label}
                onClick={() => handleAnswer(option)}
                className="w-full text-left text-sm font-medium border border-rose-200 rounded-lg px-4 py-3 hover:border-rose-500 hover:bg-rose-50 transition-colors flex items-center justify-between group"
              >
                {option.label}
                <ArrowRight size={14} className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <Loader label="Finding your perfect match..." />}

      {result && !loading && (
        <div>
          <div className="text-center mb-6">
            <Sparkles size={28} className="text-gold mx-auto mb-2" />
            <p className="eyebrow text-rose-600 mb-1">YOUR PERFECT MATCH</p>
            <h2 className="font-display text-2xl text-ink">{result.category?.name || 'Something Special'}</h2>
            <p className="text-sm text-inkmuted mt-2">
              Based on your answers, we think you'll love our {result.category?.name?.toLowerCase()} collection.
            </p>
          </div>

          {result.products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {result.products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-inkmuted text-center mb-6">
              We're adding new pieces to this collection soon — explore the full shop in the meantime.
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 flex-1 border border-rose-300 text-rose-600 font-semibold text-sm tracking-wide py-3 rounded-md hover:bg-rose-50 transition-colors"
            >
              <RotateCcw size={14} /> Retake Quiz
            </button>
            <Link
              to={result.category ? `/shop?category=${result.category.id}` : '/shop'}
              onClick={handleClose}
              className="flex-1 text-center bg-rose-600 hover:bg-rose-700 transition-colors text-white font-semibold text-sm tracking-wide py-3 rounded-md"
            >
              SHOP COLLECTION
            </Link>
          </div>
        </div>
      )}
    </Modal>
  );
}

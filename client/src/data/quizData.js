// Quiz logic: each answer carries "weights" toward category keys.
// At the end, the category with the highest accumulated score wins.
// We then match that key against live category names fetched from the API
// (case-insensitive substring match), so this works regardless of whether
// the store uses string IDs like "cat-sarees" or Mongo ObjectIds.

export const quizQuestions = [
  {
    id: 'occasion',
    question: "What's the occasion?",
    options: [
      { label: 'Wedding Ceremony', weights: { lehenga: 3, saree: 1 } },
      { label: 'Reception / Party', weights: { gown: 3, saree: 1 } },
      { label: 'Mehendi / Haldi', weights: { saree: 2, suit: 2 } },
      { label: 'Everyday Festive Wear', weights: { suit: 3, blouse: 1 } },
    ],
  },
  {
    id: 'style',
    question: 'Which style speaks to you most?',
    options: [
      { label: 'Traditional & Regal', weights: { lehenga: 2, saree: 2 } },
      { label: 'Modern & Sleek', weights: { gown: 3 } },
      { label: 'Comfortable & Elegant', weights: { suit: 2, saree: 1 } },
      { label: 'Bold & Statement-Making', weights: { gown: 2, lehenga: 1 } },
    ],
  },
  {
    id: 'color',
    question: 'Pick a color palette',
    options: [
      { label: 'Deep Reds & Maroons', weights: { lehenga: 2, saree: 1 } },
      { label: 'Pastels & Blush Tones', weights: { gown: 2, suit: 1 } },
      { label: 'Gold & Jewel Tones', weights: { saree: 2, lehenga: 1 } },
      { label: 'Whites & Ivory', weights: { gown: 3 } },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you?',
    options: [
      { label: 'Intricate Embroidery', weights: { lehenga: 3 } },
      { label: 'Comfort & Ease of Movement', weights: { suit: 3, saree: 1 } },
      { label: 'Timeless Drape', weights: { saree: 3 } },
      { label: 'A Show-Stopping Silhouette', weights: { gown: 3 } },
    ],
  },
];

// Maps internal keys used in weights above to keywords we'll search for
// in the live category names fetched from the API.
export const categoryKeywordMap = {
  lehenga: ['lehenga'],
  saree: ['saree'],
  gown: ['gown'],
  suit: ['suit'],
  blouse: ['blouse'],
};

export function calculateQuizResult(answers) {
  const scores = {};

  answers.forEach((answer) => {
    Object.entries(answer.weights).forEach(([key, weight]) => {
      scores[key] = (scores[key] || 0) + weight;
    });
  });

  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return winner ? winner[0] : null; // returns key like "lehenga", "gown", etc.
}

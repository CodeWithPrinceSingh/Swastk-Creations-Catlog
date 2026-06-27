import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    name: { type: String, required: true, trim: true },
    location: { type: String, trim: true, default: '' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    quote: { type: String, required: true, trim: true },
    avatar: { type: String, default: '' },
    // Admin must approve before it shows publicly
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);

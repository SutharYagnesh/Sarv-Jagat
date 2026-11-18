import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
    index: true,
  },
  seoTitle: {
    type: String,
    default: '',
    trim: true,
  },
  seoDescription: {
    type: String,
    default: '',
    trim: true,
  },
  seoKeywords: [{
    type: String,
    trim: true,
  }],
  canonicalUrl: {
    type: String,
    default: '',
    trim: true,
  },
  ogImage: {
    type: String,
    default: '',
    trim: true,
  },
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);

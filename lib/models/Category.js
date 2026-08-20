import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  order: {
    type: Number,
    default: 0,
    index: true,
  },
  description: { type: String },
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: [{ type: String }],
  image: { type: String },
  status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Published', index: true }
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);

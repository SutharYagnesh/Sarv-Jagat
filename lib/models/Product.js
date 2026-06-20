import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  modelNumber: { type: String, required: true },
  powerRating: { type: String, required: true },
  pressureRating: { type: String, required: true },
  airFlow: { type: String, required: true },
  price: { type: Number },
  images: [{ type: String }],
  videos: [{ type: String }],
  youtubeLink: { type: String },
  description: { type: String, required: true },
  specifications: [{
    key: { type: String },
    value: { type: String }
  }],
  seoTitle: { type: String, required: true },
  seoDescription: { type: String, required: true },
  seoKeywords: [{ type: String }],
  status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Draft' },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

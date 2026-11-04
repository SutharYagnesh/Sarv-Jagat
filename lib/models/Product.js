import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true, index: true },
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
  order: { type: Number, default: 0, index: true },
  status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Draft', index: true },
  includeInMerchant: { type: Boolean, default: true },
  merchantPrice: { type: Number },
}, { timestamps: true });

ProductSchema.index({ status: 1, order: 1 });
ProductSchema.index({ category: 1, status: 1, order: 1 });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

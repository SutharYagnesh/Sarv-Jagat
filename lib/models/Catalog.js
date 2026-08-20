import mongoose from 'mongoose';

const CatalogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  fileUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  fileSize: { type: Number },
  order: { type: Number, default: 0, index: true },
  status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Published', index: true },
}, { timestamps: true });

export default mongoose.models.Catalog || mongoose.model('Catalog', CatalogSchema);

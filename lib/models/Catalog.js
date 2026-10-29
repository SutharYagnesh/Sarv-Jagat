import mongoose from 'mongoose';

const CatalogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, default: 'Complete Range' },
    pdfUrl: { type: String, required: true },
    fileSize: { type: String, default: 'PDF Document' },
    pages: { type: Number, default: 0 },
    format: { type: String, default: 'PDF' },
    isComprehensive: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
  },
  { timestamps: true }
);

export default mongoose.models.Catalog || mongoose.model('Catalog', CatalogSchema);


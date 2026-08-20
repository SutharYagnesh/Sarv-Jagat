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
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);

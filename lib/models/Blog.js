import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the blog post.'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for the blog post.'],
    unique: true,
  },
  excerpt: {
    type: String,
  },
  content: {
    type: String,
    default: "",
  },
  author: {
    name: {
      type: String,
      default: 'Admin'
    }
  },
  category: {
    type: String,
  },
  tags: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  imageUrl: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  instagramLink: {
    type: String,
  },
  videos: {
    type: [String],
    default: [],
  },
  youtubeLink: {
    type: String,
  },
  readTime: {
    type: Number,
    default: 5,
  },
  order: {
    type: Number,
    default: 0,
    index: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  includeInMerchant: {
    type: Boolean,
    default: true,
  },
  merchantPrice: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true, // This automatically adds createdAt and updatedAt fields
});

BlogSchema.index({ status: 1, order: 1, publishedAt: -1 });
BlogSchema.index({ category: 1, status: 1 });

// Transform output to change _id to id to match frontend expectation
BlogSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// Force model recompilation in Next.js dev mode
if (mongoose.models.Blog) {
  delete mongoose.models.Blog;
}

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

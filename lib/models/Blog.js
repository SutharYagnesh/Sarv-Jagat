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
  publishedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // This automatically adds createdAt and updatedAt fields
});

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

import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Super Admin', 'Content Admin', 'Main Admin', 'GM', 'Manager', 'Designer'], 
    default: 'Super Admin' 
  },
  permissions: {
    products: { view: { type: Boolean, default: true }, add: { type: Boolean, default: false }, edit: { type: Boolean, default: false }, delete: { type: Boolean, default: false } },
    categories: { view: { type: Boolean, default: true }, add: { type: Boolean, default: false }, edit: { type: Boolean, default: false }, delete: { type: Boolean, default: false } },
    blogs: { view: { type: Boolean, default: true }, add: { type: Boolean, default: false }, edit: { type: Boolean, default: false }, delete: { type: Boolean, default: false }, publish: { type: Boolean, default: false } },
    catalog: { view: { type: Boolean, default: true }, add: { type: Boolean, default: false }, edit: { type: Boolean, default: false }, delete: { type: Boolean, default: false } },
    users: { view: { type: Boolean, default: false }, add: { type: Boolean, default: false }, edit: { type: Boolean, default: false }, delete: { type: Boolean, default: false } },
  },
}, { timestamps: true });

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Main Admin', 'Manager', 'Product Manager', 'Blogger', 'Merchant Manager'], 
    default: 'Main Admin' 
  },
}, { timestamps: true });

if (mongoose.models.Admin) {
  delete mongoose.models.Admin;
}

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

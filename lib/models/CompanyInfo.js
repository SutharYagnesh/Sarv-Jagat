import mongoose from 'mongoose';

const CompanyInfoSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'Sarv Jagat Corporation',
    },
    address: {
      type: String,
      default:
        'Shade No-24, Vinayak Industrial Estate - 2, Near Asudev Industrial Estate, Kathwada-Singarva Road, Kathwada-GIDC, Ahmedabad-382430, Gujarat, India',
    },
    shortAddress: {
      type: String,
      default:
        'Vinayak Industrial Estate - 2, Kathwada-GIDC, Ahmedabad-382430, Gujarat, India',
    },
    city: {
      type: String,
      default: 'Ahmedabad',
    },
    state: {
      type: String,
      default: 'Gujarat',
    },
    pincode: {
      type: String,
      default: '382430',
    },
    country: {
      type: String,
      default: 'India',
    },
    primaryPhone: {
      type: String,
      default: '+91-9157487233',
    },
    secondaryPhone: {
      type: String,
      default: '+91-9157770753',
    },
    primaryEmail: {
      type: String,
      default: 'contact@sarvjagat.com',
    },
    supportEmail: {
      type: String,
      default: 'contact@sarvjagat.com',
    },
    workingHours: {
      type: String,
      default: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
    },
    googleMapsUrl: {
      type: String,
      default: 'https://maps.google.com/?q=Sarv+Jagat+Corporation+Kathwada+Ahmedabad',
    },
  },
  { timestamps: true }
);

export default mongoose.models.CompanyInfo ||
  mongoose.model('CompanyInfo', CompanyInfoSchema);


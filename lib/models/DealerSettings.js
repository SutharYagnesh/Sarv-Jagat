import mongoose from 'mongoose';

const DealerSettingsSchema = new mongoose.Schema(
  {
    showLocateDealerTab: {
      type: Boolean,
      default: false,
    },
    heroTitle: {
      type: String,
      default: 'Dealer Network',
    },
    heroSubtitle: {
      type: String,
      default:
        'Find authorized Sarv Jagat dealers and service centers across India. Get expert support, genuine parts, and professional service from our trusted partners.',
    },
    dealersCount: {
      type: String,
      default: '200+ Dealers',
    },
    coverageText: {
      type: String,
      default: 'Pan-India Coverage',
    },
    certifiedPartnersText: {
      type: String,
      default: 'Certified Partners',
    },
    networkDescription: {
      type: String,
      default:
        'Our nationwide dealer network spans across all major industrial belts to provide prompt sales, installation, and after-sales support.',
    },
    regionalCoverage: [
      {
        region: { type: String, default: '' },
        states: { type: String, default: '' },
        dealers: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.DealerSettings ||
  mongoose.model('DealerSettings', DealerSettingsSchema);


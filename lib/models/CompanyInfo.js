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
    heroImage: {
      type: String,
      default: '/sj-main-page.png',
    },
    heroBadge: {
      type: String,
      default: 'Trusted Since 2024',
    },
    heroHeading: {
      type: String,
      default: 'Powering Industries with Reliable Air Solutions',
    },
    heroSubheading: {
      type: String,
      default:
        'Sarv Jagat delivers world-class air compressors, from 1 HP to 220+ HP, engineered for continuous operation across diverse industrial applications.',
    },
    stats: {
      yearsExperience: { type: String, default: '18+' },
      happyClients: { type: String, default: '2000+' },
      productVariants: { type: String, default: '50+' },
      industriesServed: { type: String, default: '15+' },
      serviceSupport: { type: String, default: '25+' },
      technicalHelp: { type: String, default: '24/7' },
      installationsCount: { type: String, default: '5000+' },
      installationsText: { type: String, default: 'Years of Excellence' },
    },
    certifications: [
      {
        title: { type: String, default: '' },
        authority: { type: String, default: '' },
        year: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' },
      },
    ],
    merchantSettings: {
      skuPrefix: { type: String, default: 'SJ' },
      suppliedSkuPrefix: { type: String, default: 'SJ-SUP' },
      handlingTimeMin: { type: Number, default: 1 },
      handlingTimeMax: { type: Number, default: 3 },
      transitTimeMin: { type: Number, default: 3 },
      transitTimeMax: { type: Number, default: 7 },
      ratingValue: { type: String, default: '4.9' },
      reviewCount: { type: String, default: '85' },
      reviewerName: { type: String, default: 'Industrial Plant Engineer' },
      reviewBody: {
        type: String,
        default:
          'High energy efficiency, robust build quality, and excellent continuous pneumatic air delivery. Highly recommended for heavy-duty industrial applications.',
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.CompanyInfo ||
  mongoose.model('CompanyInfo', CompanyInfoSchema);


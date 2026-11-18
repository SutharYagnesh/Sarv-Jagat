import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Dealer from '@/lib/models/Dealer';
import DealerSettings from '@/lib/models/DealerSettings';

export const revalidate = 300;

const DEFAULT_SETTINGS = {
  showLocateDealerTab: false,
  heroTitle: 'Dealer Network',
  heroSubtitle:
    'Find authorized Sarv Jagat dealers, worldwide distribution partners, and international service centers. Get expert support, genuine parts, and professional service from our trusted partners.',
  dealersCount: '200+ Dealers',
  coverageText: 'Worldwide Network & Global Export',
  certifiedPartnersText: 'Certified Partners',
  networkDescription:
    'Our global distribution and dealer network spans across major industrial belts and international markets to provide prompt sales, installation, and after-sales support.',
  regionalCoverage: [
    { region: 'North India', states: 'Delhi, Punjab, Haryana, UP, Rajasthan', dealers: '45+' },
    { region: 'West India', states: 'Maharashtra, Gujarat, MP, Goa', dealers: '60+' },
    { region: 'South India', states: 'Karnataka, Tamil Nadu, Andhra Pradesh, Kerala', dealers: '55+' },
    { region: 'East India', states: 'West Bengal, Odisha, Jharkhand, Bihar', dealers: '40+' },
  ],
};

const INITIAL_DEALERS = [
  {
    name: 'Mumbai Industrial Solutions',
    type: 'Authorized Dealer',
    rating: 4.8,
    address: 'Industrial Estate, Andheri East, Mumbai - 400069',
    city: 'Mumbai',
    state: 'Maharashtra',
    website: 'www.mumbaiindustrial.com',
    specialties: ['Screw Compressors', 'Service & Maintenance', 'Spare Parts'],
    established: '2010',
    experience: '14+ years',
    serviceArea: 'Mumbai, Thane, Navi Mumbai',
    isActive: true,
  },
  {
    name: 'Delhi Compressor Hub',
    type: 'Premium Partner',
    rating: 4.9,
    address: 'Industrial Area, Phase-II, Noida - 201305',
    city: 'Delhi',
    state: 'Delhi',
    website: 'www.delhicompressor.com',
    specialties: ['All Products', 'Custom Solutions', 'Energy Audits'],
    established: '2024',
    experience: '16+ years',
    serviceArea: 'Delhi NCR, Gurgaon, Faridabad',
    isActive: true,
  },
  {
    name: 'Bangalore Air Systems',
    type: 'Authorized Dealer',
    rating: 4.7,
    address: 'Industrial Layout, Peenya, Bangalore - 560058',
    city: 'Bangalore',
    state: 'Karnataka',
    website: 'www.bangaloreairsystems.com',
    specialties: ['High Pressure Compressors', 'Dryers', 'Filters'],
    established: '2012',
    experience: '12+ years',
    serviceArea: 'Bangalore, Mysore, Hosur',
    isActive: true,
  },
  {
    name: 'Ahmedabad Compressor Corp',
    type: 'Authorized Dealer',
    rating: 4.9,
    address: 'GIDC Industrial Area, Kathwada, Ahmedabad - 382430',
    city: 'Ahmedabad',
    state: 'Gujarat',
    website: 'www.sarvjagat.com',
    specialties: ['Screw Compressors', 'Industrial Solutions', 'Direct Factory Support'],
    established: '2008',
    experience: '16+ years',
    serviceArea: 'Ahmedabad, Vadodara, Surat, Rajkot',
    isActive: true,
  },
];

export async function GET() {
  try {
    await connectDB();

    let settings = await DealerSettings.findOne().lean();
    if (!settings) {
      settings = await DealerSettings.create(DEFAULT_SETTINGS);
    }

    const count = await Dealer.countDocuments();
    if (count === 0) {
      await Dealer.insertMany(INITIAL_DEALERS);
    }

    const dealers = await Dealer.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).lean();

    return NextResponse.json(
      {
        settings,
        dealers,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=300, s-maxage=1800, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Error in public dealers GET:', error);
    return NextResponse.json({ settings: DEFAULT_SETTINGS, dealers: INITIAL_DEALERS });
  }
}

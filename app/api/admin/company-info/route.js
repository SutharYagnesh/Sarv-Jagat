import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import CompanyInfo from '@/lib/models/CompanyInfo';
import { invalidateCache } from '@/lib/memoryCache';

export const dynamic = 'force-dynamic';

const DEFAULT_INFO = {
  companyName: 'Sarv Jagat Corporation',
  address:
    'Shade No-24, Vinayak Industrial Estate - 2, Near Asudev Industrial Estate, Kathwada-Singarva Road, Kathwada-GIDC, Ahmedabad-382430, Gujarat, India',
  shortAddress:
    'Vinayak Industrial Estate - 2, Kathwada-GIDC, Ahmedabad-382430, Gujarat, India',
  city: 'Ahmedabad',
  state: 'Gujarat',
  pincode: '382430',
  country: 'India',
  primaryPhone: '+91-9157487233',
  secondaryPhone: '+91-9157770753',
  primaryEmail: 'contact@sarvjagat.com',
  supportEmail: 'contact@sarvjagat.com',
  workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
  googleMapsUrl: 'https://maps.google.com/?q=Sarv+Jagat+Corporation+Kathwada+Ahmedabad',
  heroImage: '/sj-main-page.png',
  heroBadge: 'Trusted Since 2024',
  heroHeading: 'Powering Industries with Reliable Air Solutions',
  heroSubheading:
    'Sarv Jagat delivers world-class air compressors, from 1 HP to 220+ HP, engineered for continuous operation across diverse industrial applications.',
  stats: {
    yearsExperience: '18+',
    happyClients: '2000+',
    productVariants: '50+',
    industriesServed: '15+',
    serviceSupport: '25+',
    technicalHelp: '24/7',
    installationsCount: '5000+',
    installationsText: 'Years of Excellence',
  },
  certifications: [
    {
      title: 'ISO 9001:2015',
      authority: 'Quality Management System',
      year: '2025',
      description: 'Certified for international quality standards in compressor manufacturing and supply.',
      image: '',
    },
    {
      title: 'CE Marking',
      authority: 'European Conformity Standards',
      year: '2025',
      description: 'Compliant with European health, safety, and environmental protection standards.',
      image: '',
    },
  ],
};

export async function GET() {
  try {
    await connectDB();
    let info = await CompanyInfo.findOne().lean();
    if (!info) {
      info = await CompanyInfo.create(DEFAULT_INFO);
    }
    return NextResponse.json(info);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await connectDB();
    let info = await CompanyInfo.findOne();
    if (info) {
      Object.assign(info, data);
      await info.save();
    } else {
      info = await CompanyInfo.create(data);
    }
    invalidateCache('homepage');
    invalidateCache('company_info');
    return NextResponse.json(info);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


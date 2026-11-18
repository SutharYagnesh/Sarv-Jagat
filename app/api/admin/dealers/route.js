import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Dealer from '@/lib/models/Dealer';
import DealerSettings from '@/lib/models/DealerSettings';

export const dynamic = 'force-dynamic';

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

// GET: fetch settings and all dealers
export async function GET() {
  try {
    await connectDB();

    let settings = await DealerSettings.findOne().lean();
    if (!settings) {
      settings = await DealerSettings.create(DEFAULT_SETTINGS);
    }

    const dealers = await Dealer.find({}).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({
      settings,
      dealers,
    });
  } catch (error) {
    console.error('Error fetching admin dealers data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: create a new dealer
export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();

    if (!body.name) {
      return NextResponse.json({ error: 'Dealer name is required' }, { status: 400 });
    }

    const newDealer = await Dealer.create({
      name: body.name,
      type: body.type || 'Authorized Dealer',
      rating: body.rating || 4.8,
      address: body.address || '',
      city: body.city || '',
      state: body.state || '',
      pincode: body.pincode || '',
      phone: body.phone || '',
      email: body.email || '',
      website: body.website || '',
      specialties: Array.isArray(body.specialties) ? body.specialties : ['Screw Compressors'],
      established: body.established || '',
      experience: body.experience || '',
      serviceArea: body.serviceArea || '',
      isActive: body.isActive !== false,
      order: body.order || 0,
    });

    return NextResponse.json(newDealer, { status: 201 });
  } catch (error) {
    console.error('Error creating dealer:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: update dealer settings (e.g. toggle showLocateDealerTab, update stats)
export async function PUT(request) {
  try {
    const body = await request.json();
    await connectDB();

    let settings = await DealerSettings.findOne();
    if (!settings) {
      settings = await DealerSettings.create({ ...DEFAULT_SETTINGS, ...body });
    } else {
      Object.assign(settings, body);
      await settings.save();
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating dealer settings:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


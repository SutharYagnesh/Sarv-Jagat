import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import CompanyInfo from '@/lib/models/CompanyInfo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    console.error('Error fetching company info:', error);
    return NextResponse.json(DEFAULT_INFO);
  }
}


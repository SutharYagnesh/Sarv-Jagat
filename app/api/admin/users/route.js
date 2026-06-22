import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/lib/models/Admin';
import bcrypt from 'bcryptjs';
import { verifyToken } from '@/lib/auth';

// Helper to check if requester is Main Admin
async function isMainAdmin(request) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return payload && payload.role === 'Main Admin';
}

export async function GET(request) {
  if (!(await isMainAdmin(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    await connectDB();
    const admins = await Admin.find({}).select('-password').sort({ createdAt: -1 }).lean();
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await isMainAdmin(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { username, password, role } = await request.json();
    await connectDB();
    
    const existing = await Admin.findOne({ username });
    if (existing) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ username, password: hashedPassword, role });
    
    // Don't send back password
    const adminObj = newAdmin.toObject();
    delete adminObj.password;

    return NextResponse.json(adminObj, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

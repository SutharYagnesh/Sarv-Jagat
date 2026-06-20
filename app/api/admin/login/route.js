import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/lib/models/Admin';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    await connectDB();

    // Check if admin exists
    const admin = await Admin.findOne({ username });

    if (!admin) {
      // For initial setup: create default admin if none exists
      const adminCount = await Admin.countDocuments();
      if (adminCount === 0 && username === 'admin') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({ username, password: hashedPassword, role: 'Main Admin' });
        
        const token = await signToken({ username, role: newAdmin.role });
        const response = NextResponse.json({ success: true, role: newAdmin.role });
        response.cookies.set({
          name: 'admin_token',
          value: token,
          httpOnly: true,
          path: '/',
          maxAge: 86400, // 1 day
        });
        return response;
      }

      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ username: admin.username, role: admin.role });
    const response = NextResponse.json({ success: true, role: admin.role });
    
    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 86400,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error', stack: error.stack }, { status: 500 });
  }
}

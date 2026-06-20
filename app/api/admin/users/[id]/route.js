import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/lib/models/Admin';
import { verifyToken } from '@/lib/auth';

async function isMainAdmin(request) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return payload && payload.role === 'Main Admin';
}

export async function DELETE(request, { params }) {
  if (!(await isMainAdmin(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const { id } = params;
    await connectDB();
    
    const adminToDelete = await Admin.findById(id);
    if (!adminToDelete) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Optional: Prevent deleting the last Main Admin
    const mainAdminCount = await Admin.countDocuments({ role: 'Main Admin' });
    if (adminToDelete.role === 'Main Admin' && mainAdminCount <= 1) {
      return NextResponse.json({ error: 'Cannot delete the last Main Admin' }, { status: 400 });
    }

    await Admin.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

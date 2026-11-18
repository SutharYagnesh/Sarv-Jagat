import { NextResponse } from 'next/server';
import { getGridFSBucket, deleteGridFSFile } from '@/lib/gridfs';
import { Readable } from 'stream';

export const dynamic = 'force-dynamic';

/**
 * Build a timestamped filename with organized folder structure.
 * Format: YYYYMMDD_HHMMSSmmm_subcategory_originalname.ext
 * Folder:  images/{department}/{subcategory}/  or  videos/{department}/{subcategory}/
 */
function buildOrganizedPath(originalName, department, subcategory, mediaType) {
  const now = new Date();
  const pad = (n, len = 2) => String(n).padStart(len, '0');
  const datePart = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const timePart = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}${pad(now.getMilliseconds(), 3)}`;
  const timestamp = `${datePart}_${timePart}`;

  // Sanitize names
  const safeDept = (department || 'general').replace(/[^a-z0-9-_]/gi, '').toLowerCase();
  const safeSub = (subcategory || 'misc').replace(/[^a-z0-9-_]/gi, '').toLowerCase();
  const safeOrig = originalName.replace(/[^a-z0-9.\-_]/gi, '_').toLowerCase();

  // Determine top-level media folder
  const topFolder = (mediaType === 'video') ? 'videos' : 
                    (mediaType === 'document') ? 'documents' : 'images';

  const folder = `${topFolder}/${safeDept}/${safeSub}/`;
  const filename = `${timestamp}_${safeSub}_${safeOrig}`;

  return { folder, filename };
}

// POST - Upload a file to GridFS with organized metadata
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Organizational metadata from query params or FormData
    const department = formData.get('department') || request.nextUrl?.searchParams?.get('department') || 'general';
    const subcategory = formData.get('subcategory') || request.nextUrl?.searchParams?.get('subcategory') || 'misc';

    const contentType = file.type || 'application/octet-stream';
    const mediaType = contentType.startsWith('video/') ? 'video'
                    : contentType.startsWith('image/') ? 'image'
                    : contentType === 'application/pdf' ? 'document'
                    : 'other';

    const { folder, filename } = buildOrganizedPath(file.name || 'upload', department, subcategory, mediaType);

    const bucket = await getGridFSBucket();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        contentType,
        uploadedAt: new Date(),
        size: buffer.length,
        department,
        subcategory,
        mediaType,
        originalName: file.name || 'upload',
        uploadFolder: folder,
      },
    });

    await new Promise((resolve, reject) => {
      const readable = Readable.from(buffer);
      readable.pipe(uploadStream).on('finish', resolve).on('error', reject);
    });

    const fileUrl = `/api/media/${uploadStream.id}/${encodeURIComponent(filename)}`;
    const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);

    return NextResponse.json({
      url: fileUrl,
      filename,
      originalName: file.name,
      size: `${sizeMb} MB`,
      id: String(uploadStream.id),
      folder,
      uploadedAt: new Date().toISOString(),
      department,
      subcategory,
      mediaType,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload file' }, { status: 500 });
  }
}

// DELETE - Remove a file from GridFS by its URL or ObjectId
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('id');
    const fileUrl = searchParams.get('url');

    const target = fileId || fileUrl;
    if (!target) {
      return NextResponse.json({ error: 'Provide id or url parameter' }, { status: 400 });
    }

    const deleted = await deleteGridFSFile(target);
    if (deleted) {
      return NextResponse.json({ success: true, message: 'File deleted from storage' });
    } else {
      return NextResponse.json({ error: 'File not found or already deleted' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete file' }, { status: 500 });
  }
}

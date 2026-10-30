import mongoose from 'mongoose';
import connectDB from '@/lib/db';

export async function getGridFSBucket() {
  await connectDB();
  return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'mediaFiles',
  });
}

export async function deleteGridFSFile(fileUrlOrId) {
  if (!fileUrlOrId) return false;
  try {
    await connectDB();
    const bucket = await getGridFSBucket();

    let idString = String(fileUrlOrId);
    // If it's a URL like /api/media/6ae3e1f385a79e876e0fe4f6/filename.pdf
    const match = idString.match(/\/api\/media\/([a-fA-F0-9]{24})/);
    if (match) {
      idString = match[1];
    }

    if (mongoose.Types.ObjectId.isValid(idString)) {
      const objId = new mongoose.Types.ObjectId(idString);
      const exists = await mongoose.connection.db.collection('mediaFiles.files').findOne({ _id: objId });
      if (exists) {
        await bucket.delete(objId);
        return true;
      }
    }
    return false;
  } catch (err) {
    console.error('Error deleting file from GridFS:', err);
    return false;
  }
}

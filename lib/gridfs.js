import mongoose from 'mongoose';
import connectDB from '@/lib/db';

export async function getGridFSBucket() {
  await connectDB();
  return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'mediaFiles',
  });
}


import fs from 'fs';
import { MongoClient } from 'mongodb';

async function restoreDatabase() {
  const blobs = JSON.parse(fs.readFileSync('scripts/all_blobs.json', 'utf8'));
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();

  console.log('--- RESTORING PRODUCTS ---');
  const products = await db.collection('products').find({}).toArray();
  let prodRestored = 0;

  for (const p of products) {
    if (p.slug === '10-hp-screw-air-compressor-fixed-speed-8-bar-sj') {
      const origImages = [
        '/uploads/product-10hp-8bar-1-1793802970199.png',
        '/uploads/product-10hp-8bar-2-1793802970205.png',
        '/uploads/product-10hp-8bar-3-1793802970208.png',
      ];
      await db.collection('products').updateOne({ _id: p._id }, { $set: { images: origImages, image: origImages[0] } });
      prodRestored++;
      continue;
    }

    const pTime = new Date(p.createdAt).getTime();

    // Find blobs uploaded within 45 minutes before or 15 minutes after product creation
    let candidates = blobs.filter(blob => {
      const bTime = new Date(blob.uploadedAt).getTime();
      const diff = bTime - pTime;
      return diff >= -45 * 60 * 1000 && diff <= 15 * 60 * 1000 && /\.(png|jpe?g|webp)$/i.test(blob.pathname);
    });

    // If still 0, broaden window to 2 hours
    if (candidates.length === 0) {
      candidates = blobs.filter(blob => {
        const bTime = new Date(blob.uploadedAt).getTime();
        const diff = Math.abs(bTime - pTime);
        return diff <= 2 * 60 * 60 * 1000 && /\.(png|jpe?g|webp)$/i.test(blob.pathname);
      });
    }

    if (candidates.length > 0) {
      // Sort candidates closest to pTime
      candidates.sort((a, b) => {
        const da = Math.abs(new Date(a.uploadedAt).getTime() - pTime);
        const db = Math.abs(new Date(b.uploadedAt).getTime() - pTime);
        return da - db;
      });

      // Group candidate images by common prefix/timestamp if possible
      const chosenBlobs = candidates.slice(0, 3).map(c => c.url);
      await db.collection('products').updateOne({ _id: p._id }, { $set: { images: chosenBlobs, image: chosenBlobs[0] } });
      prodRestored++;
    }
  }
  console.log(`Successfully restored specific image sets for ${prodRestored}/${products.length} products!`);

  console.log('\n--- RESTORING BLOGS ---');
  const blogs = await db.collection('blogs').find({}).toArray();
  let blogRestored = 0;

  for (const b of blogs) {
    if (b.slug === 'premium-industrial-air-compressor-assembly-process') {
      const img = 'https://fhbtzxpqvqaq2mat.public.blob.vercel-storage.com/1000561495.jpg';
      await db.collection('blogs').updateOne({ _id: b._id }, { $set: { imageUrl: img, images: [img], image: img } });
      blogRestored++;
      continue;
    }

    const bTime = new Date(b.createdAt).getTime();

    // Find blobs uploaded within 45 minutes before or 15 minutes after blog creation
    let candidates = blobs.filter(blob => {
      const blTime = new Date(blob.uploadedAt).getTime();
      const diff = blTime - bTime;
      return diff >= -45 * 60 * 1000 && diff <= 15 * 60 * 1000 && /\.(png|jpe?g|webp)$/i.test(blob.pathname);
    });

    if (candidates.length === 0 && b.slug) {
      const slugParts = b.slug.split('-').filter(p => p.length > 4 && !['compressor', 'screw', 'industrial'].includes(p));
      if (slugParts.length > 0) {
        candidates = blobs.filter(blob => slugParts.some(part => blob.pathname.toLowerCase().includes(part)));
      }
    }

    if (candidates.length > 0) {
      // Sort by upload date
      candidates.sort((a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt));
      const urls = candidates.map(c => c.url);
      await db.collection('blogs').updateOne({ _id: b._id }, { $set: { imageUrl: urls[0], images: urls, image: urls[0] } });
      blogRestored++;
    }
  }

  console.log(`Successfully restored specific image sets for ${blogRestored}/${blogs.length} blogs!`);
  await client.close();
}
restoreDatabase();


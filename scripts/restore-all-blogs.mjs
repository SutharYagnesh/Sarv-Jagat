import fs from 'fs';
import connectDB from '../lib/db.js';
import Blog from '../lib/models/Blog.js';

async function restoreBlogs() {
  console.log('Connecting to MongoDB via mongoose...');
  await connectDB();
  console.log('Connected!');

  const mappings = JSON.parse(fs.readFileSync('scripts/all_blog_mappings.json', 'utf8'));
  console.log(`Loaded ${Object.keys(mappings).length} blog image mappings.`);

  const blogs = await Blog.find({}).select('slug title imageUrl images').lean();
  console.log(`Found ${blogs.length} blogs in MongoDB.`);

  const ops = [];
  let updatedCount = 0;

  for (const b of blogs) {
    const mappedImg = mappings[b.slug];
    if (mappedImg) {
      ops.push({
        updateOne: {
          filter: { _id: b._id },
          update: {
            $set: {
              imageUrl: mappedImg,
              images: [mappedImg],
              image: mappedImg,
            }
          }
        }
      });
      updatedCount++;
    } else {
      console.warn(`No mapping found for slug: ${b.slug}`);
    }
  }

  if (ops.length > 0) {
    console.log(`Executing bulkWrite for ${ops.length} blog posts...`);
    const res = await Blog.bulkWrite(ops);
    console.log(`bulkWrite completed: matched ${res.matchedCount}, modified ${res.modifiedCount}`);
  }

  console.log('Checking sample updated blogs:');
  const samples = await Blog.find({
    slug: {
      $in: [
        '1-5-hp-oil-free-reciprocating-air-compressor-50l-tank-aluminium-body-electromagnetic-valve-electronics-industry-sarv-jagat-corporation',
        '1-5-hp-oil-free-reciprocating-air-compressor-50-liter-tank-aluminium-body-electromagnetic-valve-electronics-assembly-industry-sarv-jagat-corporation',
        '1-hp-oil-free-reciprocating-air-compressor-aluminium-body-copper-winding-50l-tank-industrial-applications-sarv-jagat-corporation',
        '1-hp-oil-free-reciprocating-air-compressor-25-liter-tank-aluminium-body-electromagnetic-valve-pharmaceutical-industry-sarv-jagat-corporation',
        '100-litre-air-receiver-tank-at-8-bar-backup-time-explained',
        'compressed-air-quality-protect-equipment-and-production-sarv-jagat',
        '7-5-hp-reciprocating-piston-air-compressor-12-3-bar-300l-tank-cnc-laser-plasma',
      ]
    }
  }).select('slug title imageUrl images').lean();

  for (const s of samples) {
    console.log(`- ${s.slug}:`);
    console.log(`  imageUrl: ${s.imageUrl}`);
    console.log(`  images: ${s.images}`);
  }

  console.log('\n--- BLOG IMAGE RESTORATION COMPLETE ---');
  process.exit(0);
}

restoreBlogs().catch(err => {
  console.error('Restoration failed:', err);
  process.exit(1);
});

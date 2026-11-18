import connectDB from '../lib/db.js';
import mongoose from 'mongoose';

const HP_MAP = {
  '10': {
    fixed: [
      '/uploads/sj-RF-10 8 bar_20260501_150506_0000.png',
      '/uploads/2_20260501_142054_0001.png',
      '/uploads/3_20260501_142054_0002.png'
    ],
    vfd: [
      '/uploads/1_20260501_142054_0000.png',
      '/uploads/2_20260501_142054_0001.png',
      '/uploads/3_20260501_142054_0002.png'
    ]
  },
  '15': {
    fixed: [
      '/uploads/1_20260501_142632_0000.png',
      '/uploads/2_20260501_142632_0001.png',
      '/uploads/3_20260501_142632_0002.png'
    ],
    vfd: [
      '/uploads/1_20260501_153153_0000.png',
      '/uploads/2_20260501_153154_0001.png',
      '/uploads/3_20260501_153154_0002.png'
    ]
  },
  '20': {
    fixed: [
      '/uploads/1_20260501_142738_0000.png',
      '/uploads/2_20260501_142738_0001.png',
      '/uploads/3_20260501_142738_0002.png'
    ],
    vfd: [
      '/uploads/1_20260501_153412_0000.png',
      '/uploads/2_20260501_153412_0001.png',
      '/uploads/3_20260501_153412_0002.png'
    ]
  },
  '25': {
    fixed: [
      '/uploads/1_20260501_143047_0000.png',
      '/uploads/2_20260501_143047_0001.png',
      '/uploads/3_20260501_143047_0002.png'
    ],
    vfd: [
      '/uploads/1_20260501_153653_0000.png',
      '/uploads/2_20260501_153654_0001.png',
      '/uploads/3_20260501_153654_0002.png'
    ]
  },
  '30': {
    fixed: [
      '/uploads/1_20260501_143452_0000.png',
      '/uploads/2_20260501_143452_0001.png',
      '/uploads/3_20260501_143452_0002.png'
    ],
    vfd: [
      '/uploads/1_20260501_153904_0000.png',
      '/uploads/2_20260501_153905_0001.png',
      '/uploads/3_20260501_153905_0002.png'
    ]
  },
  '40': {
    fixed: [
      '/uploads/1_20260501_144508_0000.png',
      '/uploads/2_20260501_144508_0001.png',
      '/uploads/3_20260501_144508_0002.png'
    ],
    vfd: [
      '/uploads/4_20260501_144508_0003.png',
      '/uploads/5_20260501_144509_0004.png',
      '/uploads/6_20260501_144509_0005.png'
    ]
  },
  '50': {
    fixed: [
      '/uploads/1_20260501_145132_0000.png',
      '/uploads/2_20260501_145133_0001.png',
      '/uploads/3_20260501_145133_0002.png'
    ],
    vfd: [
      '/uploads/4_20260501_145133_0003.png',
      '/uploads/5_20260501_145133_0004.png',
      '/uploads/6_20260501_145133_0005.png'
    ]
  },
  '60': {
    fixed: [
      '/uploads/1_20260501_145509_0000.png',
      '/uploads/2_20260501_145509_0001.png',
      '/uploads/3_20260501_145510_0002.png'
    ],
    vfd: [
      '/uploads/4_20260501_145510_0003.png',
      '/uploads/5_20260501_145510_0004.png',
      '/uploads/6_20260501_145510_0005.png'
    ]
  },
  '75': {
    fixed: [
      '/uploads/1_20260501_145822_0000.png',
      '/uploads/2_20260501_145822_0001.png',
      '/uploads/3_20260501_145822_0002.png'
    ],
    vfd: [
      '/uploads/4_20260501_145822_0003.png',
      '/uploads/5_20260501_145823_0004.png',
      '/uploads/6_20260501_145823_0005.png'
    ]
  },
  '100': {
    fixed: [
      '/uploads/1_20260501_151107_0000.png',
      '/uploads/2_20260501_151107_0001.png',
      '/uploads/3_20260501_151107_0002.png'
    ],
    vfd: [
      '/uploads/4_20260501_151107_0003.png',
      '/uploads/5_20260501_151107_0004.png',
      '/uploads/6_20260501_151107_0005.png'
    ]
  },
  '120': {
    fixed: [
      '/uploads/1_20260501_151352_0000.png',
      '/uploads/2_20260501_151353_0001.png',
      '/uploads/3_20260501_151353_0002.png'
    ],
    vfd: [
      '/uploads/4_20260501_151353_0003.png',
      '/uploads/5_20260501_151353_0004.png',
      '/uploads/6_20260501_151353_0005.png'
    ]
  },
  '150': {
    fixed: [
      '/uploads/1_20260501_151708_0000.png',
      '/uploads/2_20260501_151708_0001.png',
      '/uploads/3_20260501_151708_0002.png'
    ],
    vfd: [
      '/uploads/4_20260501_151708_0003.png',
      '/uploads/5_20260501_151708_0004.png',
      '/uploads/6_20260501_151708_0005.png'
    ]
  },
  '175': {
    fixed: [
      '/uploads/1_20260501_152056_0000.png',
      '/uploads/2_20260501_152056_0001.png',
      '/uploads/3_20260501_152056_0002.png'
    ],
    vfd: [
      '/uploads/4_20260501_152056_0003.png',
      '/uploads/5_20260501_152056_0004.png',
      '/uploads/6_20260501_152056_0005.png'
    ]
  },
  '220': {
    fixed: [
      '/uploads/1_20260501_153412_0000.png',
      '/uploads/2_20260501_153412_0001.png',
      '/uploads/3_20260501_153412_0002.png'
    ],
    vfd: [
      '/uploads/4_20260501_153412_0003.png',
      '/uploads/5_20260501_153412_0004.png',
      '/uploads/6_20260501_153412_0005.png'
    ]
  }
};

async function fix() {
  await connectDB();
  const db = mongoose.connection.db;
  const col = db.collection('products');

  const products = await col.find({}).toArray();
  console.log(`Updating ${products.length} products directly in raw MongoDB collection...`);

  let count = 0;
  for (const p of products) {
    const hpMatch = p.powerRating?.match(/(\d+(\.\d+)?)\s*HP/i);
    const hp = hpMatch ? String(Math.round(parseFloat(hpMatch[1]))) : '10';
    const isVfd = /variable|vfd|vsd/i.test(p.title) || /RV/i.test(p.modelNumber);

    const mapping = HP_MAP[hp] || HP_MAP['10'];
    const chosenImages = isVfd ? mapping.vfd : mapping.fixed;

    await col.updateOne(
      { _id: p._id },
      {
        $set: {
          images: chosenImages,
          image: chosenImages[0],
          brand: 'Sarv Jagat - SJ'
        }
      }
    );
    count++;
  }

  console.log(`Successfully updated ${count} products with authentic images!`);

  // Verify
  const blobInImages = await col.countDocuments({ images: { $regex: 'fhbtzxpqvqaq2mat' } });
  const blobInImage = await col.countDocuments({ image: { $regex: 'fhbtzxpqvqaq2mat' } });
  const oldFallback = await col.countDocuments({ image: { $regex: 'product-10hp-8bar' } });

  console.log(`VERIFICATION:`);
  console.log(`Products with blob in images array: ${blobInImages}`);
  console.log(`Products with blob in image field: ${blobInImage}`);
  console.log(`Products with old product-10hp-8bar image: ${oldFallback}`);

  process.exit(0);
}

fix();

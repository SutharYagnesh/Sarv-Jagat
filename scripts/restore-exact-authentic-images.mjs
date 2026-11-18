import connectDB from '../lib/db.js';
import Product from '../lib/models/Product.js';
import Blog from '../lib/models/Blog.js';
import CompanyInfo from '../lib/models/CompanyInfo.js';

const HP_MAP = {
  '10': {
    fixed: [
      '/uploads/product-10hp-8bar-1-1793802970199.png',
      '/uploads/product-10hp-8bar-2-1793802970205.png',
      '/uploads/product-10hp-8bar-3-1793802970208.png'
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

const BLOG_SPECIFIC_MAP = {
  'piston-compressor-multi-stage-reciprocating-compressor-for-boiler-plant': '/uploads/sj-ind-civil-infrastructure.jpg',
  '30-hp-vfd-screw-air-compressor-135-cfm-8-bar-rice-mill-industry': '/uploads/WhatsApp Image 2025-07-12 at 12.22.11 AM.jpeg',
  '20-hp-high-pressure-reciprocating-air-compressor-25-bar-54-cfm-pet-bottle-blowing': '/uploads/sj-ind-pet-water-bottle-production.jpg',
  '20-hp-vfd-screw-air-compressor-16-bar-60-cfm-laser-cutting-fabrication': '/uploads/sj-process implement-metal fabrication-ind.jpg',
  '35-45-cfm-vfd-screw-air-compressor-8-bar-complete-air-treatment-system': '/uploads/WhatsApp Image 2025-07-12 at 12.22.14 AM.jpeg',
  '20-hp-vsd-screw-air-compressor-16-bar-500l-tank-complete-air-treatment-system': '/uploads/SJ_COM_SCREW_TANK_MOUNT_WITH_DRYER__SCREW_COMPRESSOR_INNER_ASSEMBLY_DETAILS-removebg-preview.png',
  '10-hp-vfd-screw-air-compressor-8-bar-mam-6080md-baosi-airend-surat': '/uploads/screw-air-compressor-mam-6080-controller-896.jpg',
  '5-hp-two-stage-reciprocating-piston-air-compressor-transportation-logistics': '/uploads/SARV JAGAT_TROLLY MOUNT_PISTON AIR COMPRESSOR_BLUE.jpg',
  '100-hp-vfd-screw-air-compressor-75-kw-500-cfm-8-bar-solar-industry': '/uploads/WhatsApp Image 2025-07-12 at 12.22.32 AM.jpeg',
  '10-hp-screw-air-compressor-35-45-cfm-powder-coating-tank-manufacturing': '/uploads/WhatsApp Image 2025-07-12 at 12.24.27 AM.jpeg',
  '60-hp-screw-air-compressor-280-cfm-8-bar-for-castor-oil-industry': '/uploads/SJ-CHEMICAL-ind-oil-refinery-plant-tower-column-refinery-petrochemistry.jpg',
  '30-hp-vfd-screw-air-compressor-sinee-vfd-baosi-airend-8-10-bar': '/uploads/WhatsApp Image 2025-07-12 at 12.24.33 AM.jpeg',
  '10-hp-rotary-screw-air-compressor-45-cfm-8-bar-complete-air-solution-for-poha-food-processing': '/uploads/sj-ind-food-processing-industry.jpg',
  '20-hp-vfd-screw-air-compressor-110-cfm-8-bar-textile-industry-surat': '/uploads/sj-textile-ind.jpg',
  '30-hp-vfd-screw-air-compressor-135-cfm-hanbell-airend-rice-mill-rajasthan': '/uploads/WhatsApp Image 2025-07-19 at 2.08.10 PM.jpeg',
  '20-hp-tank-mounted-air-compressor-16-bar-complete-air-treatment-system': '/uploads/SJ_COM_SCREW_YELLOW_TANK_MOUNT_WITH_DRYER_DESIGN_2-removebg-preview.png',
  'screw-air-compressor': '/uploads/SJ_TWIN SCREW COMPRESSOR_SPECIFICATIONS.jpg',
  '7-5-hp-fixed-speed-screw-air-compressor-8-bar-baosi-airend-sugar-mill-industry': '/uploads/WhatsApp Image 2025-07-21 at 5.35.36 PM.jpeg',
  '2-hp-piston-air-compressor-9-bar-4-5-cfm-fad-150-l-tank-construction-food-industry': '/uploads/SJ TROLLY MOUNTED PISTON AIR COMPRESSOR_YELLOW.jpg',
  '60-hp-vfd-vsd-screw-air-compressor-8-bar-280-cfm-food-chemical-manufacturing': '/uploads/WhatsApp Image 2025-09-01 at 2.29.23 PM.jpeg',
  '2-hp-single-stage-3-phase-piston-air-compressor-9-bar-150l-tank-rmc-food-industry': '/uploads/SARV JAGAT_PISTON COMPRESSOR TROLLY MOUNTED BLUE.png',
  '7-5-hp-reciprocating-piston-air-compressor-12-3-bar-300l-tank-cnc-laser-plasma': '/uploads/single-stage-air-compressor.jpg',
  'sj-tank-mounted-20-hp-vsd-screw-compressor-16-bar-500l-tank': '/uploads/SJ_COM_SCREW_YELLOW_TANK_MOUNT_WITH_DRYER_DESIGN_2-removebg-preview.png',
  'sj-20-hp-vsd-screw-air-compressor-with-500l-tank-16-bar-sarv-jagat-corporation': '/uploads/SJ_COM_SCREW_TANK_MOUNT_WITH_DRYER__SCREW_COMPRESSOR_INNER_ASSEMBLY_DETAILS-removebg-preview.png',
  'complete-compressed-air-solutions-sarv-jagat-corporation': '/uploads/Industrial Complex _SARV JAGAT_ Overview.png',
  'compressed-air-quality-protect-equipment-and-production-sarv-jagat': '/uploads/NotebookLM Mind Map.png',
  'air-compressor-maintenance-after-sales-support-sarv-jagat': '/uploads/sj-air-compressor-maintenance-service.jpg',
  'preventive-maintenance-vs-breakdown-repairs-air-compressor-service': '/uploads/sj-annual-management-contracts-obj.png',
  'sarv-jagat-corporation-vfd-technology-industrial-energy-efficiency': '/uploads/sj-energy-audit.jpg',
  'sarv-jagat-corporation-oil-free-air-compressors-for-critical-applications': '/uploads/sj-pharmaceutical-company-ind.jpg',
  'sarv-jagat-corporation-industrial-air-compressors-for-manufacturing-plants': '/uploads/Industrial Complex _SARV JAGAT_ Overview.png',
  'sarv-jagat-corporation-common-causes-of-industrial-air-compressor-failure': '/uploads/SJ-Spare Parts Supply.jpg',
  'sarv-jagat-corporation-energy-efficiency-in-compressed-air-systems': '/uploads/sj-energy-audit.jpg',
  'sarv-jagat-corporation-industrial-air-compressor-support-service': '/uploads/SJ-technical-support-center-customer-service.jpg',
  '20-hp-vsd-screw-air-compressor-16-bar-tank-mounted-system-60-80-cfm-dryer-bedstead-pipe-manufacturing-kalol': '/uploads/WhatsApp Image 2025-09-01 at 2.59.20 PM.jpeg',
  '1-hp-oil-free-reciprocating-air-compressor-aluminium-body-copper-winding-50l-tank-industrial-applications-sarv-jagat-corporation': '/uploads/IMG-20240212-WA0014.jpg',
  '1-5-hp-oil-free-reciprocating-air-compressor-50l-tank-aluminium-body-electromagnetic-valve-electronics-industry-sarv-jagat-corporation': '/uploads/IMG-20240413-WA0002.jpeg',
  '1-5-hp-oil-free-reciprocating-air-compressor-50-liter-tank-aluminium-body-electromagnetic-valve-electronics-assembly-industry-sarv-jagat-corporation': '/uploads/IMG-20240516-WA0043.jpeg',
  '1-hp-oil-free-reciprocating-air-compressor-25-liter-tank-aluminium-body-electromagnetic-valve-pharmaceutical-industry-sarv-jagat-corporation': '/uploads/IMG-20241028-WA0002.jpg',
  '150-cfm-refrigerated-air-dryer-max-16-bar-high-quality-compressed-air-dryer-textile-industry-sarv-jagat-corporation': '/uploads/sj-textile-ind.jpg',
  '200-cfm-refrigerated-air-dryer-max-16-bar-up-to-2-c-dew-point-premium-auto-drain-system-rice-mill-industry-sarv-jagat-corporation': '/uploads/WhatsApp Image 2026-01-28 at 11.49.24 PM.jpeg'
};

async function run() {
  console.log('Connecting to MongoDB via mongoose...');
  await connectDB();
  console.log('Connected! Preparing bulk updates...');

  // 1. Bulk Update Products
  const products = await Product.find({}).select('slug title modelNumber powerRating pressureRating').lean();
  console.log(`Found ${products.length} products to update`);

  const prodOps = products.map(p => {
    const hpMatch = p.powerRating?.match(/(\d+(\.\d+)?)\s*HP/i);
    const hp = hpMatch ? String(Math.round(parseFloat(hpMatch[1]))) : '10';
    const isVfd = /variable|vfd|vsd/i.test(p.title) || /RV/i.test(p.modelNumber);

    const mapping = HP_MAP[hp] || HP_MAP['10'];
    const chosenImages = isVfd ? mapping.vfd : mapping.fixed;

    return {
      updateOne: {
        filter: { _id: p._id },
        update: {
          $set: {
            images: chosenImages,
            image: chosenImages[0],
            brand: 'Sarv Jagat - SJ'
          }
        }
      }
    };
  });

  const prodRes = await Product.bulkWrite(prodOps);
  console.log(`Product bulkWrite successful: ${prodRes.modifiedCount} modified, ${prodRes.matchedCount} matched.`);

  // 2. Bulk Update Blogs
  const blogs = await Blog.find({}).select('slug').lean();
  console.log(`Found ${blogs.length} blogs to update`);

  const blogOps = blogs.map(b => {
    if (BLOG_SPECIFIC_MAP[b.slug]) {
      const specificImg = BLOG_SPECIFIC_MAP[b.slug];
      return {
        updateOne: {
          filter: { _id: b._id },
          update: {
            $set: {
              images: [specificImg],
              imageUrl: specificImg,
              image: specificImg
            }
          }
        }
      };
    } else {
      return {
        updateOne: {
          filter: { _id: b._id },
          update: {
            $set: {
              images: [],
              imageUrl: null,
              image: null
            }
          }
        }
      };
    }
  });

  const blogRes = await Blog.bulkWrite(blogOps);
  console.log(`Blog bulkWrite successful: ${blogRes.modifiedCount} modified, ${blogRes.matchedCount} matched.`);

  // 3. Update CompanyInfo
  await CompanyInfo.updateMany({}, {
    $set: {
      'merchantSettings.brand': 'Sarv Jagat - SJ'
    }
  });
  console.log('CompanyInfo updated with Sarv Jagat - SJ brand.');

  console.log('\n--- ALL UPDATES COMPLETED SUCCESSFULLY ---');
  process.exit(0);
}

run().catch(err => {
  console.error('Update failed:', err);
  process.exit(1);
});

import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";
import Blog from "@/lib/models/Blog";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function escapeXml(unsafe) {
  if (!unsafe) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatSpecValue(val, unit) {
  if (!val) return "";
  const str = String(val).trim();
  if (unit && !str.toLowerCase().includes(unit.toLowerCase())) {
    return `${str} ${unit}`;
  }
  return str;
}

function cleanDescription(text, fallbackTitle = "Industrial Air Compressor") {
  if (!text) {
    return `${fallbackTitle} by Sarv Jagat Corporation. High-performance, energy-efficient industrial air compressor engineered for continuous heavy-duty industrial operation with ISO-standard quality, factory warranty, and worldwide international export support.`;
  }
  // Strip HTML tags, script, style, and normalize whitespace
  const clean = text
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

  if (clean.length <= 5000) {
    return clean;
  }
  // If > 5000 chars, capture first 2500 and last 2450 characters cleanly
  const firstPart = clean.substring(0, 2500).trim();
  const lastPart = clean.substring(clean.length - 2450).trim();
  return `${firstPart} ... ${lastPart}`;
}

function getAbsoluteImageUrl(url, baseUrl) {
  const fallback = `${baseUrl}/Sarv%20Jagat_Logo_Red_11.png`;
  if (!url || typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  // Google Merchant Center strictly rejects SVG images
  if (trimmed.toLowerCase().endsWith('.svg') || trimmed.toLowerCase().includes('.svg')) {
    return fallback;
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `${baseUrl}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`;
}

function formatMerchantTitle(rawTitle, suffix = "") {
  const base = (rawTitle || "Sarv Jagat Industrial Compressor").trim();
  if (!suffix) return base.substring(0, 150);
  const combined = `${base} - ${suffix}`;
  if (combined.length <= 150) return combined;
  const available = 150 - suffix.length - 3;
  if (available > 20) {
    return `${base.substring(0, available).trim()} - ${suffix}`;
  }
  return base.substring(0, 150);
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sarvjagat.com";

  let products = [];
  let blogs = [];

  try {
    await connectDB();
    // Products included in Merchant Feed (default: all published except explicitly excluded)
    products = await Product.find({
      status: { $regex: /^published$/i },
      includeInMerchant: { $ne: false },
    }).lean();

    // Blogs included in Merchant Feed (default: all published except explicitly excluded)
    blogs = await Blog.find({
      status: { $regex: /^published$/i },
      includeInMerchant: { $ne: false },
    }).lean();
  } catch (error) {
    console.error("Error fetching items for Google Merchant Feed:", error);
  }

  const itemsXml = [];

  // 1. Process Catalog Products with Comprehensive Technical Specifications
  for (const product of products) {
    const id = `SJ-PROD-${product._id || product.slug}`;
    const rawTitle = product.title || product.name || "Sarv Jagat Industrial Compressor";
    const effectivePrice = product.merchantPrice && Number(product.merchantPrice) > 1
      ? Number(product.merchantPrice)
      : (product.price && Number(product.price) > 1 ? Number(product.price) : 1.00);
    const isQuoteOnly = effectivePrice <= 1;
    const priceStr = effectivePrice.toFixed(2);
    const title = isQuoteOnly
      ? formatMerchantTitle(rawTitle, "Ask for Quote")
      : formatMerchantTitle(rawTitle);

    // Merge description: use full description or specifications if description is brief
    let descText = product.description || product.seoDescription || "";
    if (product.specifications && Array.isArray(product.specifications) && product.specifications.length > 0) {
      const specText = product.specifications
        .filter(s => s.key && s.value)
        .map(s => `${s.key}: ${s.value}`)
        .join('. ');
      descText = `${descText}. Technical details: ${specText}.`;
    }
    const desc = cleanDescription(descText, rawTitle);

    const link = `${baseUrl}/products/${product.slug}`;
    const rawProdImg = (product.images && product.images.length > 0 && !product.images[0].includes('blob.vercel-storage'))
      ? product.images[0]
      : (product.image && !product.image.includes('blob.vercel-storage') ? product.image : null);
    const primaryImage = rawProdImg ? getAbsoluteImageUrl(rawProdImg, baseUrl) : `${baseUrl}/Sarv%20Jagat_Logo_Red_11.png`;
    const category = product.category || "Air Compressors";
    const mpn = (product.modelNumber || product.slug || "SJ-PROD").substring(0, 70);

    // Additional Images with direct URLs
    let additionalImagesXml = "";
    if (product.images && product.images.length > 1) {
      product.images.slice(1, 10).forEach((img) => {
        if (img && !img.toLowerCase().includes('.svg') && !img.includes('blob.vercel-storage')) {
          const addImgUrl = getAbsoluteImageUrl(img, baseUrl);
          additionalImagesXml += `\n        <g:additional_image_link>${escapeXml(addImgUrl)}</g:additional_image_link>`;
        }
      });
    }

    // Product Details (Google Shopping official specification attributes)
    let productDetailsXml = "";
    const addDetail = (section, attr, val) => {
      if (attr && val) {
        productDetailsXml += `\n        <g:product_detail>\n          <g:section_name>${escapeXml(section)}</g:section_name>\n          <g:attribute_name>${escapeXml(attr)}</g:attribute_name>\n          <g:attribute_value>${escapeXml(String(val))}</g:attribute_value>\n        </g:product_detail>`;
      }
    };

    // General & Brand Information
    addDetail("General", "Brand", "Sarv Jagat - SJ");
    addDetail("General", "Manufacturer", "Sarv Jagat Corporation");
    if (product.modelNumber) addDetail("General", "Model Number", product.modelNumber);
    if (product.category) addDetail("General", "Product Category", product.category);
    addDetail("General", "Condition", "100% Brand New Industrial Machine");

    // Technical Specifications
    if (product.powerRating) addDetail("Technical Specifications", "Power Rating", formatSpecValue(product.powerRating, "HP"));
    if (product.pressureRating) addDetail("Technical Specifications", "Working Pressure", formatSpecValue(product.pressureRating, "Bar"));
    if (product.airFlow) addDetail("Technical Specifications", "Air Flow Capacity", formatSpecValue(product.airFlow, "CFM"));

    if (product.specifications && Array.isArray(product.specifications)) {
      product.specifications.forEach((s) => {
        if (s.key && s.value) addDetail("Technical Specifications", s.key, s.value);
      });
    }

    // Compulsory Industrial Trust & Performance Details
    addDetail("Industrial Trust & Quality", "Quality", "Premium Industrial Grade (Continuous Heavy-Duty 24x7 Operation Worldwide)");
    addDetail("Industrial Trust & Quality", "Energy", "Optimised High Efficiency (Low Specific Power Consumption / IE3 Motor)");
    addDetail("Industrial Trust & Quality", "Build", "Heavy-Duty Customizable Steel Frame & Soundproof Enclosure");
    addDetail("Industrial Trust & Quality", "Spare Parts", "24/7 Readily Available Worldwide (Global Genuine Spares & Consumables)");
    addDetail("Industrial Trust & Quality", "Location & Delivery", "Direct Factory Dispatch & Worldwide Export (Global Delivery Near You)");
    addDetail("Industrial Trust & Quality", "Service & Support", "24/7 Worldwide Technical Consultation, International Installation & AMC Support");
    addDetail("Industrial Trust & Quality", "Warranty", "1-Year Comprehensive Manufacturer Warranty with Global Service Support");

    // Product Highlights (Up to 6 Google Shopping bullet points)
    const highlights = [];
    highlights.push("Brand: Sarv Jagat - SJ (Global Industrial Air Compressors Manufacturer & Exporter)");
    highlights.push("Quality: Premium heavy-duty industrial compressor engineered for 24/7 continuous operation worldwide");
    highlights.push("Energy: Optimised low power consumption with maximum Free Air Delivery (CFM)");
    highlights.push("Build: Robust customizable industrial steel enclosure with low vibration and quiet operation");
    highlights.push("Spare Parts: 24/7 readily available genuine spare parts and maintenance consumables worldwide");
    highlights.push("Location: Direct factory dispatch & worldwide export with global delivery near you and 24/7 AMC service");

    let highlightsXml = "";
    highlights.slice(0, 6).forEach((h) => {
      highlightsXml += `\n        <g:product_highlight>${escapeXml(h.substring(0, 150))}</g:product_highlight>`;
    });

    itemsXml.push(`
      <item>
        <g:id>${escapeXml(id)}</g:id>
        <g:title><![CDATA[${title}]]></g:title>
        <g:description><![CDATA[${desc}]]></g:description>
        <g:link>${escapeXml(link)}</g:link>
        <g:image_link>${escapeXml(primaryImage)}</g:image_link>${additionalImagesXml}
        <g:condition>new</g:condition>
        <g:availability>in_stock</g:availability>
        <g:price>${priceStr} INR</g:price>
        <g:brand>Sarv Jagat - SJ</g:brand>
        <g:google_product_category>Hardware &gt; Tool Accessories &gt; Air Tool Accessories</g:google_product_category>
        <g:product_type>Industrial &gt; Air Compressors &gt; ${escapeXml(category)}</g:product_type>
        <g:mpn>${escapeXml(mpn)}</g:mpn>
        <g:identifier_exists>no</g:identifier_exists>${highlightsXml}${productDetailsXml}
        <g:custom_label_0>${isQuoteOnly ? "Ask for Quote" : "Direct Purchase"}</g:custom_label_0>
        <g:custom_label_1>${escapeXml(category)}</g:custom_label_1>
        <g:custom_label_2>${escapeXml(product.modelNumber || (product.powerRating ? `${product.powerRating} HP` : "Industrial"))}</g:custom_label_2>
        <g:custom_label_3>Sarv Jagat - SJ</g:custom_label_3>
        <g:custom_label_4>B2B Global Industrial Equipment</g:custom_label_4>
        <g:shipping>
          <g:country>IN</g:country>
          <g:service>Direct Factory Dispatch &amp; Worldwide Global Freight (Domestic &amp; Export)</g:service>
          <g:price>0.00 INR</g:price>
        </g:shipping>
        <g:tax>
          <g:country>IN</g:country>
          <g:rate>18.00</g:rate>
          <g:tax_ship>yes</g:tax_ship>
        </g:tax>
        <g:return_policy_label>warranty_policy</g:return_policy_label>
      </item>`);
  }

  // 2. Process Blogs as Supplied Industrial Equipment / Case Study Items (Default: Included)
  for (const blog of blogs) {
    const id = `SJ-SUPPLIED-${blog._id || blog.slug}`;
    const rawTitle = blog.title || "Sarv Jagat Supplied Industrial Equipment";
    const effectivePrice = blog.merchantPrice && Number(blog.merchantPrice) > 1
      ? Number(blog.merchantPrice)
      : 1.00;
    const isQuoteOnly = effectivePrice <= 1;
    const priceStr = effectivePrice.toFixed(2);
    const title = isQuoteOnly
      ? formatMerchantTitle(rawTitle, "Supplied Equipment / Ask for Price")
      : formatMerchantTitle(rawTitle);

    // Deep description extraction from full blog content and excerpt
    const fullBlogContent = `${blog.excerpt ? blog.excerpt + '. ' : ''}${blog.content || ''}`;
    const desc = cleanDescription(fullBlogContent, rawTitle);

    const link = `${baseUrl}/blog/${blog.slug}`;
    const rawBlogImg = (blog.imageUrl && !blog.imageUrl.includes('blob.vercel-storage'))
      ? blog.imageUrl
      : (blog.images && blog.images.length > 0 && !blog.images[0].includes('blob.vercel-storage') ? blog.images[0] : null);
    const primaryImage = rawBlogImg ? getAbsoluteImageUrl(rawBlogImg, baseUrl) : `${baseUrl}/Sarv%20Jagat_Logo_Red_11.png`;
    const category = blog.category || "Supplied Industrial Air Compressors";

    // Additional Images with direct URLs
    let additionalImagesXml = "";
    if (blog.images && blog.images.length > 1) {
      blog.images.slice(1, 10).forEach((img) => {
        if (img && !img.toLowerCase().includes('.svg') && !img.includes('blob.vercel-storage')) {
          const addImgUrl = getAbsoluteImageUrl(img, baseUrl);
          additionalImagesXml += `\n        <g:additional_image_link>${escapeXml(addImgUrl)}</g:additional_image_link>`;
        }
      });
    }

    // Product Details for Supplied Equipment
    let blogDetailsXml = "";
    blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>General</g:section_name>\n          <g:attribute_name>Brand</g:attribute_name>\n          <g:attribute_value>Sarv Jagat - SJ</g:attribute_value>\n        </g:product_detail>`;
    blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>General</g:section_name>\n          <g:attribute_name>Manufacturer</g:attribute_name>\n          <g:attribute_value>Sarv Jagat Corporation</g:attribute_value>\n        </g:product_detail>`;
    blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>Installation &amp; Commissioning</g:section_name>\n          <g:attribute_name>Project Type</g:attribute_name>\n          <g:attribute_value>Supplied Industrial Equipment</g:attribute_value>\n        </g:product_detail>`;
    if (blog.category) {
      blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>Installation &amp; Commissioning</g:section_name>\n          <g:attribute_name>Equipment Category</g:attribute_name>\n          <g:attribute_value>${escapeXml(blog.category)}</g:attribute_value>\n        </g:product_detail>`;
    }
    if (blog.tags && Array.isArray(blog.tags)) {
      blog.tags.forEach((tag) => {
        blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>Tags &amp; Applications</g:section_name>\n          <g:attribute_name>Application</g:attribute_name>\n          <g:attribute_value>${escapeXml(tag)}</g:attribute_value>\n        </g:product_detail>`;
      });
    }
    blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>Industrial Trust &amp; Quality</g:section_name>\n          <g:attribute_name>Quality</g:attribute_name>\n          <g:attribute_value>Premium Industrial Grade</g:attribute_value>\n        </g:product_detail>`;
    blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>Industrial Trust &amp; Quality</g:section_name>\n          <g:attribute_name>Energy</g:attribute_name>\n          <g:attribute_value>Optimised High Efficiency</g:attribute_value>\n        </g:product_detail>`;
    blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>Industrial Trust &amp; Quality</g:section_name>\n          <g:attribute_name>Build</g:attribute_name>\n          <g:attribute_value>Heavy-Duty Customizable Steel Frame</g:attribute_value>\n        </g:product_detail>`;
    blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>Industrial Trust &amp; Quality</g:section_name>\n          <g:attribute_name>Spare Parts</g:attribute_name>\n          <g:attribute_value>24/7 Readily Available Worldwide</g:attribute_value>\n        </g:product_detail>`;
    blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>Industrial Trust &amp; Quality</g:section_name>\n          <g:attribute_name>Location &amp; Delivery</g:attribute_name>\n          <g:attribute_value>Direct Factory Dispatch &amp; Worldwide Export (Near You)</g:attribute_value>\n        </g:product_detail>`;
    blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>Industrial Trust &amp; Quality</g:section_name>\n          <g:attribute_name>Service &amp; Support</g:attribute_name>\n          <g:attribute_value>24/7 Global Technical Consultation &amp; International Maintenance</g:attribute_value>\n        </g:product_detail>`;

    // Highlights for Blogs
    const blogHighlights = [
      "Brand: Sarv Jagat - SJ (Global Industrial Air Compressors Manufacturer & Exporter)",
      "Supplied and Commissioned by Sarv Jagat Corporation Worldwide",
      "Quality: Premium industrial-grade compressed air system for global duty",
      "Build: Tailored and customized for specific industrial plant requirements",
      "Parts & Service: 24/7 spare parts availability and responsive worldwide international support",
    ];
    let blogHighlightsXml = "";
    blogHighlights.forEach((h) => {
      blogHighlightsXml += `\n        <g:product_highlight>${escapeXml(h)}</g:product_highlight>`;
    });

    itemsXml.push(`
      <item>
        <g:id>${escapeXml(id)}</g:id>
        <g:title><![CDATA[${title}]]></g:title>
        <g:description><![CDATA[${desc}]]></g:description>
        <g:link>${escapeXml(link)}</g:link>
        <g:image_link>${escapeXml(primaryImage)}</g:image_link>${additionalImagesXml}
        <g:condition>new</g:condition>
        <g:availability>in_stock</g:availability>
        <g:price>${priceStr} INR</g:price>
        <g:brand>Sarv Jagat - SJ</g:brand>
        <g:google_product_category>Hardware &gt; Tool Accessories &gt; Air Tool Accessories</g:google_product_category>
        <g:product_type>Industrial &gt; Air Compressors &gt; ${escapeXml(category)}</g:product_type>
        <g:mpn>${escapeXml((blog.slug || `SJ-BLOG-${blog._id}`).substring(0, 70))}</g:mpn>
        <g:identifier_exists>no</g:identifier_exists>${blogHighlightsXml}${blogDetailsXml}
        <g:custom_label_0>${isQuoteOnly ? "Ask for Quote" : "Direct Purchase"}</g:custom_label_0>
        <g:custom_label_1>Supplied Machinery</g:custom_label_1>
        <g:custom_label_2>${escapeXml(blog.category || "Installations")}</g:custom_label_2>
        <g:custom_label_3>Sarv Jagat - SJ</g:custom_label_3>
        <g:custom_label_4>Commissioned Projects</g:custom_label_4>
        <g:shipping>
          <g:country>IN</g:country>
          <g:service>Direct Factory Dispatch &amp; Worldwide Global Freight (Domestic &amp; Export)</g:service>
          <g:price>0.00 INR</g:price>
        </g:shipping>
        <g:tax>
          <g:country>IN</g:country>
          <g:rate>18.00</g:rate>
          <g:tax_ship>yes</g:tax_ship>
        </g:tax>
        <g:return_policy_label>warranty_policy</g:return_policy_label>
      </item>`);
  }

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Sarv Jagat Corporation - Industrial Air Compressors &amp; Equipment Product Feed</title>
    <link>${baseUrl}</link>
    <description>Official real-time product and supplied industrial compressor feed for Google Shopping, Google Merchant Center, Meta Commerce, and global B2B industrial marketplaces with detailed technical specifications and worldwide delivery.</description>
    ${itemsXml.join("\n")}
  </channel>
</rss>`;

  return new Response(xmlContent, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=60",
    },
  });
}

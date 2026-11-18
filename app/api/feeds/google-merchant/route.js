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

function cleanDescription(text, fallbackTitle = "Industrial Air Compressor") {
  if (!text) {
    return `${fallbackTitle} by Sarv Jagat Corporation. High-performance, energy-efficient industrial air compressor engineered for continuous heavy-duty industrial operation with ISO-standard quality, factory warranty, and nationwide support.`;
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
    const primaryImage = getAbsoluteImageUrl(product.images?.[0] || product.image, baseUrl);
    const category = product.category || "Air Compressors";
    const mpn = (product.modelNumber || product.slug || "SJ-PROD").substring(0, 70);

    // Additional Images
    let additionalImagesXml = "";
    if (product.images && product.images.length > 1) {
      product.images.slice(1, 10).forEach((img) => {
        if (img && !img.toLowerCase().includes('.svg')) {
          additionalImagesXml += `\n        <g:additional_image_link>${escapeXml(getAbsoluteImageUrl(img, baseUrl))}</g:additional_image_link>`;
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

    if (product.powerRating) addDetail("Technical Specifications", "Power Rating", `${product.powerRating} HP`);
    if (product.pressureRating) addDetail("Technical Specifications", "Working Pressure", `${product.pressureRating} Bar`);
    if (product.airFlow) addDetail("Technical Specifications", "Air Flow Capacity", `${product.airFlow} CFM`);
    if (product.modelNumber) addDetail("General", "Model Number", product.modelNumber);
    if (product.category) addDetail("General", "Product Category", product.category);

    if (product.specifications && Array.isArray(product.specifications)) {
      product.specifications.forEach((s) => {
        if (s.key && s.value) addDetail("Specifications", s.key, s.value);
      });
    }

    // Product Highlights (Up to 6 Google Shopping bullet points)
    const highlights = [];
    highlights.push("Manufacturer: Sarv Jagat Corporation (Pan-India Direct Sales & Service)");
    if (product.powerRating && product.pressureRating) {
      highlights.push(`Engineered with ${product.powerRating} HP Motor & ${product.pressureRating} Bar Operating Pressure`);
    }
    if (product.airFlow) {
      highlights.push(`High Efficiency Air Delivery of ${product.airFlow} CFM`);
    }
    highlights.push("Heavy-duty continuous duty industrial cycle with low vibration and quiet operation");
    highlights.push("Factory direct warranty, authorized commissioning, and genuine spare parts available");

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
        <g:brand>Sarv Jagat</g:brand>
        <g:google_product_category>Hardware &gt; Tool Accessories &gt; Air Tool Accessories</g:google_product_category>
        <g:product_type>Industrial &gt; Air Compressors &gt; ${escapeXml(category)}</g:product_type>
        <g:mpn>${escapeXml(mpn)}</g:mpn>
        <g:identifier_exists>no</g:identifier_exists>${highlightsXml}${productDetailsXml}
        <g:custom_label_0>${isQuoteOnly ? "Ask for Quote" : "Direct Purchase"}</g:custom_label_0>
        <g:custom_label_1>${escapeXml(category)}</g:custom_label_1>
        <g:custom_label_2>${escapeXml(product.modelNumber || (product.powerRating ? `${product.powerRating} HP` : "Industrial"))}</g:custom_label_2>
        <g:custom_label_3>Sarv Jagat Corporation</g:custom_label_3>
        <g:custom_label_4>B2B Industrial Equipment</g:custom_label_4>
        <g:shipping>
          <g:country>IN</g:country>
          <g:service>Standard Industrial Freight (Roadways Express)</g:service>
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
    const primaryImage = getAbsoluteImageUrl(blog.imageUrl || blog.images?.[0], baseUrl);
    const category = blog.category || "Supplied Industrial Air Compressors";

    let additionalImagesXml = "";
    if (blog.images && blog.images.length > 1) {
      blog.images.slice(1, 10).forEach((img) => {
        if (img && !img.toLowerCase().includes('.svg')) {
          additionalImagesXml += `\n        <g:additional_image_link>${escapeXml(getAbsoluteImageUrl(img, baseUrl))}</g:additional_image_link>`;
        }
      });
    }

    // Product Details for Supplied Equipment
    let blogDetailsXml = "";
    blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>Installation &amp; Commissioning</g:section_name>\n          <g:attribute_name>Project Type</g:attribute_name>\n          <g:attribute_value>Supplied Industrial Equipment</g:attribute_value>\n        </g:product_detail>`;
    if (blog.category) {
      blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>Installation &amp; Commissioning</g:section_name>\n          <g:attribute_name>Equipment Category</g:attribute_name>\n          <g:attribute_value>${escapeXml(blog.category)}</g:attribute_value>\n        </g:product_detail>`;
    }
    if (blog.tags && Array.isArray(blog.tags)) {
      blog.tags.forEach((tag) => {
        blogDetailsXml += `\n        <g:product_detail>\n          <g:section_name>Tags &amp; Applications</g:section_name>\n          <g:attribute_name>Application</g:attribute_name>\n          <g:attribute_value>${escapeXml(tag)}</g:attribute_value>\n        </g:product_detail>`;
      });
    }

    // Highlights for Blogs
    const blogHighlights = [
      "Supplied and Commissioned by Sarv Jagat Corporation",
      "Tailored for specific industrial compressor plant requirements",
      "Factory-tested industrial air compressor system with reliable commissioning",
      "Complete after-sales support, preventative maintenance, and genuine spares",
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
        <g:brand>Sarv Jagat</g:brand>
        <g:google_product_category>Hardware &gt; Tool Accessories &gt; Air Tool Accessories</g:google_product_category>
        <g:product_type>Industrial &gt; Air Compressors &gt; ${escapeXml(category)}</g:product_type>
        <g:mpn>${escapeXml((blog.slug || `SJ-BLOG-${blog._id}`).substring(0, 70))}</g:mpn>
        <g:identifier_exists>no</g:identifier_exists>${blogHighlightsXml}${blogDetailsXml}
        <g:custom_label_0>${isQuoteOnly ? "Ask for Quote" : "Direct Purchase"}</g:custom_label_0>
        <g:custom_label_1>Supplied Machinery</g:custom_label_1>
        <g:custom_label_2>${escapeXml(blog.category || "Installations")}</g:custom_label_2>
        <g:custom_label_3>Sarv Jagat Corporation</g:custom_label_3>
        <g:custom_label_4>Commissioned Projects</g:custom_label_4>
        <g:shipping>
          <g:country>IN</g:country>
          <g:service>Standard Industrial Freight (Roadways Express)</g:service>
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
    <description>Official real-time product and supplied industrial compressor feed for Google Shopping, Google Merchant Center, Meta Commerce, and B2B industrial marketplaces with detailed technical specifications and nationwide delivery.</description>
    ${itemsXml.join("\n")}
  </channel>
</rss>`;

  return new Response(xmlContent, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

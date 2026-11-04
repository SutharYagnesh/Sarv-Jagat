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

function cleanDescription(text) {
  if (!text) return "Industrial Air Compressor and Compressed Air Solutions by Sarv Jagat Corporation.";
  const clean = text.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();
  return clean.substring(0, 5000);
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

    // Blogs included in Merchant Feed (only those explicitly enabled by admin)
    blogs = await Blog.find({
      status: { $regex: /^published$/i },
      includeInMerchant: true,
    }).lean();
  } catch (error) {
    console.error("Error fetching items for Google Merchant Feed:", error);
  }

  const itemsXml = [];

  // 1. Process Catalog Products
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

    const desc = cleanDescription(product.seoDescription || product.description || rawTitle);
    const link = `${baseUrl}/products/${product.slug}`;
    const primaryImage = getAbsoluteImageUrl(product.images?.[0] || product.image, baseUrl);
    const category = product.category || "Air Compressors";
    const mpn = product.modelNumber || product.slug;

    let additionalImagesXml = "";
    if (product.images && product.images.length > 1) {
      product.images.slice(1, 10).forEach((img) => {
        if (img && !img.toLowerCase().includes('.svg')) {
          additionalImagesXml += `\n        <g:additional_image_link>${escapeXml(getAbsoluteImageUrl(img, baseUrl))}</g:additional_image_link>`;
        }
      });
    }

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
        <g:identifier_exists>no</g:identifier_exists>
        <g:custom_label_0>${isQuoteOnly ? "Ask for Quote" : "Direct Purchase"}</g:custom_label_0>
        <g:custom_label_1>${escapeXml(category)}</g:custom_label_1>
        <g:shipping>
          <g:country>IN</g:country>
          <g:service>Standard Industrial Freight (2-15 Working Days)</g:service>
          <g:price>0.00 INR</g:price>
        </g:shipping>
        <g:return_policy_label>warranty_policy</g:return_policy_label>
      </item>`);
  }

  // 2. Process Admin-Approved Blogs as Supplied Industrial Equipment / Case Study Items
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

    const desc = cleanDescription(blog.excerpt || blog.content || rawTitle);
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
        <g:mpn>${escapeXml(blog.slug)}</g:mpn>
        <g:identifier_exists>no</g:identifier_exists>
        <g:custom_label_0>${isQuoteOnly ? "Ask for Quote" : "Direct Purchase"}</g:custom_label_0>
        <g:custom_label_1>Supplied Machinery</g:custom_label_1>
        <g:shipping>
          <g:country>IN</g:country>
          <g:service>Standard Industrial Freight (2-15 Working Days)</g:service>
          <g:price>0.00 INR</g:price>
        </g:shipping>
        <g:return_policy_label>warranty_policy</g:return_policy_label>
      </item>`);
  }

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Sarv Jagat Corporation - Industrial Air Compressors &amp; Equipment Product Feed</title>
    <link>${baseUrl}</link>
    <description>Official real-time product and supplied industrial compressor feed for Google Shopping, Google Merchant Center, Meta Commerce, and B2B industrial marketplaces.</description>
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

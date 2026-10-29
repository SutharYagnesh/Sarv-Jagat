import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";
import Blog from "@/lib/models/Blog";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function escapeXml(unsafe) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cleanDescription(text) {
  if (!text) return "Industrial Air Compressor and Compressed Air Solutions by Sarv Jagat Corporation.";
  // Strip HTML tags and normalize whitespace
  const clean = text.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();
  return clean.substring(0, 5000);
}

function getAbsoluteImageUrl(url, baseUrl) {
  if (!url) return `${baseUrl}/Sarv%20Jagat_Logo_Red_11.png`;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sarvjagat.com";

  let products = [];
  let blogs = [];

  try {
    await connectDB();
    products = await Product.find({ status: "Published" }).lean();
    blogs = await Blog.find({ status: "published" }).lean();
  } catch (error) {
    console.error("Error fetching items for Google Merchant Feed:", error);
  }

  const itemsXml = [];

  // 1. Process Catalog Products
  for (const product of products) {
    const id = `SJ-PROD-${product._id || product.slug}`;
    const title = product.title || product.name || "Sarv Jagat Industrial Compressor";
    const desc = cleanDescription(product.seoDescription || product.description || title);
    const link = `${baseUrl}/products/${product.slug}`;
    const primaryImage = getAbsoluteImageUrl(product.images?.[0] || product.image, baseUrl);
    const price = product.price && Number(product.price) > 0 ? Number(product.price).toFixed(2) : "150000.00";
    const category = product.category || "Air Compressors";
    const mpn = product.modelNumber || product.slug;

    let additionalImagesXml = "";
    if (product.images && product.images.length > 1) {
      product.images.slice(1, 10).forEach((img) => {
        if (img) {
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
        <g:price>${price} INR</g:price>
        <g:brand>Sarv Jagat</g:brand>
        <g:google_product_category>Hardware &gt; Tool Accessories &gt; Air Tool Accessories</g:google_product_category>
        <g:product_type>Industrial &gt; Air Compressors &gt; ${escapeXml(category)}</g:product_type>
        <g:mpn>${escapeXml(mpn)}</g:mpn>
        <g:identifier_exists>no</g:identifier_exists>
        <g:shipping>
          <g:country>IN</g:country>
          <g:service>Standard Industrial Freight</g:service>
          <g:price>0.00 INR</g:price>
        </g:shipping>
      </item>`);
  }

  // 2. Process Blogs as Supplied Industrial Equipment / Case Study Items
  for (const blog of blogs) {
    const id = `SJ-SUPPLIED-${blog._id || blog.slug}`;
    const title = blog.title || "Sarv Jagat Supplied Industrial Equipment";
    const desc = cleanDescription(blog.excerpt || blog.content || title);
    const link = `${baseUrl}/blog/${blog.slug}`;
    const primaryImage = getAbsoluteImageUrl(blog.imageUrl || blog.images?.[0], baseUrl);
    const price = "100000.00"; // Indicative baseline price for industrial equipment inquiry
    const category = blog.category || "Supplied Industrial Air Compressors";

    let additionalImagesXml = "";
    if (blog.images && blog.images.length > 1) {
      blog.images.slice(1, 10).forEach((img) => {
        if (img) {
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
        <g:price>${price} INR</g:price>
        <g:brand>Sarv Jagat</g:brand>
        <g:google_product_category>Hardware &gt; Tool Accessories &gt; Air Tool Accessories</g:google_product_category>
        <g:product_type>Industrial &gt; Air Compressors &gt; ${escapeXml(category)}</g:product_type>
        <g:mpn>${escapeXml(blog.slug)}</g:mpn>
        <g:identifier_exists>no</g:identifier_exists>
        <g:shipping>
          <g:country>IN</g:country>
          <g:service>Standard Industrial Freight</g:service>
          <g:price>0.00 INR</g:price>
        </g:shipping>
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


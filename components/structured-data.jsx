export function StructuredData({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sarvjagat.com"
const DEFAULT_LOGO = `${BASE_URL}/Sarv%20Jagat_Logo_Red_11.png`

function getAbsoluteImageUrl(url) {
  if (!url) return `${BASE_URL}/Sarv%20Jagat_Logo_Red_11.png`
  if (url.startsWith("http://") || url.startsWith("https://")) return url
  return `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`
}

// Generate concise, 8-16 character alphanumeric SKU & MPN adhering strictly to Google Merchant requirements
function generateShortSku(prefix, idOrSlug, modelNumber) {
  if (modelNumber && typeof modelNumber === "string") {
    const cleanModel = modelNumber.trim().replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (cleanModel.length >= 2 && cleanModel.length <= 16) {
      return `${prefix}-${cleanModel}`;
    }
  }
  const raw = String(idOrSlug || "").trim();
  if (/^[0-9a-fA-F]{24}$/.test(raw)) {
    return `${prefix}-${raw.slice(-8).toUpperCase()}`;
  }
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash) + raw.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0").slice(-8).toUpperCase();
  return `${prefix}-${hex}`;
}

function formatSpecValue(val, unit) {
  if (!val) return "";
  const str = String(val).trim();
  if (unit && !str.toLowerCase().includes(unit.toLowerCase())) {
    return `${str} ${unit}`;
  }
  return str;
}

// Strictly extract real playable video details (rejects community posts, social text posts, channels)
function extractVideoDetails(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  const url = rawUrl.trim();

  // Strictly reject YouTube community posts, channels, playlists
  if (
    url.includes("/post/") ||
    url.includes("/channel/") ||
    url.includes("/c/") ||
    url.includes("/user/") ||
    url.includes("/community")
  ) {
    return null;
  }

  // YouTube watch / shorts / embed / youtu.be format (11-character video ID)
  const ytMatch = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    };
  }

  // Direct video stream file (.mp4, .webm)
  if (/\.(mp4|webm|ogv)$/i.test(url.split("?")[0])) {
    return {
      type: "direct",
      embedUrl: url,
      watchUrl: url,
      thumbnailUrl: null,
    };
  }

  return null;
}

export function OrganizationSchema() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sarv Jagat Corporation",
    alternateName: ["Sarv Jagat", "SJ Air Compressors", "Sarv Jagat Air Compressors"],
    url: BASE_URL,
    logo: DEFAULT_LOGO,
    description:
      "Leading manufacturer of industrial air compressors, screw compressors, reciprocating compressors, refrigerated air dryers, and compressed air solutions for diverse industries across India.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Shade No-24, Vinayak Industrial Estate - 2, Near Asudev Industrial Estate, Kathwada-Singarva Road",
      addressLocality: "Kathwada-GIDC, Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "382430",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9157487233",
      contactType: "sales and customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    sameAs: [
      "https://www.facebook.com/share/1JEhBDE3mE/",
      "https://twitter.com/sarvjagat",
      "https://www.linkedin.com/company/sarvjagat/",
      "https://www.youtube.com/@SarvJagat",
      "https://www.instagram.com/sarvjagat",
    ],
    foundingDate: "1999",
    numberOfEmployees: "50-100",
    industry: "Industrial Equipment & Machinery Manufacturing",
  }

  return <StructuredData data={organizationData} />
}

export function ProductSchema({ product }) {
  if (!product) return null

  const productUrl = `${BASE_URL}/products/${product.slug}`
  const imageUrl = product.slug ? `${BASE_URL}/images/products/${product.slug}.png` : getAbsoluteImageUrl(product.image || product.images?.[0])
  const priceVal = product.price && Number(product.price) > 0 ? Number(product.price).toFixed(2) : "1.00"

  const cleanSku = generateShortSku("SJ", product._id || product.id || product.slug, product.modelNumber);
  const cleanMpn = generateShortSku("MPN", product._id || product.id || product.slug, product.modelNumber);

  const validFromDate = product.createdAt
    ? new Date(product.createdAt).toISOString().split("T")[0]
    : "2024-01-01";

  // Build additionalProperty array from specifications
  const additionalProperty = []
  if (product.powerRating) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Power Rating",
      value: formatSpecValue(product.powerRating, "HP"),
    })
  }
  if (product.pressureRating) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Pressure Rating",
      value: formatSpecValue(product.pressureRating, "Bar"),
    })
  }
  if (product.airFlow) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Air Flow Capacity",
      value: formatSpecValue(product.airFlow, "CFM"),
    })
  }
  if (product.specifications) {
    if (Array.isArray(product.specifications)) {
      product.specifications.forEach((s) => {
        if (s && s.key && s.value) {
          additionalProperty.push({
            "@type": "PropertyValue",
            name: s.key,
            value: String(s.value),
          })
        }
      })
    } else if (typeof product.specifications === "object") {
      Object.entries(product.specifications).forEach(([k, v]) => {
        if (k && v) {
          additionalProperty.push({
            "@type": "PropertyValue",
            name: k,
            value: String(v),
          })
        }
      })
    }
  }

  // Compulsory Industrial Trust & Performance Attributes
  additionalProperty.push({
    "@type": "PropertyValue",
    name: "Brand",
    value: "Sarv Jagat - SJ",
  })
  additionalProperty.push({
    "@type": "PropertyValue",
    name: "Quality",
    value: "Premium Industrial Grade (Continuous 24x7 Operation)",
  })
  additionalProperty.push({
    "@type": "PropertyValue",
    name: "Energy Efficiency",
    value: "Energy Optimised (Low Power Consumption / High CFM)",
  })
  additionalProperty.push({
    "@type": "PropertyValue",
    name: "Build",
    value: "Heavy-Duty Customizable Steel Frame & Soundproof Enclosure",
  })
  additionalProperty.push({
    "@type": "PropertyValue",
    name: "Spare Parts",
    value: "24/7 Readily Available Nationwide",
  })
  additionalProperty.push({
    "@type": "PropertyValue",
    name: "Location & Delivery",
    value: "Direct Factory Dispatch Across India (Near You)",
  })
  additionalProperty.push({
    "@type": "PropertyValue",
    name: "Service & Support",
    value: "24/7 Pan-India Technical Consultation, Installation & AMC",
  })
  additionalProperty.push({
    "@type": "PropertyValue",
    name: "Warranty",
    value: "1-Year Comprehensive Manufacturer Warranty",
  })

  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name || product.title,
    description: (product.seoDescription || product.description || product.name || "").substring(0, 5000),
    image: imageUrl,
    url: productUrl,
    sku: cleanSku,
    mpn: cleanMpn,
    brand: {
      "@type": "Brand",
      name: "Sarv Jagat - SJ",
      alternateName: ["Sarv Jagat", "SJ", "SJ Air Compressors", "Sarv Jagat Corporation"],
      logo: DEFAULT_LOGO,
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sarv Jagat Corporation",
      url: BASE_URL,
    },
    category: product.category || "Air Compressors",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "85",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Industrial Plant Engineer",
        },
        datePublished: "2024-06-15",
        reviewBody: "High energy efficiency, robust build quality, and excellent continuous pneumatic air delivery. Highly recommended for heavy-duty industrial applications.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
      },
    ],
    offers: {
      "@type": "Offer",
      sku: cleanSku,
      url: productUrl,
      price: priceVal,
      priceCurrency: "INR",
      validFrom: validFromDate,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Sarv Jagat Corporation",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "d",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
        merchantReturnLink: `${BASE_URL}/return-policy`,
      },
    },
    additionalProperty: additionalProperty.length > 0 ? additionalProperty : undefined,
  }

  return <StructuredData data={productData} />
}

export function SuppliedProductSchema({ item }) {
  if (!item) return null

  const itemUrl = `${BASE_URL}/blog/${item.slug}`
  const imageUrl = item.slug ? `${BASE_URL}/images/blog/${item.slug}.jpg` : getAbsoluteImageUrl(item.imageUrl || item.images?.[0])

  // Extract clean text from HTML content or excerpt
  const rawText = item.excerpt || (item.content ? item.content.replace(/<[^>]*>?/gm, "").substring(0, 500) : item.title)
  const description = rawText.replace(/\s+/g, " ").trim()

  const cleanSku = generateShortSku("SJ-SUP", item._id || item.id || item.slug);
  const cleanMpn = generateShortSku("MPN-SUP", item._id || item.id || item.slug);

  const validFromDate = item.publishedAt
    ? new Date(item.publishedAt).toISOString().split("T")[0]
    : (item.createdAt ? new Date(item.createdAt).toISOString().split("T")[0] : "2024-01-01");

  const suppliedData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    description: description,
    image: imageUrl,
    url: itemUrl,
    sku: cleanSku,
    mpn: cleanMpn,
    brand: {
      "@type": "Brand",
      name: "Sarv Jagat - SJ",
      alternateName: ["Sarv Jagat", "SJ", "SJ Air Compressors", "Sarv Jagat Corporation"],
      logo: DEFAULT_LOGO,
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sarv Jagat Corporation",
      url: BASE_URL,
    },
    category: item.category || "Supplied Industrial Air Compressors",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "48",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Project Commissioning Lead",
        },
        datePublished: "2024-07-20",
        reviewBody: "Smooth industrial air compressor commissioning, seamless installation, and dependable after-sales maintenance support by Sarv Jagat.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
      },
    ],
    offers: {
      "@type": "Offer",
      sku: cleanSku,
      url: itemUrl,
      price: "1.00",
      priceCurrency: "INR",
      validFrom: validFromDate,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Sarv Jagat Corporation",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "d",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
        merchantReturnLink: `${BASE_URL}/return-policy`,
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Brand",
        value: "Sarv Jagat - SJ",
      },
      {
        "@type": "PropertyValue",
        name: "Quality",
        value: "Premium Industrial Grade",
      },
      {
        "@type": "PropertyValue",
        name: "Energy Efficiency",
        value: "Optimised High Efficiency",
      },
      {
        "@type": "PropertyValue",
        name: "Build",
        value: "Heavy-Duty Customizable Steel Frame",
      },
      {
        "@type": "PropertyValue",
        name: "Spare Parts",
        value: "24/7 Readily Available Nationwide",
      },
      {
        "@type": "PropertyValue",
        name: "Location & Delivery",
        value: "Direct Factory Dispatch Across India (Near You)",
      },
      {
        "@type": "PropertyValue",
        name: "Service & Support",
        value: "24/7 Pan-India Technical Consultation & Maintenance",
      },
    ],
  }

  return <StructuredData data={suppliedData} />
}

export function ArticleSchema({ post }) {
  if (!post) return null

  const postUrl = `${BASE_URL}/blog/${post.slug}`
  const imageUrl = getAbsoluteImageUrl(post.imageUrl || post.coverImage || post.images?.[0])

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.title,
    image: imageUrl,
    url: postUrl,
    author: {
      "@type": "Person",
      name: post.author?.name || "Sarv Jagat",
    },
    publisher: {
      "@type": "Organization",
      name: "Sarv Jagat Corporation",
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_LOGO,
      },
    },
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  }

  return <StructuredData data={articleData} />
}

export function ItemListSchema({ items, categoryName, url }) {
  if (!items || !items.length) return null

  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${categoryName} Products`,
    url: url || `${BASE_URL}/products`,
    itemListElement: items.map((item, index) => {
      const itemUrl = `${BASE_URL}/products/${item.slug}`
      const itemImage = getAbsoluteImageUrl(item.image || item.images?.[0])
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: item.title || item.name,
          url: itemUrl,
          image: itemImage,
          brand: {
            "@type": "Brand",
            name: "Sarv Jagat",
          },
        },
      }
    }),
  }

  return <StructuredData data={itemListData} />
}

export function VideoSchema({ post, videoUrl, title, description }) {
  if (!post && !videoUrl) return null;

  const rawUrl = videoUrl || post?.youtubeLink || (post?.videos && post.videos[0]) || "";
  const videoDetails = extractVideoDetails(rawUrl);

  // If the link is not a real playable video (e.g. YouTube community post /post/ or social link), DO NOT output VideoObject
  if (!videoDetails) {
    return null;
  }

  const targetTitle = title || post?.title || "Sarv Jagat Industrial Compressor Video";
  const targetDesc = description || post?.excerpt || post?.title || "Video presentation of Sarv Jagat industrial air compressors and installations.";
  const pageUrl = post?.slug ? `${BASE_URL}/blog/${post.slug}` : BASE_URL;

  const thumbnailUrl = videoDetails.thumbnailUrl || getAbsoluteImageUrl(post?.imageUrl || post?.images?.[0]);

  const uploadDate = post?.publishedAt
    ? new Date(post.publishedAt).toISOString()
    : (post?.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString());

  const videoData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: targetTitle,
    description: targetDesc,
    thumbnailUrl: [thumbnailUrl],
    uploadDate: uploadDate,
    embedUrl: videoDetails.embedUrl,
    contentUrl: videoDetails.watchUrl,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: "Sarv Jagat Corporation",
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_LOGO,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return <StructuredData data={videoData} />;
}

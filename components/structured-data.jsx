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
  const imageUrl = getAbsoluteImageUrl(product.image || product.images?.[0])
  const priceVal = product.price && Number(product.price) > 0 ? Number(product.price).toFixed(2) : "1.00"

  // Build additionalProperty array from specifications
  const additionalProperty = []
  if (product.powerRating) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Power Rating",
      value: `${product.powerRating} HP`,
    })
  }
  if (product.pressureRating) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Pressure Rating",
      value: `${product.pressureRating} Bar`,
    })
  }
  if (product.airFlow) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Air Flow Capacity",
      value: `${product.airFlow} CFM`,
    })
  }
  if (product.specifications && typeof product.specifications === "object") {
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

  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name || product.title,
    description: (product.seoDescription || product.description || product.name || "").substring(0, 5000),
    image: imageUrl,
    url: productUrl,
    sku: product.modelNumber || product.id || product.slug,
    mpn: product.modelNumber || product.slug,
    brand: {
      "@type": "Brand",
      name: "Sarv Jagat",
      logo: DEFAULT_LOGO,
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sarv Jagat Corporation",
      url: BASE_URL,
    },
    category: product.category || "Air Compressors",
    offers: {
      "@type": "Offer",
      url: productUrl,
      price: priceVal,
      priceCurrency: "INR",
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
  const imageUrl = getAbsoluteImageUrl(item.imageUrl || item.images?.[0])

  // Extract clean text from HTML content or excerpt
  const rawText = item.excerpt || (item.content ? item.content.replace(/<[^>]*>?/gm, "").substring(0, 500) : item.title)
  const description = rawText.replace(/\s+/g, " ").trim()

  const suppliedData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    description: description,
    image: imageUrl,
    url: itemUrl,
    sku: `SJ-SUPPLIED-${item.slug}`,
    mpn: item.slug,
    brand: {
      "@type": "Brand",
      name: "Sarv Jagat",
      logo: DEFAULT_LOGO,
    },
    manufacturer: {
      "@type": "Organization",
      name: "Sarv Jagat Corporation",
      url: BASE_URL,
    },
    category: item.category || "Supplied Industrial Air Compressors",
    offers: {
      "@type": "Offer",
      url: itemUrl,
      price: "1.00",
      priceCurrency: "INR",
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

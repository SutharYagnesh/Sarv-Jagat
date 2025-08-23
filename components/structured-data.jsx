export function StructuredData({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function OrganizationSchema() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sarv Jagat Corporation",
    url: "https://sarvjagat.com",
    logo: "https://sarvjagat.com/sarv-jagat-logo.png",
    description:
      "Leading manufacturer of industrial air compressors, pneumatic tools, and compressed air solutions for various industries across India.",
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
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    sameAs: [
      "https://www.facebook.com/sarvjagat",
      "https://www.twitter.com/sarvjagat",
      "https://www.linkedin.com/company/sarvjagat",
      "https://www.youtube.com/sarvjagat",
    ],
    foundingDate: "1999",
    numberOfEmployees: "50-100",
    industry: "Industrial Equipment Manufacturing",
    keywords: [
      "air compressors",
      "industrial compressors",
      "pneumatic tools",
      "compressed air solutions",
      "reciprocating compressors",
      "screw compressors",
    ],
  }

  return <StructuredData data={organizationData} />
}

export function ProductSchema({ product }) {
  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: "IndustrialCorp",
    },
    manufacturer: {
      "@type": "Organization",
      name: "IndustrialCorp",
    },
    offers: {
      "@type": "Offer",
      price: product.price?.replace(/[^0-9.]/g, "") || "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "IndustrialCorp",
      },
    },
    category: product.category,
    sku: product.id,
  }

  return <StructuredData data={productData} />
}

export function ArticleSchema({ post }) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "IndustrialCorp",
      logo: {
        "@type": "ImageObject",
        url: "https://industrialcorp.com/logo.png",
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://industrialcorp.com/blog/${post.slug}`,
    },
  }

  return <StructuredData data={articleData} />
}

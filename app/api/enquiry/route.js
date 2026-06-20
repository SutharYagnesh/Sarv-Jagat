import { NextResponse } from "next/server"

// Validation for product enquiry
const validateEnquiry = (data) => {
  const errors = []

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long")
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Valid email address is required")
  }

  if (!data.productId) {
    errors.push("Product ID is required")
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters long")
  }

  return errors
}

export async function POST(request) {
  try {
    const enquiryData = await request.json()

    // Validate enquiry data
    const validationErrors = validateEnquiry(enquiryData)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 },
      )
    }

    // Create enquiry entry
    const enquiry = {
      id: `enquiry_${Date.now()}`,
      timestamp: new Date().toISOString(),
      name: enquiryData.name.trim(),
      email: enquiryData.email.trim().toLowerCase(),
      company: enquiryData.company?.trim() || null,
      phone: enquiryData.phone?.trim() || null,
      productId: enquiryData.productId,
      productName: enquiryData.productName || null,
      quantity: enquiryData.quantity?.trim() || null,
      message: enquiryData.message.trim(),
      source: "product-enquiry",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    }

    // Log enquiry (in production, you'd save to database and send notifications)
    console.log("[PRODUCT ENQUIRY]", JSON.stringify(enquiry, null, 2))

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: "Thank you for your enquiry. Our team will contact you soon!",
      id: enquiry.id,
    })
  } catch (error) {
    console.error("Error processing product enquiry:", error)
    return NextResponse.json({ error: "Failed to process product enquiry" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"

// Validation for newsletter subscription
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: "Valid email address is required" }, { status: 400 })
    }

    // Create newsletter subscription entry
    const subscription = {
      id: `newsletter_${Date.now()}`,
      email: email.trim().toLowerCase(),
      timestamp: new Date().toISOString(),
      source: "website-footer",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    }

    // Log subscription (in production, you'd save to database and integrate with email service)
    console.log("[NEWSLETTER SUBSCRIPTION]", JSON.stringify(subscription, null, 2))

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to newsletter!",
      id: subscription.id,
    })
  } catch (error) {
    console.error("Error processing newsletter subscription:", error)
    return NextResponse.json({ error: "Failed to process newsletter subscription" }, { status: 500 })
  }
}

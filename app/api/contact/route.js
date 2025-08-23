import { NextResponse } from "next/server"

// Validation schema
const validateContactForm = (data) => {
  const errors = []

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long")
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Valid email address is required")
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters long")
  }

  if (data.phone && !/^[+]?[1-9][\d]{0,15}$/.test(data.phone.replace(/[\s\-()]/g, ""))) {
    errors.push("Invalid phone number format")
  }

  return errors
}

export async function POST(request) {
  try {
    const formData = await request.json()

    // Validate form data
    const validationErrors = validateContactForm(formData)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 },
      )
    }

    // Log the contact form submission (in a real app, you'd save to database or send email)
    const contactEntry = {
      id: `contact_${Date.now()}`,
      timestamp: new Date().toISOString(),
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      company: formData.company?.trim() || null,
      phone: formData.phone?.trim() || null,
      subject: formData.subject?.trim() || "General Inquiry",
      message: formData.message.trim(),
      source: formData.source || "contact-form",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    }

    // Log to server console (in production, you'd save to database)
    console.log("[CONTACT FORM SUBMISSION]", JSON.stringify(contactEntry, null, 2))

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you soon!",
      id: contactEntry.id,
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process contact form submission" }, { status: 500 })
  }
}

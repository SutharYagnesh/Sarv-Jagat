import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/forms/contact-form"
import { ContactInfo } from "@/components/sections/contact-info"

export const metadata = {
  title: "Contact Us | Sarv Jagat Corporation - Get Expert Air Compressor Solutions",
  description:
    "Contact Sarv Jagat Corporation for industrial air compressor solutions. Get quotes, technical support, and expert consultation. Call +91-9157487233 or email contact@sarvjagat.com",
  openGraph: {
    title: "Contact Us | Sarv Jagat Corporation",
    description:
      "Contact Sarv Jagat Corporation for industrial air compressor solutions. Get quotes, technical support, and expert consultation.",
    images: ["/sarv-jagat-contact-center.png"],
  },
}

export default function ContactPage() {
  const breadcrumbItems = [{ label: "Contact Us" }]

  return (
    <>
      <PageHero
        title="Contact Sarv Jagat Corporation"
        description="Get in touch with our air compressor experts for personalized solutions, technical support, or any questions about our industrial compressed air equipment."
        breadcrumbItems={breadcrumbItems}
      />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </>
  )
}

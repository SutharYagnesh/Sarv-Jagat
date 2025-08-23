import Link from "next/link"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const whatsappLink = "https://wa.me/message/QNU3M3AGOL3NH1"

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:bg-[#128C7E] hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 animate-bounce"
      aria-label="Contact Sarv Jagat Corporation on WhatsApp"
      title="Chat with us on WhatsApp for instant support"
    >
      <MessageCircle className="h-7 w-7" />
      <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
        <span className="text-xs font-bold text-white">1</span>
      </div>
    </Link>
  )
}

export { WhatsAppButton }

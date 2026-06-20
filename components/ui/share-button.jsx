"use client"

import { Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ShareButton({ title, text, url, className }) {
  const { toast } = useToast()

  const handleShare = async () => {
    try {
      // Determine the full URL if a relative path was provided
      const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`

      if (navigator.share) {
        await navigator.share({
          title: title,
          text: text,
          url: fullUrl,
        });
      } else {
        await navigator.clipboard.writeText(fullUrl);
        toast({
          title: "Link Copied!",
          description: "The product link has been copied to your clipboard.",
        })
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <button 
      onClick={handleShare} 
      className={className || "p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"}
      aria-label="Share product"
      title="Share or Copy Link"
    >
      <Share2 className="h-4 w-4 text-gray-500" />
    </button>
  )
}

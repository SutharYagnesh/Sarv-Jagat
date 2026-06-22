"use client"

import { useState } from "react"
import Image from "next/image"
import { LightboxViewer } from "@/components/ui/lightbox-viewer"
import { Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BlogGallery({ images, instagramLink, youtubeLink, videos }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Helper to extract YouTube ID
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  }

  if (!images?.length && !instagramLink && !youtubeLink && !videos?.length) {
    return null;
  }

  return (
    <div className="mt-10 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-serif text-gray-800 mb-6">Gallery & Media</h3>
      <div className="space-y-8">
        {images && images.length > 0 && (
          <div>
            <h4 className="text-lg font-serif text-gray-700 mb-4">Project Gallery</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="aspect-[4/3] rounded-lg overflow-hidden border shadow-sm cursor-zoom-in relative"
                  onClick={() => {
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                >
                  <Image 
                    src={img} 
                    alt={`Gallery image ${idx+1}`} 
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {youtubeLink && (() => {
          const videoId = getYouTubeId(youtubeLink);
          if (videoId) {
            return (
              <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden border shadow-sm bg-black mt-8">
                <iframe 
                  src={`https://www.youtube.com/embed/${videoId}`}
                  className="w-full h-full"
                  allowFullScreen
                  title="YouTube Video"
                />
              </div>
            );
          }
          return (
            <div className="flex justify-center mt-8">
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-6 text-lg font-medium shadow-md">
                <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Youtube className="w-5 h-5 mr-2" />
                  Watch Video on YouTube
                </a>
              </Button>
            </div>
          );
        })()}

        {videos && videos.length > 0 && videos[0] && (
          <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden border shadow-sm bg-black mt-8">
            <video 
              src={videos[0]} 
              controls 
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {instagramLink && (
          <div className="flex justify-center mt-8">
            <Button asChild className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white rounded-full px-8 py-6 text-lg font-medium shadow-md">
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Instagram className="w-5 h-5 mr-2" />
                View Original Instagram Post
              </a>
            </Button>
          </div>
        )}
      </div>

      <LightboxViewer 
        images={images || []} 
        index={lightboxIndex} 
        open={lightboxOpen} 
        close={() => setLightboxOpen(false)} 
      />
    </div>
  )
}

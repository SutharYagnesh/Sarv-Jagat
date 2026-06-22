"use client"
import { useState } from "react"
import { LightboxViewer } from "./lightbox-viewer"

export function LightboxImage({ src, alt, className, containerClassName }) {
  const [open, setOpen] = useState(false)
  
  if (!src) return null;
  
  return (
    <>
      <div 
        className={`${containerClassName || ''} cursor-zoom-in`} 
        onClick={() => setOpen(true)}
      >
        <img src={src} alt={alt} className={className} />
      </div>
      <LightboxViewer 
        images={[src]} 
        index={0} 
        open={open} 
        close={() => setOpen(false)} 
      />
    </>
  )
}

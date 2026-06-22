"use client"

import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import "yet-another-react-lightbox/styles.css"

export function LightboxViewer({ images, index, open, close }) {
  if (!images || images.length === 0) return null;
  
  const slides = images.map(src => ({ src }));

  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={slides}
      plugins={[Zoom, Fullscreen]}
    />
  )
}

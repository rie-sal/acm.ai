'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const galleryImages = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "AI Workshop Session",
    caption: "Students participating in our AI Workshop"
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Hackathon Event",
    caption: "Annual ACM AI Hackathon"
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Guest Speaker",
    caption: "Industry expert sharing insights"
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Team Building",
    caption: "Team building activity"
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Project Showcase",
    caption: "Student projects showcase"
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Study Group",
    caption: "AI study group session"
  }
]

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <section id="gallery" className="py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">
          Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-video cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-end">
                <p className="text-white p-4 text-sm">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-3xl">
            {selectedImage !== null && (
              <div className="relative aspect-video">
                <Image
                  src={galleryImages[selectedImage].src || "/placeholder.svg"}
                  alt={galleryImages[selectedImage].alt}
                  fill
                  className="object-contain"
                />
                <p className="text-center mt-2">{galleryImages[selectedImage].caption}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

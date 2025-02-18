'use client'

import { memo, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { ImageModal } from './ImageModal'
import { Container } from '@/components/Container'

// Non-critical images loaded dynamically
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'

const images = [
  {
    src: image1,
    description: 'Red Arrows flying over Edinburgh Castle during the Edinburgh Military Tattoo.',
  },
  {
    src: image2,
    description: 'A frozen waterfall in the Scottish Highlands during winter.',
  },
  {
    src: image3,
    description: 'Kayaking on Loch Lomond with other paddlers in the distance.',
  },
  {
    src: image4,
    description: 'Fresh sourdough loaves cooling on a wire rack, showcasing the art of home baking.',
  },
]

// Reduced rotation for better mobile experience
const rotations = ['rotate-2', '-rotate-2', 'rotate-2']

export const Photos = memo(function Photos() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <>
      <div className="mt-16 sm:mt-20">
        <Container>
          <div className="relative">
            {/* Gradient shadows for scroll indication */}
            <div className="pointer-events-none absolute -inset-x-4 top-0 h-8 bg-gradient-to-b from-zinc-50 dark:from-zinc-900" />
            <div className="pointer-events-none absolute -inset-x-4 bottom-0 h-8 bg-gradient-to-t from-zinc-50 dark:from-zinc-900" />
            
            {/* Scrollable container */}
            <div className="-mx-4 flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-4 pb-4 pt-4
              scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-300 
              hover:scrollbar-thumb-zinc-400 dark:scrollbar-thumb-zinc-700 
              dark:hover:scrollbar-thumb-zinc-600">
              {images.map((image, imageIndex) => (
                <div
                  key={image.src.src}
                  className="relative flex-none"
                >
                  <div
                    className={clsx(
                      'relative h-72 w-72 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800',
                      rotations[imageIndex % rotations.length],
                      'transform transition duration-300 ease-in-out hover:-translate-y-4 hover:shadow-xl will-change-transform'
                    )}
                    onClick={() => setSelectedImage(image)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedImage(image)
                      }
                    }}
                    aria-label="Click to view larger image"
                  >
                    <Image
                      src={image.src}
                      alt=""
                      sizes="(min-width: 640px) 18rem, 16rem"
                      className="absolute inset-0 h-full w-full object-cover transition duration-300 ease-in-out hover:scale-110"
                      style={{ transform: 'translate3d(0, 0, 0)' }}
                      priority={imageIndex === 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <ImageModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        image={selectedImage?.src?.src || null}
        description={selectedImage?.description}
      />
    </>
  )
}) 
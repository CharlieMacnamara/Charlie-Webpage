import Image from 'next/image'
import clsx from 'clsx'

export function SingleImage({ 
  src, 
  alt, 
  orientation = 'horizontal',
  focusArea = 'center', // 'center', 'top', 'bottom', 'left', 'right'
  zoom = 1, // 1 = no zoom, 2 = 2x zoom, etc.
  caption,
  blurBackground = false,
  variant = 'default' // Add variant prop
}) {
  // Special case for diagram images
  if (variant === 'diagram') {
    return (
      <div className="my-8">
        <div className="relative w-full">
          <Image
            src={src}
            alt={alt}
            width={800}
            height={600}
            className="w-full h-auto"
            style={{ objectFit: 'contain' }}
            priority={false}
          />
        </div>
        {caption && (
          <p className="mt-2 text-sm text-gray-600 text-center italic">{caption}</p>
        )}
      </div>
    )
  }

  return (
    <div className="my-8">
      <div className={clsx(
        'relative overflow-hidden rounded-xl',
        orientation === 'vertical' ? 'max-w-md mx-auto aspect-[3/4]' : 'w-full aspect-[4/3]',
        blurBackground && 'bg-gray-100'
      )}>
        <Image
          src={src}
          alt={alt}
          fill
          className={clsx(
            'object-cover transform',
            focusArea === 'center' && 'object-center',
            focusArea === 'top' && 'object-top',
            focusArea === 'bottom' && 'object-bottom',
            focusArea === 'left' && 'object-left',
            focusArea === 'right' && 'object-right',
            zoom > 1 && `scale-${zoom}`,
            blurBackground && 'backdrop-blur-sm'
          )}
          priority={false}
        />
      </div>
      {caption && (
        <p className="mt-2 text-sm text-gray-600 text-center italic">{caption}</p>
      )}
    </div>
  )
}

export function TwoColGrid({ 
  images,
  aspectRatio = '4/3', // Can be customized per layout needs
  gap = 4 // Tailwind gap size
}) {
  return (
    <div className={clsx(
      'grid grid-cols-1 md:grid-cols-2 my-8',
      `gap-${gap}`
    )}>
      {images.map((image, index) => (
        <div key={index} className="relative" style={{ aspectRatio }}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={clsx(
              'rounded-xl object-cover',
              image.focusArea === 'center' && 'object-center',
              image.focusArea === 'top' && 'object-top',
              image.focusArea === 'bottom' && 'object-bottom',
              image.focusArea === 'left' && 'object-left',
              image.focusArea === 'right' && 'object-right',
              image.zoom > 1 && `scale-${image.zoom}`,
              image.blurBackground && 'backdrop-blur-sm'
            )}
            priority={false}
          />
          {image.caption && (
            <p className="mt-2 text-sm text-gray-600 text-center italic">{image.caption}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export function ThreeColGrid({ 
  images,
  aspectRatio = '1/1', // Square by default for 3-col
  gap = 4
}) {
  return (
    <div className={clsx(
      'grid grid-cols-1 md:grid-cols-3 my-8',
      `gap-${gap}`
    )}>
      {images.map((image, index) => (
        <div key={index} className="relative" style={{ aspectRatio }}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={clsx(
              'rounded-xl object-cover',
              image.focusArea === 'center' && 'object-center',
              image.focusArea === 'top' && 'object-top',
              image.focusArea === 'bottom' && 'object-bottom',
              image.focusArea === 'left' && 'object-left',
              image.focusArea === 'right' && 'object-right',
              image.zoom > 1 && `scale-${image.zoom}`,
              image.blurBackground && 'backdrop-blur-sm'
            )}
            priority={false}
          />
          {image.caption && (
            <p className="mt-2 text-sm text-gray-600 text-center italic">{image.caption}</p>
          )}
        </div>
      ))}
    </div>
  )
} 
'use client'

import clsx from 'clsx'
import { useEffect, useRef } from 'react'

export function VideoPlayer({ 
  src, 
  poster,
  orientation = 'landscape',
  aspectRatio = 'auto', // Can be 'auto', '16/9', '4/3', '3/4', etc.
  autoPlayFirstFrame = true
}) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      // Set the correct video dimensions after load
      const handleLoadedMetadata = () => {
        const video = videoRef.current
        if (video) {
          if (aspectRatio !== 'auto') {
            video.style.aspectRatio = aspectRatio
          } else if (orientation === 'portrait') {
            const width = video.videoWidth
            const height = video.videoHeight
            if (width < height) {
              video.style.aspectRatio = '3/4'
            }
          }
        }
      }
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
        }
      }
    }
  }, [orientation, aspectRatio])

  return (
    <div className="my-8">
      <div className={clsx(
        'relative overflow-hidden rounded-xl',
        orientation === 'portrait' && 'max-w-sm mx-auto'
      )}>
        <video 
          ref={videoRef}
          controls
          playsInline
          className={clsx(
            'w-full h-auto',
            'object-cover',
            aspectRatio !== 'auto' && `aspect-[${aspectRatio}]`
          )}
          poster={poster}
          onLoadedData={(e) => {
            if (autoPlayFirstFrame && !poster) {
              const video = e.target
              video.currentTime = 0
              video.play().then(() => {
                setTimeout(() => {
                  video.pause()
                }, 100)
              }).catch(() => {
                // Ignore autoplay errors
              })
            }
          }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
} 
'use client'

import clsx from 'clsx'
import { useState, useEffect, useRef } from 'react'

export function VideoPlayer({ 
  src, 
  poster,
  orientation = 'landscape',
  aspectRatio = 'auto', // Can be 'auto', '16/9', '4/3', '3/4', etc.
  autoPlayFirstFrame = true
}) {
  const videoRef = useRef(null)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    
    if (typeof window === 'undefined' || !videoRef.current) return
    
    // Set the correct video dimensions after load
    const handleLoadedMetadata = () => {
      const video = videoRef.current
      if (!video) return
      
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
    
    const videoElement = videoRef.current
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata)
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [orientation, aspectRatio])

  // Safe handling of autoplay first frame
  const handleVideoLoaded = (e) => {
    if (!autoPlayFirstFrame || !e.target || poster || typeof window === 'undefined') return
    
    const video = e.target
    try {
      video.currentTime = 0
      video.play().then(() => {
        setTimeout(() => {
          if (video && !video.paused) {
            video.pause()
          }
        }, 100)
      }).catch(() => {
        // Ignore autoplay errors
      })
    } catch (error) {
      console.error('Error handling video autoplay:', error)
    }
  }

  // Don't render video during SSR to avoid hydration mismatch
  if (!hasMounted) {
    return (
      <div className="my-8">
        <div className={clsx(
          'relative overflow-hidden rounded-xl bg-gray-100',
          orientation === 'portrait' && 'max-w-sm mx-auto'
        )}>
          <div className={clsx(
            'w-full h-auto bg-gray-200',
            aspectRatio !== 'auto' ? `aspect-[${aspectRatio}]` : 'aspect-video'
          )}></div>
        </div>
      </div>
    )
  }

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
          onLoadedData={handleVideoLoaded}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
} 
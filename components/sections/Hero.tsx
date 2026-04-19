'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number,
) {
  const canvasRatio = canvasW / canvasH
  const imgRatio = img.width / img.height

  let sx = 0, sy = 0, sw = img.width, sh = img.height

  if (imgRatio > canvasRatio) {
    // Image wider than canvas — crop sides
    sw = img.height * canvasRatio
    sx = (img.width - sw) / 2
  } else {
    // Image taller than canvas — crop top/bottom
    sh = img.width / canvasRatio
    sy = (img.height - sh) / 2
  }

  ctx.clearRect(0, 0, canvasW, canvasH)
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH)
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)

  // Preload all 150 frames
  useEffect(() => {
    const frameCount = 150
    const images: HTMLImageElement[] = []
    let loadedCount = 0

    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      const frameNumber = String(i + 1).padStart(4, '0')
      img.src = `/assets/frames/${frameNumber}.jpg`
      const onDone = () => {
        loadedCount++
        setLoadProgress(Math.round((loadedCount / frameCount) * 100))
        if (loadedCount === frameCount) {
          setIsLoading(false)
        }
      }
      img.onload = onDone
      img.onerror = onDone
      images.push(img)
    }

    imagesRef.current = images
  }, [])

  // Canvas scroll animation
  useEffect(() => {
    if (isLoading) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      // No ctx.scale — we work in raw pixel coords for cover math
    }
    setCanvasSize()

    // Draw first frame immediately
    const firstImg = imagesRef.current[0]
    if (firstImg?.complete) {
      drawCover(ctx, firstImg, canvas.width, canvas.height)
    }

    let currentFrame = 0

    const drawFrame = (frameIndex: number) => {
      if (frameIndex === currentFrame) return
      const img = imagesRef.current[frameIndex]
      if (!img?.complete) return
      drawCover(ctx, img, canvas.width, canvas.height)
      currentFrame = frameIndex
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const frameIndex = Math.min(149, Math.floor(self.progress * 150))
        drawFrame(frameIndex)
      },
    })

    const handleResize = () => {
      setCanvasSize()
      const img = imagesRef.current[currentFrame]
      if (img?.complete) {
        drawCover(ctx, img, canvas.width, canvas.height)
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      trigger.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [isLoading])

  // Text reveal near end of scroll
  useEffect(() => {
    if (isLoading) return

    const textElement = textRef.current
    if (!textElement) return

    gsap.set(textElement, { opacity: 0, y: 30 })

    const textTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'bottom 85%',
      end: 'bottom 60%',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(textElement, {
          opacity: self.progress,
          y: 30 - 30 * self.progress,
        })
      },
    })

    return () => {
      textTrigger.kill()
    }
  }, [isLoading])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative bg-bg-light"
      style={{ height: '200vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {isLoading && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-[2px] bg-text-dark/20 rounded-full overflow-hidden z-10">
            <div
              className="h-full bg-text-dark transition-all duration-100"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        )}

        <div
          ref={textRef}
          className="absolute bottom-[10vh] left-0 right-0 text-center px-6 opacity-0 z-10"
        >
          <h1
            className="text-text-dark font-semibold tracking-[-0.02em] mb-3"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 1.1,
              textShadow: '0 2px 20px rgba(245, 245, 247, 0.8)',
            }}
          >
            Designed without compromise.
          </h1>
          <p
            className="text-text-muted font-medium"
            style={{
              fontSize: 'clamp(17px, 1.8vw, 22px)',
              textShadow: '0 2px 15px rgba(245, 245, 247, 0.8)',
            }}
          >
            An entirely new way to see.
          </p>
        </div>
      </div>
    </section>
  )
}

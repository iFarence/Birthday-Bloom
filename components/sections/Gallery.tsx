'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { eventData } from '@/constants/data'

const AUTOPLAY_DELAY = 2000

export default function Galeri() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAppeared, setHasAppeared] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const total = eventData.gallery.length

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total)
  }, [total])

  const goPrev = () => {
    setActiveIndex((i) => (i - 1 + total) % total)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setHasAppeared(true), 1000)
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPaused || lightboxIndex !== null) return
    timerRef.current = setTimeout(goNext, AUTOPLAY_DELAY)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeIndex, isPaused, lightboxIndex, goNext])

  const openLightbox = () => setLightboxIndex(activeIndex)
  const closeLightbox = () => setLightboxIndex(null)
  const lightboxPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIndex((i) => (i! - 1 + total) % total)
  }
  const lightboxNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIndex((i) => (i! + 1) % total)
  }

  return (
    <>
      <section ref={sectionRef} className="pb-10 pt-10 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #FDE8EC 0%, #FFF7E6 100%)' }}>
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-2 text-center" style={{ opacity: isVisible ? undefined : 0, animation: isVisible ? 'fade-up 0.7s ease-out forwards' : 'none' }}>
            <p className="font-sans text-rosewood text-xs tracking-[0.3em] uppercase">kenangan manis</p>
            <h2 className="font-serif text-3xl md:text-4xl text-midnight font-light italic">Galeri Foto</h2>
            <div className="w-12 h-px bg-blush mt-2" />
          </div>
          <div className="relative w-full flex items-center justify-center" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} style={{ opacity: isVisible ? undefined : 0, animation: isVisible ? 'fade-up 0.7s ease-out 0.15s forwards' : 'none' }}>
            <div className="relative flex items-center justify-center w-full h-[360px] md:h-[420px]">
              {eventData.gallery.map((photo, i) => {
                const offset = ((i - activeIndex + total) % total)
                const pos = offset === 0 ? "center" : offset === 1 ? "right" : offset === total - 1 ? "left" : "hidden"
                if (pos === "hidden") return null
                const isCenter = pos === "center"
                const isSway = isCenter && hasAppeared && !isPaused
                return (
                  <div key={i} onClick={isCenter ? openLightbox : () => setActiveIndex(i)} className={`absolute bg-white p-3 pb-10 cursor-pointer select-none ${isCenter ? "z-20 w-56 md:w-72" : "z-10 w-44 md:w-56"} ${!isCenter ? "transition-all duration-500 ease-out" : ""}`} style={{ boxShadow: isCenter ? '0 8px 32px rgba(45,58,71,0.18), 0 2px 8px rgba(45,58,71,0.10)' : '0 4px 16px rgba(45,58,71,0.12)', transform: `translateX(${pos === "left" ? "-160px" : pos === "right" ? "160px" : "0"}) scale(${isCenter ? 1 : 0.88})`, opacity: isCenter ? 1 : 0.5, rotate: !isCenter ? `${[-2, 1.5, -1, 2.5, -2.5, 1][i % 6]}deg` : undefined, transition: !isCenter ? 'transform 0.5s ease-out, opacity 0.5s ease-out' : undefined, animationName: isSway ? 'gentle-sway' : 'none', animationDuration: '4s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', animationPlayState: isPaused ? 'paused' : 'running' }}>                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blush border-2 border-white shadow-sm z-10" />
                    <div className="relative w-full aspect-square overflow-hidden bg-blush/20">
                      <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 430px) 60vw, 288px" className="object-cover" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-10 flex items-center justify-center">
                      <p className="font-script text-rosewood/70 text-sm">{photo.alt}</p>
                    </div>
                  </div>
                )
              })}
            </div> 
            <button onClick={goPrev} className="absolute left-0 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 shadow text-midnight hover:bg-white transition-colors duration-200" aria-label="Foto sebelumnya">‹</button>
            <button onClick={goNext} className="absolute right-0 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 shadow text-midnight hover:bg-white transition-colors duration-200" aria-label="Foto berikutnya">›</button>
          </div>
          <div className="flex items-center gap-2">
            {eventData.gallery.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)} className={`rounded-full transition-all duration-300 ${i === activeIndex ? "w-5 h-2 bg-rosewood" : "w-2 h-2 bg-blush/50 hover:bg-blush"}`} aria-label={`Foto ${i + 1}`} />
            ))}
          </div>
        </div>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-midnight/95 flex items-center justify-center" onClick={closeLightbox}>
            <div className="relative w-[280px] h-[380px] rounded-xl overflow-hidden shadow-2xl flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              <Image src={eventData.gallery[lightboxIndex].src} alt={eventData.gallery[lightboxIndex].alt} fill sizes="280px" className="object-cover" />
            </div>
            <button onClick={lightboxPrev} className="absolute left-4 text-vanilla/70 hover:text-vanilla text-4xl transition-colors" aria-label="Foto sebelumnya">‹</button>
            <button onClick={lightboxNext} className="absolute right-4 text-vanilla/70 hover:text-vanilla text-4xl transition-colors" aria-label="Foto berikutnya">›</button>
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-vanilla/70 hover:text-vanilla text-2xl transition-colors" aria-label="Tutup galeri">✕</button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-vanilla/50 text-xs tracking-widest">{lightboxIndex + 1} / {total}</p>
          </div>
        )}
      </section>
    </>
  )
}
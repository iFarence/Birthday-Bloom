'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { eventData } from '@/constants/data'

export default function Profil() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          setTimeout(() => setAnimated(true), 900)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const fade = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  const slideLeft: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(-40px)',
    transition: 'opacity 0.8s ease 100ms, transform 0.8s ease 100ms',
    animation: animated ? 'floatPhoto 4s ease-in-out infinite' : 'none',
  }

  const slideRight: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(40px)',
    transition: 'opacity 0.8s ease 100ms, transform 0.8s ease 100ms',
  }

  const butterflies = [
    { top: '-45px', left: '-45px', size: 90, flapDuration: '1.6s', floatDelay: '0s', floatDuration: '3s', opacity: 1 },
    { top: '-30px', right: '-40px', size: 60, flapDuration: '1.2s', floatDelay: '0.5s', floatDuration: '3.5s', opacity: 0.85 },
    { bottom: '-35px', right: '-35px', size: 45, flapDuration: '1.8s', floatDelay: '1s', floatDuration: '4s', opacity: 0.7 },
    { top: '40%', left: '-50px', size: 35, flapDuration: '1.4s', floatDelay: '1.5s', floatDuration: '2.8s', opacity: 0.6 },
  ]

  return (
    <section id="profil" ref={sectionRef} className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FEF0F3 55%, #FDE8EC 75%, #FDE8EC 100%)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-12">
          <div className="flex-shrink-0 relative" style={slideLeft}>

            {butterflies.map((b, i) => (
              <div key={i} style={{ position: 'absolute', top: b.top, bottom: b.bottom, left: b.left, right: b.right, zIndex: 6, opacity: animated ? b.opacity : 0, transition: `opacity 0.8s ease ${300 + i * 150}ms`, animation: animated ? `butterflyFloat ${b.floatDuration} ease-in-out ${b.floatDelay} infinite` : 'none' }}>
                <div style={{ width: `${b.size}px`, animation: animated ? `butterflyFlap ${b.flapDuration} ease-in-out infinite alternate` : 'none', transformOrigin: 'center bottom' }}>
                  <Image src="/images/butterfly1.png" alt="" width={b.size} height={b.size} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                </div>
              </div>
            ))}
            <div className="absolute -top-3 -left-3 w-full h-full border border-blush rounded-2xl" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 600ms', animation: animated ? 'pulseBorder 3s ease-in-out infinite' : 'none', zIndex: 1 }} />
            <div className="relative w-56 h-72 rounded-2xl overflow-hidden shadow-md" style={{ zIndex: 5 }}>
              <Image src={eventData.profilePhoto} alt={eventData.name} fill sizes="224px" className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col gap-5 text-center" style={slideRight}>
            <p className="font-sans text-rosewood text-xs tracking-[0.3em] uppercase" style={fade(200)}>yang berulang tahun</p>
            <h2 className="font-script text-4xl text-midnight leading-tight" style={{ ...fade(350), animation: animated ? 'nameGlow 3s ease-in-out infinite' : 'none' }}>{eventData.name}</h2>
            <div className="font-serif text-midnight/70 text-lg italic leading-relaxed space-y-1" style={fade(600)}>
              <div style={{ height: '1px', width: '200px', position: 'relative', overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', backgroundColor: '#F7C8D3', width: visible ? '100%' : '0%', transition: 'width 0.8s ease 500ms' }} />
              </div>
              <p>Usia ke-{eventData.age}</p>
            </div>
            <p className="font-sans text-midnight/60 text-sm leading-relaxed max-w-xs mx-auto" style={fade(750)} />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes floatPhoto { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); }}
        @keyframes pulseBorder { 0%, 100% { border-color: #F7C8D3; opacity: 1; } 50% { border-color: #e8a0ae; opacity: 0.7; }}
        @keyframes nameGlow { 0%, 100% { text-shadow: 0 0 0px transparent; } 50% { text-shadow: 0 2px 18px rgba(180, 106, 114, 0.25); }}
        @keyframes butterflyFloat { 0%, 100% { transform: translateY(0px) rotate(-3deg); } 50% { transform: translateY(-6px) rotate(3deg); }}
        @keyframes butterflyFlap { 0% { transform: scaleX(1); } 100% { transform: scaleX(0.5); }}
      `}</style>
    </section>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { eventData } from '@/constants/data'

export default function OpeningCover({ guestName }: { guestName: string }) {
  const router = useRouter()
  const [isLeaving, setIsLeaving] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleOpen = () => {
    setIsLeaving(true)
    sessionStorage.setItem('play-music', 'true')
    setTimeout(() => {
      router.push(`/undangan?to=${encodeURIComponent(guestName)}`)
    }, 800)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', justifyContent: 'center', backgroundColor: '#0e0b09', opacity: isLeaving ? 0 : 1, transition: 'opacity 0.7s ease' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '430px', overflow: 'hidden' }}>
        <Image src={eventData.profilePhoto} alt={eventData.name} fill sizes="(max-width: 430px) 100vw, 430px" priority style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(14,9,12,0.55) 0%, rgba(14,9,12,0.25) 30%, rgba(14,9,12,0.45) 58%, rgba(14,9,12,0.93) 100%)', }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 30px 44px', textAlign: 'center', zIndex: 10, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s' }}>
          <p className="font-sans" style={{ fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,210,200,0.65)', margin: '0 0 6px' }}>Kamu dipetik untuk hadir</p>
          <h2 className="font-script" style={{ fontSize: 'clamp(2rem, 9vw, 2.6rem)', lineHeight: 1.15, color: '#FFE4DC', margin: '0 0 4px', textShadow: '0 1px 12px rgba(0,0,0,0.45)' }}>{guestName}</h2>
          <p className="font-serif" style={{ fontSize: '12px', fontStyle: 'italic', lineHeight: 1.75, letterSpacing: '0.03em', color: 'rgba(255,210,200,0.6)', margin: '0 0 20px' }}>dalam perayaan tujuh belas kelopak yang merekah</p>
          <div style={{ height: '0.5px', background: 'rgba(255,190,170,0.3)', margin: '14px 0' }} />
          <p className="font-serif" style={{ fontSize: '13px', letterSpacing: '0.14em', color: 'rgba(255,220,210,0.82)', margin: '0 0 10px' }}>{eventData.dateDisplay}</p>
          <button onClick={handleOpen} className="font-sans" style={{ width: '100%', padding: '15px', background: 'rgba(180,106,114,0.22)', border: '1px solid rgba(220,160,155,0.5)', borderRadius: '3px', color: '#FFE4DC', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', cursor: 'pointer', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', transition: 'background 0.3s, color 0.3s', WebkitTapHighlightColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(180,106,114,0.55)'; e.currentTarget.style.color = '#FFF7E6' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(180,106,114,0.22)'; e.currentTarget.style.color = '#FFE4DC' }}>Buka Undangan</button>
        </div>
      </div>
    </div>
  )
}
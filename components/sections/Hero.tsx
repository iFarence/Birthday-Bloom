'use client'

import { useEffect, useState } from 'react'
import { eventData } from '@/constants/data'
import Image from 'next/image'

export default function Hero({ guestName }: { guestName: string }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 1300),
      setTimeout(() => setStep(4), 1700),
      setTimeout(() => setStep(5), 2100),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const fadeStyle = (show: boolean): React.CSSProperties => ({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(16px)',
    transition: 'opacity 0.8s ease, transform 0.8s ease',
  })

  return (
    <section id="home" style={{ position: 'relative', display: 'flex', height: '100dvh', width: '100%', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Image src={eventData.bgHero} alt="" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,15,10,0.55) 0%, rgba(20,15,10,0.35) 40%, rgba(20,15,10,0.75) 100%)' }} />
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '0 24px', textAlign: 'center' }}>
        <h1 className="font-serif" style={{ fontSize: '0.875rem', fontStyle: 'italic', letterSpacing: '0.1em', color: 'rgba(255,247,230,0.7)', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.5)', ...fadeStyle(step >= 1) }}>Untuk {guestName}, yang hadir mekar bersama.</h1>
        <p className="font-sans" style={{ fontSize: '0.8rem', letterSpacing: '0.05em', color: 'rgba(255,247,230,0.5)', margin: 0, lineHeight: 1.8, textShadow: '0 1px 4px rgba(0,0,0,0.5)', ...fadeStyle(step >= 2) }}>Dengan penuh kebahagiaan, kami berharap <br />kamu hadir untuk turut merasakan keindahannya bersama kami.</p>
        <div style={{ height: '1px', width: '80%', position: 'relative', overflow: 'hidden', opacity: step >= 3 ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', backgroundColor: 'rgba(247,200,211,0.4)', width: step >= 3 ? '100%' : '0%', transform: 'translateX(-50%)', transition: 'width 1s ease 0.3s' }} />
        </div>
        <h1 className="font-script" style={{ fontSize: 'clamp(2.5rem, 12vw, 4rem)', lineHeight: 1.2, color: '#FFF7E6', margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.6)', ...fadeStyle(step >= 3) }}>{eventData.nickname}</h1>
        <p className="font-sans" style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#F7C8D3', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.5)', ...fadeStyle(step >= 4) }}>Sweet Seventeen</p>
        <p className="font-sans" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#A9B7C6', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.5)', ...fadeStyle(step >= 4) }}>{eventData.dateDisplay}</p>
      </div>
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 20, opacity: step >= 5 ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', animation: 'bounceY 1.2s ease-in-out infinite' }}>
          <p className="font-sans" style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,247,230,0.5)', margin: 0 }}>Scroll</p>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={1.5} style={{ height: '14px', width: '14px', color: 'rgba(255,247,230,0.5)' }}>
            <path d='M19 9l-7 7-7-7' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </div>
      </div>    
      <style>{`
      @keyframes bounceY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); }}
      @keyframes floralFadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); }}
      @keyframes floralSway { 0%, 100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-6px) rotate(1deg); }}
      `}</style>    
    </section>
  )
}

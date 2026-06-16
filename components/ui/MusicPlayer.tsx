'use client'

import { useEffect, useRef, useState } from 'react'
import { eventData } from '@/constants/data'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const shouldPlay = sessionStorage.getItem('play-music') === 'true'

    const handleCanPlay = () => {
      if (shouldPlay) {
        audio.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {})
      }
    }

    audio.addEventListener('canplaythrough', handleCanPlay)
    return () => audio.removeEventListener('canplaythrough', handleCanPlay)
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={eventData.musicSrc} loop preload="auto" />
      <button onClick={togglePlay} aria-label={isPlaying ? "Pause musik" : "Play musik"} style={{ position: 'fixed', bottom: '24px', right: '16px', zIndex: 99999, width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', touchAction: 'manipulation' }}>
        <svg viewBox="0 0 56 56" width="56" height="56" style={{ animation: isPlaying ? 'vinylSpin 3s linear infinite' : 'none', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}>
          <circle cx="28" cy="28" r="28" fill="#1a1a1a" />
          <circle cx="28" cy="28" r="25" fill="none" stroke="#2a2a2a" strokeWidth="0.5" />
          <circle cx="28" cy="28" r="22" fill="none" stroke="#2a2a2a" strokeWidth="0.5" />
          <circle cx="28" cy="28" r="19" fill="none" stroke="#2a2a2a" strokeWidth="0.5" />
          <circle cx="28" cy="28" r="16" fill="none" stroke="#2a2a2a" strokeWidth="0.5" />
          <circle cx="28" cy="28" r="13" fill="none" stroke="#2a2a2a" strokeWidth="0.5" />
          <circle cx="28" cy="28" r="10" fill="#B46A72" />
          <circle cx="28" cy="28" r="2" fill="#1a1a1a" />
        </svg>
        {!isPlaying && (
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" fill="#FFF7E6" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </button>
      <style>{`@keyframes vinylSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); }}`}</style>
    </>
  )
}

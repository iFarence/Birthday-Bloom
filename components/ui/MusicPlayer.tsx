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
        audio.play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {})
      }
    }

    audio.addEventListener('canplaythrough', handleCanPlay)

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay)
    }
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

      <button onClick={togglePlay} aria-label={isPlaying ? 'Pause musik' : 'Play musik'} style={{ position: 'fixed', bottom: '24px', right: '16px', zIndex: 99999, width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', touchAction: 'manipulation' }}>
        <svg viewBox="0 0 24 24" width="32" height="32" fill="#B46A72" style={{ animation: isPlaying ? 'vinylSpin 3s linear infinite' : 'none', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}>
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
        </svg>
      </button>
      <style>{`
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
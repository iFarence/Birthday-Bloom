'use client'

import { useEffect, useRef, useState } from 'react'
import { eventData } from '@/constants/data'

interface TimeLeft {
  hari: number
  jam: number
  menit: number
  detik: number
}

function getTimeLeft(): TimeLeft {
  const target = new Date(eventData.eventDate).getTime()
  const now = Date.now()
  const diff = Math.max(target - now, 0)

  return {
    hari: Math.floor(diff / (1000 * 60 * 60 * 24)),
    jam: Math.floor((diff / (1000 * 60 * 60)) % 24),
    menit: Math.floor((diff / (1000 * 60)) % 60),
    detik: Math.floor((diff / 1000) % 60),
  }
}

export default function DetailAcaraCountdown() {
  const sectionRef = useRef<HTMLElement>(null)
  const countdownRef = useRef<HTMLElement>(null)
  const lokasiRef = useRef<HTMLElement>(null)

  const targetDate = new Date(eventData.eventDate)
  const dayOfMonth = targetDate.getDate()
  const prevDay = dayOfMonth - 1
  const nextDay = dayOfMonth + 1

  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

  const dayIndex = targetDate.getDay()
  const prevDayName = dayNames[(dayIndex + 6) % 7]
  const nextDayName = dayNames[(dayIndex + 1) % 7]
  const monthYear = `${monthNames[targetDate.getMonth()]} ${targetDate.getFullYear()}`

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft())
  const [arrived, setArrived] = useState(false)

  const watercolorBg = `
    radial-gradient(ellipse at 15% 20%, rgba(247,200,211,0.35) 0%, transparent 35%),
    radial-gradient(ellipse at 85% 35%, rgba(168,181,138,0.15) 0%, transparent 40%),
    radial-gradient(ellipse at 10% 65%, rgba(169,183,198,0.15) 0%, transparent 40%),
    radial-gradient(ellipse at 80% 82%, rgba(247,200,211,0.2) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 100%, rgba(240,237,248,0.45) 0%, transparent 50%),
    #FDE8EC
  `

  useEffect(() => {
    const interval = setInterval(() => {
      const t = getTimeLeft()
      setTimeLeft(t)
      if (t.hari === 0 && t.jam === 0 && t.menit === 0 && t.detik === 0) {
        setArrived(true)
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    function fadeUp(el: HTMLElement | null, delayMs: number) {
      if (!el) return
      el.style.transitionDelay = `${delayMs}ms`
      el.classList.add("da-visible")
    }

    function observeSection(ref: React.RefObject<HTMLElement | null>, animate: (get: (sel: string) => HTMLElement | null) => void) {
      const section = ref.current
      if (!section) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          observer.disconnect()
          const get = (sel: string) => section.querySelector<HTMLElement>(sel)
          animate(get)
        },
        { threshold: 0.25 }
      )
      observer.observe(section)
      return () => observer.disconnect()
    }

    observeSection(sectionRef, (get) => {
      fadeUp(get("[data-anim='label']"),       100)
      fadeUp(get("[data-anim='title']"),       220)
      fadeUp(get("[data-anim='divider']"),     340)
      fadeUp(get("[data-anim='month']"),       450)
      fadeUp(get("[data-anim='card-left']"),   950)
      fadeUp(get("[data-anim='card-center']"), 1050)
      fadeUp(get("[data-anim='card-right']"),  1150)
      fadeUp(get("[data-anim='time']"),        1400)
      fadeUp(get("[data-anim='save-btn']"),    1550)
    })
    observeSection(countdownRef, (get) => {
      fadeUp(get("[data-anim='cd-label']"),   100)
      fadeUp(get("[data-anim='cd-title']"),   220)
      fadeUp(get("[data-anim='cd-divider']"), 340)
      fadeUp(get("[data-anim='cd-grid']"),    500)
    })
    observeSection(lokasiRef, (get) => {
      fadeUp(get("[data-anim='lok-label']"),   100)
      fadeUp(get("[data-anim='lok-title']"),   220)
      fadeUp(get("[data-anim='lok-divider']"), 340)
      fadeUp(get("[data-anim='lok-map']"),     480)
      fadeUp(get("[data-anim='lok-name']"),    620)
      fadeUp(get("[data-anim='lok-address']"), 720)
      fadeUp(get("[data-anim='lok-btn']"),     840)
    })
  }, [])

  const units = [
    { value: timeLeft.hari, label: "Hari" },
    { value: timeLeft.jam, label: "Jam" },
    { value: timeLeft.menit, label: "Menit" },
    { value: timeLeft.detik, label: "Detik" },
  ]

  return (
    <>
      <style>{`
        [data-anim] {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 560ms ease, transform 560ms ease;
        }
        [data-anim].da-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div style={{ background: watercolorBg }}>

        {/*Event Details*/}
        <section ref={sectionRef} style={{ padding: '64px 24px' }}>
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <p data-anim="label" className="font-sans text-rosewood text-xs tracking-[0.3em] uppercase">simpan tanggalnya</p>
              <h2 data-anim="title" className="font-serif text-3xl text-midnight font-light">Detail Acara</h2>
              <div data-anim="divider" className="w-12 h-px bg-blush mt-2" />
            </div>
            <div className="w-full">
              <p data-anim="month" className="font-sans text-center text-midnight/60 text-xs tracking-[0.3em] uppercase mb-4">{monthYear}</p>
              <div className="grid grid-cols-3 border border-rosewood/20 rounded-xl overflow-hidden">
                <div data-anim="card-left" className="flex flex-col items-center py-5 border-r border-rosewood/20">
                  <p className="font-sans text-midnight/40 text-[10px] tracking-wider uppercase mb-3">{prevDayName}</p>
                  <p className="font-serif text-3xl text-midnight/40 font-light">{String(prevDay).padStart(2, "0")}</p>
                </div>
                <div data-anim="card-center" className="flex flex-col items-center py-5 bg-white relative">
                  <p className="font-sans text-rosewood text-[10px] tracking-wider uppercase mb-3">{eventData.dayName}</p>
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-14 h-14 rounded-full border-2 border-rosewood/60" />
                    <p className="font-serif text-3xl text-midnight font-light">{String(dayOfMonth).padStart(2, "0")}</p>
                  </div>
                </div>
                <div data-anim="card-right" className="flex flex-col items-center py-5 border-l border-rosewood/20">
                  <p className="font-sans text-midnight/40 text-[10px] tracking-wider uppercase mb-3">{nextDayName}</p>
                  <p className="font-serif text-3xl text-midnight/40 font-light">{String(nextDay).padStart(2, "0")}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p data-anim="time" className="font-serif text-midnight/70 italic text-lg">{eventData.timeDisplay}</p>
              <a data-anim="save-btn" href={(() => {
                  const start = new Date(eventData.eventDate)
                  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000)
                  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
                  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Sweet Seventeen ${eventData.name ?? ''}`)}&dates=${fmt(start)}/${fmt(end)}&location=${encodeURIComponent(eventData.venueAddress)}&details=${encodeURIComponent(`Undangan Sweet Seventeen — ${eventData.venueName}`)}`
                })()}
                target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-midnight text-vanilla font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-rosewood active:bg-rosewood transition-colors duration-300 rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Simpan ke Kalender
              </a>
            </div>
          </div>
        </section>

        {/*Countdown*/}
        <section ref={countdownRef} style={{ padding: '0 24px 64px' }}>
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-2">
              <p data-anim="cd-label" className="font-sans text-rosewood text-xs tracking-[0.3em] uppercase">Menuju Hari Istimewa</p>
            </div>
            {arrived ? (
              <div className="flex flex-col items-center gap-3">
                <p className="font-script text-5xl text-rosewood animate-fade-in">Selamat Ulang Tahun!</p>
                <p className="font-serif text-midnight/60 italic text-sm">Acara telah selesai</p>
              </div>
            ) : (
              <div data-anim="cd-grid" className="grid grid-cols-4 gap-4 md:gap-8 w-full">
                {units.map(({ value, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div className="w-full aspect-square max-w-[90px] mx-auto rounded-xl bg-white border border-blush/40 flex items-center justify-center shadow-sm">
                      <span suppressHydrationWarning className="font-serif text-3xl md:text-4xl text-midnight font-light">{String(value).padStart(2, "0")}</span>
                    </div>
                    <p className="font-sans text-rosewood text-[10px] tracking-[0.2em] uppercase">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/*Location*/}
        <section ref={lokasiRef} id="lokasi" style={{ padding: '0 24px 64px' }}>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <p data-anim="lok-label" className="font-sans text-rosewood text-xs tracking-[0.3em] uppercase">Lokasi Acara</p>
              <div data-anim="lok-divider" className="w-12 h-px bg-blush mt-2" />
            </div>
            <div data-anim="lok-map" className="w-full rounded-xl overflow-hidden border border-blush/40">
              <iframe src={eventData.googleMapsEmbedUrl} width="100%" height="240" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p data-anim="lok-name" className="font-sans text-midnight text-sm font-medium">{eventData.venueName}</p>
              <p data-anim="lok-address" className="font-sans text-midnight/60 text-sm leading-relaxed">{eventData.venueAddress}</p>
            </div>
            <a data-anim="lok-btn" href={eventData.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-3 bg-midnight text-vanilla font-sans text-xs tracking-[0.25em] uppercase hover:bg-rosewood active:bg-rosewood transition-colors duration-300 rounded-sm">Lihat Lokasi</a>
          </div>
        </section>
      </div>
    </>
  )
}
'use client'

import { useState, useEffect, useRef } from 'react'

interface Wish {
  id: number
  name: string
  message: string
  time: string
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const pastelAvatars = [
  'bg-blush text-rosewood',
  'bg-sage/30 text-sage',
  'bg-lavender/30 text-lavender',
  'bg-misty/30 text-misty',
]

export default function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    const newWish: Wish = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      time: "Baru saja",
    }
    setWishes((prev) => [newWish, ...prev])
    setName("")
    setMessage("")
    setLoading(false)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setTimeout(() => {
      listRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  return (
    <section ref={sectionRef} className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #FFF7E6 0%, #FDE8EC 50%, #E8EFF5 100%)' }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-center gap-2 text-center" style={{ opacity: isVisible ? undefined : 0, animation: isVisible ? 'fade-up 0.7s ease-out forwards' : 'none' }}>
          <p className="font-sans text-rosewood text-xs tracking-[0.3em] uppercase">titipkan bungamu</p>
          <h2 className="font-serif text-3xl md:text-4xl text-midnight font-light italic">Untaian Kasih</h2>
          <div className="w-12 h-px bg-blush mt-2" />
        </div>
        <div className="flex flex-col gap-4 bg-vanilla rounded-2xl p-6 border border-blush/20" style={{ opacity: isVisible ? undefined : 0, animation: isVisible ? 'fade-up 0.7s ease-out 0.15s forwards' : 'none' }}>
          <div className="relative">
            <input type="text" placeholder="Nama kamu" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-white border border-blush/40 font-sans text-sm text-midnight placeholder-midnight/30 rounded-lg outline-none focus:border-rosewood transition-colors" />
          </div>
          <div className="relative">
            <textarea placeholder="Tulis bungamu di sini..." value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full px-4 py-3 bg-white border border-blush/40 font-sans text-sm text-midnight placeholder-midnight/30 rounded-lg outline-none focus:border-rosewood transition-colors resize-none" />
            <span className="absolute bottom-3 right-3 font-sans text-xs text-midnight/20">{message.length}/200</span>
          </div>
          <button onClick={handleSubmit} disabled={loading || !name.trim() || !message.trim()} className="w-full py-3.5 font-sans text-xs tracking-[0.25em] uppercase rounded-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed" style={{ background: sent ? 'linear-gradient(135deg, #A8B58A, #B8C89A)' : 'linear-gradient(135deg, #B46A72, #C4848C)', color: '#FFF7E6' }}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ti ti-loader-2 animate-spin" aria-hidden="true" />Mengirim...
              </span>
            ) : sent ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ti ti-circle-check" aria-hidden="true" />Terkirim!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <i className="ti ti-send" aria-hidden="true" />Kirim
              </span>
            )}
          </button>
        </div>
        <div style={{ opacity: isVisible ? undefined : 0, animation: isVisible ? 'fade-up 0.7s ease-out 0.3s forwards' : 'none', }}>
          <div className="flex items-center justify-between mb-4">
            <p className="font-sans text-xs tracking-[0.25em] uppercase text-rosewood">{wishes.length} pesan</p>
            <div className="h-px flex-1 bg-blush/30 mx-4" />
          </div>
          <div ref={listRef} className="flex flex-col gap-3 max-h-[480px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#F7C8D3 transparent' }}>
            {wishes.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-16 text-center">
                <i className="ti ti-heart text-blush text-3xl" aria-hidden="true" />
                <p className="font-serif italic text-rosewood text-sm">Jadilah yang pertama menitipkan bunga!</p>
              </div>
            ) : (
              wishes.map((w, idx) => (
                <div key={w.id} className="flex gap-4 bg-vanilla rounded-xl px-5 py-4 border border-blush/20" style={{ animation: idx === 0 && w.time === "Baru saja" ? 'fade-up 0.5s ease-out forwards' : 'none' }}>
                  <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-sans text-xs font-medium ${pastelAvatars[idx % pastelAvatars.length]}`}>
                    {getInitials(w.name)}
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-sans text-midnight text-sm font-medium tracking-wide truncate">{w.name}</p>
                      <p className="font-sans text-midnight/30 text-xs flex-shrink-0">{w.time}</p>
                    </div>
                    <p className="font-serif italic text-midnight/65 text-sm leading-relaxed">{w.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
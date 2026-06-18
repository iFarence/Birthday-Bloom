'use client'

import { useEffect, useRef } from 'react'
import { eventData } from '@/constants/data'

export default function DressCode() {
  const sectionRef = useRef<HTMLElement>(null)
  const { dressCode } = eventData

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const get = (sel: string) => section.querySelector<HTMLElement>(sel)
        const getAll = (sel: string) => Array.from(section.querySelectorAll<HTMLElement>(sel))

        function fadeUp(el: HTMLElement | null, delayMs: number) {
          if (!el) return
          el.style.transitionDelay = `${delayMs}ms`
          el.classList.add("dc-visible")
        }

        fadeUp(get("[data-anim='dc-label']"),   100)
        fadeUp(get("[data-anim='dc-title']"),   220)
        fadeUp(get("[data-anim='dc-divider']"), 340)
        fadeUp(get("[data-anim='dc-desc']"),    480)
        fadeUp(get("[data-anim='dc-warna']"),   620)

        getAll("[data-anim='dc-color']").forEach((el, i) => {
          el.style.transitionDelay = `${750 + i * 100}ms`
          el.classList.add("dc-visible")
        })

        fadeUp(get("[data-anim='dc-note']"), 1300)
      },
      { threshold: 0.25 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        [data-anim="dc-label"],
        [data-anim="dc-title"],
        [data-anim="dc-divider"],
        [data-anim="dc-desc"],
        [data-anim="dc-warna"],
        [data-anim="dc-note"] { opacity: 0; transform: translateY(18px); transition: opacity 560ms ease, transform 560ms ease; }

        [data-anim="dc-color"] { opacity: 0; transform: translateY(12px) scale(0.85); transition: opacity 500ms ease, transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1); }

        [data-anim].dc-visible { opacity: 1; transform: translateY(0) scale(1); }
      `}</style>

      <section ref={sectionRef} className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #F5F0FB 0%, #F8F4FD 50%, #FDE8EC 100%)' }}>
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-2">
            <p data-anim="dc-label" className="font-sans text-rosewood text-xs tracking-[0.3em] uppercase">dress code</p>
            <h2 data-anim="dc-title" className="font-serif text-3xl md:text-4xl text-midnight font-light italic">{dressCode.theme}</h2>
            <div data-anim="dc-divider" className="w-12 h-px bg-blush mt-2" />
          </div>
          <p data-anim="dc-desc" className="font-sans text-midnight/60 text-sm leading-relaxed max-w-md">{dressCode.description}</p>
          <div className="flex flex-col items-center gap-4 w-full">
            <p data-anim="dc-warna" className="font-sans text-midnight/40 text-xs tracking-[0.2em] uppercase">pilihan warna</p>
            <div className="flex items-end justify-center gap-3 md:gap-5">
              {dressCode.colors.map((color, i) => (
                <div key={i} data-anim="dc-color" className="flex flex-col items-center gap-2">
                  <div className="rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: color, width: i === 0 || i === 4 ? "48px" : i === 1 || i === 3 ? "56px" : "68px", height: i === 0 || i === 4 ? "48px" : i === 1 || i === 3 ? "56px" : "68px" }} />
                  <p className="font-sans text-[10px] text-midnight/70 tracking-wide max-w-[60px] text-center leading-tight">{dressCode.colorNames[i]}</p>
                  <p className="font-sans text-[9px] text-midnight/60 tracking-wider uppercase">{color}</p>
                </div>
              ))}
            </div>
          </div>
          <p data-anim="dc-note" className="font-serif italic text-midnight/50 text-sm">*Hindari warna hitam dan merah pekat</p>
        </div>
      </section>
    </>
  )
}

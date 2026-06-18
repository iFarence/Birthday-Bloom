import { eventData } from '@/constants/data'

export default function Footer() {
  return (
    <footer className="bg-midnight py-5 px-6">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-6 text-center">
        <h2 className="font-script text-5xl text-vanilla">Terima kasih</h2>
        <div className="w-12 h-px bg-blush/50" />
        <p className="font-serif italic text-vanilla/60 text-sm leading-relaxed">{eventData.footerMessage}</p>
        <p className="font-sans text-vanilla/30 text-xs tracking-[0.3em] uppercase">{eventData.dateDisplay}</p>
      </div>
    </footer>
  )
}

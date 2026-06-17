import type { Metadata } from 'next'
import { DM_Sans, Cormorant_Garamond, Great_Vibes } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-script',
  weight: '400',
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Happy Birthday Ifarence',
  description: 'Undangan ulang tahun ke-17 Ifarence — 10 November 2026',
  openGraph: {
    title: 'Happy Birthday Ifarence',
    description: 'Undangan ulang tahun ke-17 Ifarence — 10 November 2026',
    images: ['/images/profile.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${dmSans.variable} ${cormorant.variable} ${greatVibes.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
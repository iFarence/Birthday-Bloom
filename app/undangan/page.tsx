import Hero from "@/components/sections/Hero"
import MusicPlayer from "@/components/ui/MusicPlayer"
import Profil from "@/components/sections/Profile"
import DetailAcara from "@/components/sections/EventDetails"
import DressCode from "@/components/sections/DressCode"
import Galeri from "@/components/sections/Gallery"
import WallUcapan from "@/components/sections/WishesWall"
import Footer from "@/components/sections/Footer"

interface Props {
    searchParams: Promise<{ to?: string }>
}

export default async function UndanganPage({ searchParams }: Props) {
    const { to } = await searchParams
    const guestName = to || "Cecil"
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000', display: 'flex', justifyContent: 'center' }}>
            <main className="relative" style={{ width: '100%', maxWidth: '430px', backgroundColor: '#14100A', minHeight: '100vh', overflowX: 'hidden' }}>
                <Hero guestName={guestName} />
                <MusicPlayer />
                <Profil/>
                <DetailAcara />
                <DressCode />
                <Galeri />
                <WallUcapan />
                <Footer />
            </main>
        </div>
    )
}

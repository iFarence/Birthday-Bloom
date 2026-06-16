import OpeningCover from "@/components/opening/OpeningCover"

interface Props {
    searchParams: Promise<{ to?: string }>
}

export default async function Home({ searchParams }: Props) {
    const { to } = await searchParams
    const guestName = to || "Cecil"
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '430px', minHeight: '100vh', overflow: 'hidden' }}>
                <OpeningCover guestName={guestName} />
            </div>
        </div>
    )
}

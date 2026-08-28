import { ImageResponse } from 'next/og'

export const alt = "RoboFiesta'26 — Where Circuits Come Alive at RVITM, Bangalore"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', color: '#FFF6DC', backgroundImage: 'linear-gradient(145deg, #24105F 0%, #6C2BD9 48%, #FF5F6D 100%)', fontFamily: 'monospace' }}>
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: 300, left: 75, top: 60, background: '#FFF0AA', border: '12px solid #2A0B4F', boxShadow: '18px 18px 0 #18062F' }} />
      <div style={{ position: 'absolute', width: 18, height: 18, right: 120, top: 95, background: '#FFF0AA', boxShadow: '18px 0 #FFF0AA, -18px 0 #FFF0AA, 0 18px #FFF0AA, 0 -18px #FFF0AA' }} />
      <div style={{ display: 'flex', width: 970, flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
        <div style={{ display: 'flex', padding: '10px 18px', border: '5px solid #2A0B4F', background: '#FFF6DC', color: '#2A0B4F', fontWeight: 800, fontSize: 22, letterSpacing: 2 }}>RVITM · BANGALORE · 16–18 OCTOBER 2026</div>
        <div style={{ display: 'flex', marginTop: 38, fontWeight: 900, fontSize: 112, lineHeight: 0.86, letterSpacing: -8, textAlign: 'center', color: '#F5DCFF', textShadow: '8px 8px 0 #8E57B6, 16px 16px 0 #2A0B4F' }}>ROBOFIESTA&apos;26</div>
        <div style={{ display: 'flex', marginTop: 55, fontWeight: 800, fontSize: 35 }}>WHERE CIRCUITS COME ALIVE.</div>
      </div>
    </div>,
    size,
  )
}

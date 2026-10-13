import { ImageResponse } from 'next/og';

export const alt = 'Road to Doomsday: MCU 1-to-N Watch Tracker';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #090d10 0%, #03180e 50%, #000000 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            padding: '8px 24px',
            borderRadius: '9999px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34d399',
            fontSize: 20,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          Marvel Cinematic Universe • 1 to N Tracker
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            textAlign: 'center',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            color: '#34d399',
            marginBottom: '20px',
            maxWidth: '1000px',
          }}
        >
          ROAD TO DOOMSDAY
        </div>
        <div
          style={{
            fontSize: 26,
            color: '#cbd5e1',
            textAlign: 'center',
            maxWidth: '850px',
            lineHeight: 1.4,
            marginBottom: '36px',
          }}
        >
          The Complete Sequential Movie & Series Checklist leading to Avengers: Doomsday (2026)
        </div>
        <div
          style={{
            display: 'flex',
            gap: '20px',
          }}
        >
          <div
            style={{
              padding: '12px 24px',
              borderRadius: '14px',
              background: '#064e3b',
              border: '1px solid #10b981',
              color: '#a7f3d0',
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            28 Curated Titles
          </div>
          <div
            style={{
              padding: '12px 24px',
              borderRadius: '14px',
              background: '#18181b',
              border: '1px solid #3f3f46',
              color: '#e4e4e7',
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Doctor Doom & Incursion Lore
          </div>
          <div
            style={{
              padding: '12px 24px',
              borderRadius: '14px',
              background: '#18181b',
              border: '1px solid #3f3f46',
              color: '#38bdf8',
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            100% Free Watch Tracker
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

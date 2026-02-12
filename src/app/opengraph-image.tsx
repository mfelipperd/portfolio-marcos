import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Marcos Felippe - Desenvolvedor Fullstack';
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
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '80px',
        }}
      >
        <h1
          style={{
            fontSize: '180px',
            fontWeight: '800',
            margin: '0 0 40px 0',
            color: '#ffffff',
            letterSpacing: '0',
            textTransform: 'uppercase',
          }}
        >
          M.Felippe
        </h1>
        <p
          style={{
            fontSize: '42px',
            margin: 0,
            opacity: 0.7,
            fontWeight: '400',
            letterSpacing: '2px',
          }}
        >
          Desenvolvedor FullStack React Node
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}

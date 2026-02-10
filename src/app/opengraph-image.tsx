import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Marcos Felippe - Desenvolvedor Fullstack Senior';
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
          background: 'linear-gradient(to bottom right, #0f0c29, #302b63, #24243e)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          {/* Simulated Logo/Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#a259f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 'bold',
              marginRight: '20px',
              boxShadow: '0 0 20px rgba(162, 89, 247, 0.5)',
            }}
          >
            MF
          </div>
        </div>
        <h1
          style={{
            fontSize: '60px',
            fontWeight: 'bold',
            margin: '0 0 20px 0',
            backgroundClip: 'text',
            color: 'transparent',
            backgroundImage: 'linear-gradient(90deg, #fff, #a259f7)',
          }}
        >
          Marcos Felippe
        </h1>
        <p
          style={{
            fontSize: '30px',
            margin: 0,
            opacity: 0.8,
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Desenvolvedor Fullstack Senior | React, Node.js & Automação
        </p>
        <div
          style={{
            marginTop: '40px',
            padding: '10px 20px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50px',
            fontSize: '20px',
            background: 'rgba(0,0,0,0.3)',
          }}
        >
          marcosfelippe.dev
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

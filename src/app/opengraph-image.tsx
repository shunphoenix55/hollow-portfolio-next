import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const MASK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 0 140 170"><path d="M70 70C46 58 30 40 36 4C42 30 58 44 86 56Z M130 70C154 58 170 40 164 4C158 30 142 44 114 56Z" fill="#f2f4f7"/><path d="M100 50C140 50 158 80 156 112C154 146 132 164 100 164C68 164 46 146 44 112C42 80 60 50 100 50Z" fill="#f2f4f7"/><ellipse cx="78" cy="116" rx="14" ry="21" fill="#05060a"/><ellipse cx="122" cy="116" rx="14" ry="21" fill="#05060a"/></svg>`;

export default function OpengraphImage() {
  const rule = { width: 260, height: 2, background: 'linear-gradient(90deg, transparent, #fff)' };
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        background: 'radial-gradient(60% 70% at 50% 45%, #1a1d22, #000107 70%)',
        color: '#fff',
      }}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(MASK)}`}
        width={96}
        height={117}
        alt=""
      />
      <div style={{ fontSize: 84, letterSpacing: 6, textTransform: 'uppercase' }}>{site.name}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <div style={rule} />
        <div
          style={{ fontSize: 30, letterSpacing: 10, color: '#c9d4df', textTransform: 'uppercase' }}
        >
          {site.role}
        </div>
        <div style={{ ...rule, background: 'linear-gradient(90deg, #fff, transparent)' }} />
      </div>
    </div>,
    size,
  );
}

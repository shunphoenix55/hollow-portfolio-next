import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { crest, corner, flourish, hook, panelTop } from './ornaments.mjs';
import { TECH_ICONS } from './tech-icons.mjs';

const TS_OUT = new URL('../../src/components/ornament/sprite.generated.ts', import.meta.url);
const SVG_OUT = new URL('../../public/ornaments.svg', import.meta.url);

const metal = (o) => ({ viewBox: o.viewBox, body: `<path fill="url(#metal)" d="${o.d}"/>` });

const symbols = {
  'orn-flourish': metal(flourish()),
  'orn-crest': metal(crest({ finial: false })),
  'orn-hook': metal(hook()),
  'orn-corner': metal(corner()),
  'orn-panel-top': metal(panelTop()),
  knight: {
    viewBox: '0 0 200 270',
    body: `<path d="M150 8 L196 214 L190 216 L144 10Z" fill="#9aa3ad"/><path d="M58 150C38 190 26 232 46 266L154 266C174 232 162 190 142 150C124 166 76 166 58 150Z" fill="url(#cloak)"/><path d="M70 70C46 58 30 40 36 4C42 30 58 44 86 56Z M130 70C154 58 170 40 164 4C158 30 142 44 114 56Z" fill="#f2f4f7"/><path d="M100 50C140 50 158 80 156 112C154 146 132 164 100 164C68 164 46 146 44 112C42 80 60 50 100 50Z" fill="#f2f4f7"/><ellipse cx="78" cy="116" rx="14" ry="21" fill="#05060a"/><ellipse cx="122" cy="116" rx="14" ry="21" fill="#05060a"/>`,
  },
  'hud-vessel': {
    viewBox: '0 0 132 100',
    body: `<path d="M12 60C6 30 30 6 62 6C84 6 104 12 128 22C104 17 84 16 66 18C42 21 24 36 22 58Z" fill="url(#wisp)"/><path d="M30 20C46 8 66 2 92 4C76 6 60 10 46 18Z" fill="url(#wisp)" opacity=".7"/><circle cx="48" cy="58" r="37" fill="#05060a" stroke="#8d959e" stroke-width="2.5"/><circle cx="48" cy="58" r="31" fill="url(#shell)"/><ellipse cx="35" cy="66" rx="8.5" ry="7.2" transform="rotate(-14 35 66)" fill="#13151b"/><ellipse cx="61" cy="66" rx="8.5" ry="7.2" transform="rotate(14 61 66)" fill="#13151b"/>`,
  },
  'hud-mask': {
    viewBox: '0 0 30 36',
    body: `<path d="M15 2C25 2 29 10 28 18C27 26 21 34 15 34C9 34 3 26 2 18C1 10 5 2 15 2Z" fill="url(#shell)" stroke="#05060a" stroke-width="1.2"/><ellipse cx="10" cy="20" rx="3.2" ry="4.6" fill="#13151b"/><ellipse cx="20" cy="20" rx="3.2" ry="4.6" fill="#13151b"/>`,
  },
  'hud-geo': {
    viewBox: '0 0 34 32',
    body: `<g fill="url(#pebble)" stroke="#16191e" stroke-width="1"><circle cx="11" cy="9" r="5.5"/><circle cx="22" cy="8" r="5.5"/><circle cx="29" cy="16" r="4.6"/><circle cx="5.5" cy="18" r="4.6"/><circle cx="17" cy="17" r="6"/><circle cx="11" cy="26" r="4.8"/><circle cx="23" cy="26" r="4.8"/></g>`,
  },
  'slot-mark': {
    viewBox: '0 0 40 30',
    body: `<path d="M3 15C11 10.5 17 10 23 15C17 20 11 19.5 3 15Z"/><path d="M14 12.6C15 6 21 2.4 27 3.6C29.6 4.2 30.6 6.6 29 8.2C27.6 6.4 25 6 23 7.4C20.6 9 19.6 11.6 19.4 13.6Z"/><path d="M14 17.4C15 24 21 27.6 27 26.4C29.6 25.8 30.6 23.4 29 21.8C27.6 23.6 25 24 23 22.6C20.6 21 19.6 18.4 19.4 16.4Z"/><path d="M22 13.8H34.5C36.4 13.8 37.6 14.4 38 15C37.6 15.6 36.4 16.2 34.5 16.2H22Z"/><circle cx="31.5" cy="15" r="2.4"/>`,
  },
  ...Object.fromEntries(
    Object.entries(TECH_ICONS).map(([id, d]) => [`tech-${id}`, { viewBox: '0 0 24 24', body: `<path d="${d}"/>` }]),
  ),
};

const defs = `<defs><linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#eef2f6"/><stop offset="1" stop-color="#cdd6df"/></linearGradient><linearGradient id="cloak" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#202b3b"/><stop offset="1" stop-color="#05070c"/></linearGradient><radialGradient id="shell" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f1edf2"/><stop offset="1" stop-color="#c9c2cd"/></radialGradient><linearGradient id="wisp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9dde2"/><stop offset=".6" stop-color="#b7bec6"/><stop offset="1" stop-color="#b7bec6" stop-opacity="0"/></linearGradient><radialGradient id="pebble" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#f2f4f6"/><stop offset=".55" stop-color="#9ea6ae"/><stop offset="1" stop-color="#4a5058"/></radialGradient></defs>`;

const markup =
  defs +
  Object.entries(symbols)
    .map(([id, s]) => `<symbol id="${id}" viewBox="${s.viewBox}">${s.body}</symbol>`)
    .join('');

const sizes = Object.fromEntries(
  Object.entries(symbols).map(([id, s]) => {
    const [, , w, h] = s.viewBox.split(' ').map(Number);
    return [id, [w, h]];
  }),
);

const svg = `<svg xmlns="http://www.w3.org/2000/svg">${markup}</svg>`;
const version = createHash('sha1').update(svg).digest('hex').slice(0, 10);

const source = `export const SPRITE_URL = '/ornaments.svg?v=${version}';

export const SYMBOL_SIZES = ${JSON.stringify(sizes, null, 2)} as const;

export type SymbolId = keyof typeof SYMBOL_SIZES;
`;

mkdirSync(new URL('.', SVG_OUT), { recursive: true });
writeFileSync(SVG_OUT, svg);
writeFileSync(TS_OUT, source);
console.log(`ornaments: ${Object.keys(symbols).length} symbols, ${(svg.length / 1024).toFixed(1)} KB`);

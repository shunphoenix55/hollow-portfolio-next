import { Cormorant_Garamond, Poppins, Sedan_SC } from 'next/font/google';
import localFont from 'next/font/local';

export const cinzel = localFont({
  src: '../fonts/cinzel-latin.woff2',
  weight: '400 900',
  variable: '--font-cinzel',
  display: 'swap',
});

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: false,
});

export const sedan = Sedan_SC({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-sedan',
  display: 'swap',
  preload: false,
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins',
  display: 'swap',
  preload: false,
});

export const fontVariables = [cinzel, cormorant, sedan, poppins].map((f) => f.variable).join(' ');

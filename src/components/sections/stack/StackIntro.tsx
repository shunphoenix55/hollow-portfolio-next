'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import knightJump from '@/assets/exp-knight-jump.webp';
import knightStand from '@/assets/exp-knight-stand.webp';
import knightSlash from '@/assets/knight-slash.webp';
import rockImage from '@/assets/stack-rock.webp';
import { startOrbDrift } from './orb-drift';
import { playStackIntro } from './stack-intro';
import styles from './TechStack.module.css';

const SHARDS = [
  'polygon(50% 60%, 0 0, 50% 0)',
  'polygon(50% 60%, 50% 0, 100% 0, 100% 40%)',
  'polygon(50% 60%, 100% 40%, 100% 100%)',
  'polygon(50% 60%, 100% 100%, 50% 100%)',
  'polygon(50% 60%, 50% 100%, 0 100%, 0 70%)',
  'polygon(50% 60%, 0 70%, 0 0)',
];
const START_SHARE = 0.9;
const THRESHOLDS = Array.from({ length: 11 }, (_, i) => 0.5 + i * 0.05);

export function StackIntro() {
  const knight = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const rock = useRef<HTMLDivElement>(null);
  const slash = useRef<SVGPathElement>(null);
  const flash = useRef<HTMLElement>(null);
  const dim = useRef<HTMLElement>(null);
  const rockDust = useRef<HTMLElement>(null);
  const knightDust = useRef<HTMLElement>(null);

  useEffect(() => {
    const backdrop = knight.current?.parentElement;
    const section = backdrop?.closest('section');
    if (!section || !backdrop || !body.current || !rock.current || !slash.current) return;
    if (!flash.current || !dim.current || !rockDust.current || !knightDust.current) return;
    if (!knight.current) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const actors = {
      section,
      backdrop,
      knight: knight.current,
      body: body.current,
      rock: rock.current,
      shards: [...rock.current.querySelectorAll<HTMLElement>('[data-shard]')],
      slash: slash.current,
      flash: flash.current,
      dim: dim.current,
      rockDust: rockDust.current,
      knightDust: knightDust.current,
      orbs: [...section.querySelectorAll<HTMLElement>('[data-stack-orb]')],
    };
    section.dataset.intro = 'armed';
    let stopDrift: (() => void) | undefined;
    let disposed = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        const needed = Math.min(START_SHARE, (innerHeight / section.offsetHeight) * START_SHARE);
        if (entry.intersectionRatio < needed) return;
        io.disconnect();
        playStackIntro(actors).then((starts) => {
          if (!disposed) stopDrift = startOrbDrift(section, actors.orbs, starts);
        });
      },
      { threshold: THRESHOLDS },
    );
    io.observe(section);
    return () => {
      disposed = true;
      io.disconnect();
      stopDrift?.();
    };
  }, []);

  return (
    <>
      <div ref={rock} className={styles.rock}>
        <Image src={rockImage} alt="" sizes="12vh" className={styles.rockWhole} />
        {SHARDS.map((clip) => (
          <Image
            key={clip}
            src={rockImage}
            alt=""
            sizes="12vh"
            className={styles.shard}
            style={{ clipPath: clip }}
            data-shard
          />
        ))}
      </div>
      <i ref={dim} className={styles.dim} />
      <i ref={rockDust} className={`${styles.dust} ${styles.dustRock}`} />
      <i ref={flash} className={styles.flash} />
      <svg className={styles.slashArc} viewBox="0 0 160 110">
        <path
          ref={slash}
          d="M14 92C40 30 112 8 150 26"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
        />
      </svg>
      <div ref={knight} className={styles.knight} data-pose="stand">
        <div ref={body} className={styles.knightBody}>
          <div className={styles.facing}>
            <Image
              src={knightStand}
              alt=""
              sizes="10vh"
              className={`${styles.pose} ${styles.poseStand}`}
            />
            <Image
              src={knightJump}
              alt=""
              sizes="10vh"
              className={`${styles.pose} ${styles.poseJump}`}
            />
            <Image
              src={knightSlash}
              alt=""
              sizes="15vh"
              className={`${styles.pose} ${styles.poseSlash}`}
            />
          </div>
        </div>
      </div>
      <i ref={knightDust} className={`${styles.dust} ${styles.dustKnight}`} />
    </>
  );
}

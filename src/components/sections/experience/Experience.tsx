'use client';

import Image from 'next/image';
import { useCallback, useMemo, useRef, useState } from 'react';
import cave from '@/assets/exp-cave.webp';
import jump from '@/assets/exp-knight-jump.webp';
import stand from '@/assets/exp-knight-stand.webp';
import { HkChoice } from '@/components/ui/HkChoice';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Job } from '@/content/experience';
import { useInView } from '@/hooks/useInView';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ExpDialogue } from './ExpDialogue';
import { JOURNEY_QUERY } from './modes';
import { journeyScrollTarget, useKnightJourney } from './useKnightJourney';
import { XpEntry } from './XpEntry';
import styles from './Experience.module.css';

const KNIGHT_CLASSES = {
  jumping: styles.jumping,
  facingRight: styles.facingRight,
  landing: styles.landing,
};

type ExperienceProps = { jobs: Job[]; start: { x: number; y: number } };

export function Experience({ jobs, start }: ExperienceProps) {
  const journey = useMediaQuery(JOURNEY_QUERY);
  const [sectionRef, inView] = useInView<HTMLElement>('200px');
  const track = useRef<HTMLDivElement>(null);
  const knight = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [panelJob, setPanelJob] = useState<Job | null>(null);
  const [swapping, setSwapping] = useState(false);
  const swapTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const climb = useMemo(() => [...jobs].reverse(), [jobs]);
  const stops = useMemo(() => [start, ...climb.map((job) => job.platform)], [start, climb]);

  const onRest = useCallback(
    (stop: number) => {
      if (stop === 0) return;
      clearTimeout(swapTimer.current);
      setSwapping(true);
      swapTimer.current = setTimeout(() => {
        setPanelJob(climb[stop - 1]);
        setSwapping(false);
      }, 200);
    },
    [climb],
  );

  useKnightJourney(
    { track, knight, list },
    { enabled: journey, stops, classes: KNIGHT_CLASSES, onRest },
  );

  const activate = (index: number) => {
    if (journey && track.current) {
      const stop = climb.indexOf(jobs[index]) + 1;
      scrollTo({
        top: journeyScrollTarget(track.current, stop, stops.length - 1),
        behavior: 'smooth',
      });
      return;
    }
    setOpenIndex((open) => (open === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={styles.exp}
      aria-labelledby="exp-title"
      data-offscreen={inView ? undefined : ''}
    >
      <div ref={track} className={styles.track}>
        <div className={styles.stage}>
          <SectionHeading
            id="exp-title"
            title="Experience"
            size="sm"
            rule="narrow"
            className={styles.head}
          />
          <div className={styles.view}>
            <div className={styles.scene}>
              <Image
                src={cave}
                alt=""
                sizes="(max-width: 959px) 100vw, 180vh"
                className={styles.cave}
              />
              <ol ref={list} className={styles.list}>
                {jobs.map((job, i) => (
                  <XpEntry
                    key={job.company}
                    job={job}
                    index={i}
                    open={openIndex === i}
                    onActivate={activate}
                  />
                ))}
              </ol>
              <div ref={knight} className={styles.knight} aria-hidden="true">
                <div className={styles.knightBody}>
                  <Image src={stand} alt="" sizes="9vh" className={styles.knightStand} />
                  <Image src={jump} alt="" sizes="9vh" className={styles.knightJump} />
                </div>
                <i className={styles.dust} />
              </div>
              <ExpDialogue job={panelJob} swapping={swapping} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.more}>
        <HkChoice selected size="lg" href="/experience">
          View all
        </HkChoice>
      </div>
    </section>
  );
}

import { Abyss } from '@/components/sections/abyss/Abyss';
import { EndCredits } from '@/components/sections/credits/EndCredits';
import { Experience } from '@/components/sections/experience/Experience';
import { SiteFooter } from '@/components/sections/footer/SiteFooter';
import { Hero } from '@/components/sections/hero/Hero';
import { JourneyMenu } from '@/components/sections/journey/JourneyMenu';
import { Projects } from '@/components/sections/projects/Projects';
import { TechStack } from '@/components/sections/stack/TechStack';
import { Town } from '@/components/sections/town/Town';
import { jobs, knightStart } from '@/content/experience';
import { journeyLinks } from '@/content/journey';
import { site } from '@/content/site';
import { stack } from '@/content/stack';
import { PersonJsonLd } from './PersonJsonLd';

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <Abyss revealOnHero />
      <main className="relative z-1">
        <Hero />
        <Town text={site.dialogue} />
        <JourneyMenu links={journeyLinks} />
        <Projects />
        <TechStack items={stack} />
        <Experience jobs={jobs} start={knightStart} />
        <EndCredits />
        <SiteFooter />
      </main>
    </>
  );
}

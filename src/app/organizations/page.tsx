import type { Metadata } from 'next';
import forest from '@/assets/credits-forest.webp';
import { ArchiveHeader, ArchiveShell } from '@/components/sections/archive/ArchiveShell';
import { GuildHero } from '@/components/sections/guild/GuildHero';
import { GuildJournal } from '@/components/sections/guild/GuildJournal';
import { guildGroups, guildLabels, guildPage } from '@/content/guild';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: `${guildPage.title} — ${site.name}`,
  description: guildPage.intro,
  alternates: { canonical: '/organizations' },
  openGraph: { url: '/organizations', title: `${guildPage.title} — ${site.name}` },
};

export default function OrganizationsPage() {
  return (
    <ArchiveShell>
      <GuildJournal
        groups={guildGroups}
        labels={guildLabels}
        intro={
          <GuildHero backdrop={forest}>
            <ArchiveHeader id="organizations" title={guildPage.title} intro={guildPage.intro} />
          </GuildHero>
        }
      />
    </ArchiveShell>
  );
}

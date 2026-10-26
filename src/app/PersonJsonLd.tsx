import { jobs } from '@/content/experience';
import { site } from '@/content/site';
import { stack } from '@/content/stack';

export function PersonJsonLd() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    description: site.description,
    worksFor: { '@type': 'Organization', name: jobs[0].company },
    knowsAbout: stack.map((tech) => tech.name),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }}
    />
  );
}

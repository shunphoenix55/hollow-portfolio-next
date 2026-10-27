import Link from 'next/link';
import { Ornament } from '@/components/ornament/Ornament';
import { SmokeBackground } from '@/components/ui/smoke/SmokeBackground';
import { menuLinks } from '@/content/journey';
import { site, socials } from '@/content/site';
import { SocialIcon } from './SocialIcon';
import styles from './SiteFooter.module.css';

const SMOKE_COLOR = '#8c929b';
const pageLinks = menuLinks.filter((link) => !link.href.includes('#'));

export function SiteFooter() {
  return (
    <footer id="contact" className={styles.footer}>
      <SmokeBackground color={SMOKE_COLOR} className={styles.smoke} />
      <div className={styles.lead}>
        <nav className={styles.actions} aria-label="Contact and socials">
          <a className={styles.contact} href={`mailto:${site.email}`}>
            Contact
          </a>
          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  className={styles.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <SocialIcon kind={social.kind} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.base}>
        <p className={styles.name}>{site.name}</p>
        <div className={styles.side}>
          <p className={styles.mark}>{site.shortRole}</p>
          <Ornament name="orn-flourish" className={styles.rule} />
          <div className={styles.meta}>
            <p className={styles.copy}>{site.copyright}</p>
            <ul className={styles.links}>
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { SiteLink } from './SiteLink';
import type { Route } from '../hooks/useRoute';

const PAGES: { route: Route; href: string; label: string }[] = [
    { route: 'home', href: '/', label: 'Calculator' },
    { route: 'faq', href: '/faq', label: 'FAQ' },
    { route: 'about', href: '/about', label: 'About' },
];

export function SiteNav({ current }: { current: Route }) {
    return (
        <nav className="site-nav" aria-label="Site">
            <SiteLink href="/" className="site-brand">
                CareCompare
            </SiteLink>
            <ul>
                {PAGES.map((page) => (
                    <li key={page.route}>
                        <SiteLink
                            href={page.href}
                            aria-current={
                                page.route === current ? 'page' : undefined
                            }
                        >
                            {page.label}
                        </SiteLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

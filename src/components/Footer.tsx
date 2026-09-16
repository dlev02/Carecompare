import { ArrowUpRight } from 'lucide-react';
import { SiteLink } from './SiteLink';

export function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer-inner">
                <div className="site-footer-row">
                    <SiteLink href="/" className="site-brand">
                        CareCompare
                    </SiteLink>
                    <ul className="site-footer-links">
                        <li>
                            <SiteLink href="/#calculator">Calculator</SiteLink>
                        </li>
                        <li>
                            <SiteLink href="/faq">FAQ</SiteLink>
                        </li>
                        <li>
                            <SiteLink href="/about">About</SiteLink>
                        </li>
                        <li>
                            <a
                                href="https://github.com/dlev02/carecompare"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Source <ArrowUpRight size={12} />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="site-footer-row site-footer-meta">
                    <p>
                        U.S. estimates. Prices checked September 9, 2026. Not
                        affiliated with Apple.
                    </p>
                    <p>
                        Designed and developed by{' '}
                        <a
                            href="https://drewlevinson.me"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Drew Levinson
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

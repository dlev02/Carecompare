import { ArrowUpRight } from 'lucide-react';
import { SiteNav } from './SiteNav';
import { SiteLink } from './SiteLink';

export function AboutPage() {
    return (
        <main className="page-content about-page">
            <SiteNav current="about" />
            <header className="page-hero">
                <h1>
                    Built to skip
                    <br />
                    <em>the math.</em>
                </h1>
                <p>
                    A two-minute answer to a question that used to take a
                    spreadsheet.
                </p>
            </header>
            <div className="about-layout">
                <aside className="about-rail" aria-label="At a glance">
                    <dl>
                        <div>
                            <dt>Compares</dt>
                            <dd>
                                AppleCare+, One Individual and One Family for
                                up to six people
                            </dd>
                        </div>
                        <div>
                            <dt>Runs</dt>
                            <dd>Entirely in your browser</dd>
                        </div>
                        <div>
                            <dt>Collects</dt>
                            <dd>Nothing. No account, no analytics</dd>
                        </div>
                        <div>
                            <dt>Source</dt>
                            <dd>
                                <a
                                    href="https://github.com/dlev02/carecompare"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open on GitHub, MIT licensed{' '}
                                    <ArrowUpRight size={13} />
                                </a>
                            </dd>
                        </div>
                    </dl>
                </aside>
                <article className="about-story">
                    <h2>Why this exists</h2>
                    <p>
                        When AppleCare One launched, I wanted a quick answer to
                        one question: is it worth it for me? Working that out
                        by hand meant listing every device, pricing AppleCare+
                        for each one, then trying bundle after bundle. MacBook,
                        iPad and iPhone. Swap the iPad out. Add the AirPods
                        Max. Find the point where one more device tips the
                        balance.
                    </p>
                    <p>
                        Then One Family arrived and the question got harder.
                        For a family of five with a pile of devices, the
                        cheapest answer might be one Family plan, a few
                        Individual plans, or a mix where some devices stay on
                        AppleCare+. That is too many combinations to keep in
                        your head.
                    </p>
                    <p>
                        CareCompare is the shortcut. Add your devices, add the
                        people you share with, and it checks every combination
                        for you. A couple of minutes and you are done.
                    </p>
                    <h2>What it does</h2>
                    <p>
                        For each person it compares AppleCare+ on every device
                        with every possible One Individual bundle, keeping
                        cheaper devices on their own plan when that wins. In
                        family mode it puts One Family up against the best
                        separate setup for the whole household. You can enter
                        what you pay today to see the difference against your
                        real bill.
                    </p>
                    <h2>What it doesn’t do</h2>
                    <p>
                        It doesn’t check whether Apple will accept a device,
                        quote taxes or service fees, or work out refunds on a
                        plan you cancel. Prices come from Apple’s published
                        U.S. rates on the date listed in the{' '}
                        <SiteLink href="/faq#about">FAQ</SiteLink>, and older
                        plans can differ. Apple has the final word on
                        eligibility and price.
                    </p>
                    <h2>Who made it</h2>
                    <p>
                        <a
                            href="https://drewlevinson.me"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Drew Levinson
                        </a>
                        , for my own household first. CareCompare is not
                        affiliated with or endorsed by Apple. If a price looks
                        wrong, the pricing sources file in the repository
                        shows where each number came from.
                    </p>
                    <SiteLink href="/#calculator" className="about-cta">
                        Try it with your devices <ArrowUpRight size={15} />
                    </SiteLink>
                </article>
            </div>
        </main>
    );
}

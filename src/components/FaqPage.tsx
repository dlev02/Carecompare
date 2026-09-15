import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SiteLink } from './SiteLink';
import { APPLECARE_ONE, APPLECARE_FAMILY } from '../hooks/useCalculator';

interface Entry {
    q: string;
    a: ReactNode;
}
interface Group {
    id: string;
    title: string;
    entries: Entry[];
}

const one = APPLECARE_ONE;
const family = APPLECARE_FAMILY;

const GROUPS: Group[] = [
    {
        id: 'plans',
        title: 'The plans',
        entries: [
            {
                q: 'What does AppleCare One Family cover?',
                a: (
                    <p>
                        Every eligible device across one Family Sharing group
                        of up to {family.maxPeople} people, for $
                        {family.monthly.toFixed(2)} a month. There is no
                        per-device add-on charge. U.S. availability began{' '}
                        {family.available}.
                    </p>
                ),
            },
            {
                q: 'How is One Individual priced?',
                a: (
                    <p>
                        ${one.base.toFixed(2)} a month covers up to{' '}
                        {one.baseSlots} eligible devices. Each device after
                        that adds ${one.additional.toFixed(2)} a month. One
                        person’s slots cannot be shared with anyone else, so
                        each family member needs their own Individual plan.
                    </p>
                ),
            },
            {
                q: 'How many theft and loss claims do I get?',
                a: (
                    <>
                        <p>
                            Family shares six theft and loss claims a year
                            across iPhone, iPad and Apple Watch. One Individual
                            allows three. AppleCare+ with Theft and Loss allows
                            two per covered device.
                        </p>
                        <p>
                            Accidental damage repairs are unlimited on every
                            plan. Service fees and deductibles apply to each
                            claim.
                        </p>
                    </>
                ),
            },
        ],
    },
    {
        id: 'eligibility',
        title: 'Eligibility',
        entries: [
            {
                q: 'Can older devices join One?',
                a: (
                    <p>
                        Apple lists devices four years old or newer, or
                        headphones one year old or newer, in good condition.
                        Products already covered by AppleCare+ can also
                        qualify. Apple may require a device check before it
                        enrolls a device.
                    </p>
                ),
            },
            {
                q: 'What does “Eligible for One” do?',
                a: (
                    <p>
                        Unchecking it keeps that device on its own AppleCare+
                        plan in every comparison. Use it for anything Apple
                        won’t accept into One, or anything you would rather
                        leave on its current plan.
                    </p>
                ),
            },
            {
                q: 'Does adding a device here mean it is covered?',
                a: (
                    <p>
                        No. Picking a model only feeds the math. Apple confirms
                        eligibility and final pricing when you enroll, and
                        older plans can carry different prices and benefits.
                    </p>
                ),
            },
        ],
    },
    {
        id: 'math',
        title: 'How the math works',
        entries: [
            {
                q: 'How is the lowest cost chosen?',
                a: (
                    <>
                        <p>
                            For each person, AppleCare+ for every device is
                            compared with every possible One Individual bundle
                            size. The most expensive plans go into the bundle;
                            the rest stay on AppleCare+ when that is cheaper.
                        </p>
                        <p>
                            In family mode, One Family at $
                            {family.monthly.toFixed(2)} plus separate coverage
                            for any ineligible devices is compared with the
                            sum of each person’s cheapest setup. Equal totals
                            are shown as a tie.
                        </p>
                    </>
                ),
            },
            {
                q: 'What changes between monthly and annual?',
                a: (
                    <p>
                        Monthly uses monthly rates times twelve. Annual uses
                        Apple’s published annual AppleCare+ price where one
                        exists and falls back to monthly times twelve
                        otherwise. One plans are billed monthly either way.
                        Taxes, service fees and cancellation refunds are left
                        out.
                    </p>
                ),
            },
            {
                q: 'How does “Current spending” work?',
                a: (
                    <p>
                        It starts from the catalog’s monthly rate for each
                        selected device. Choose One Individual if that is what
                        a person pays today, or enter an actual monthly total
                        for mixed, grandfathered or prepaid plans. For prepaid
                        coverage, divide the total by the number of covered
                        months. The calculator compares costs only; it does
                        not work out refunds.
                    </p>
                ),
            },
            {
                q: 'Why do some devices say “Older rate” or “Refurb offer”?',
                a: (
                    <p>
                        Older rate marks an inherited price that was not
                        re-verified in the latest update. Refurb offer marks
                        Apple’s current price for a refurbished product. An
                        existing subscription may differ from both, so enter
                        your real bill for an exact comparison.
                    </p>
                ),
            },
        ],
    },
    {
        id: 'about',
        title: 'About this site',
        entries: [
            {
                q: 'Where do the prices come from?',
                a: (
                    <p>
                        Apple’s official U.S. AppleCare pages, checked
                        September 9, 2026. Every source and its date is listed
                        in the{' '}
                        <a
                            href="https://github.com/dlev02/carecompare/blob/main/docs/pricing-sources.md"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            pricing sources
                        </a>{' '}
                        file. CareCompare is not affiliated with Apple.
                    </p>
                ),
            },
            {
                q: 'What happens to my data?',
                a: (
                    <p>
                        Nothing leaves your browser. There is no account, no
                        backend and no analytics. Your device list lives only
                        on this page and is gone when you close the tab.
                    </p>
                ),
            },
        ],
    },
];

/** Questions numbered continuously across groups, computed once. */
const NUMBERED = GROUPS.map((group, groupIndex) => ({
    ...group,
    entries: group.entries.map((entry, index) => ({
        ...entry,
        number: String(
            GROUPS.slice(0, groupIndex).reduce(
                (sum, item) => sum + item.entries.length,
                0
            ) +
                index +
                1
        ).padStart(2, '0'),
    })),
}));

export function FaqPage() {
    return (
        <main className="page-content faq-page">
            <nav className="site-nav" aria-label="Site">
                <SiteLink href="/" className="site-brand">
                    CareCompare
                </SiteLink>
                <ul>
                    <li>
                        <SiteLink href="/#calculator">Back to the calculator</SiteLink>
                    </li>
                </ul>
            </nav>
            <header className="page-hero">
                <h1>
                    Questions,
                    <br />
                    <em>answered.</em>
                </h1>
                <p>
                    What the plans include, who qualifies, and exactly how
                    the calculator adds it up.
                </p>
            </header>
            <div className="faq-layout">
                <aside className="faq-rail" aria-label="Sections">
                    <ol>
                        {GROUPS.map((group) => (
                            <li key={group.id}>
                                <a href={`#${group.id}`}>{group.title}</a>
                            </li>
                        ))}
                    </ol>
                    <a
                        className="faq-external"
                        href="https://www.apple.com/applecare/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Apple’s coverage details <ArrowUpRight size={14} />
                    </a>
                </aside>
                <div className="faq-groups">
                    {NUMBERED.map((group) => (
                        <section
                            key={group.id}
                            id={group.id}
                            aria-labelledby={`${group.id}-title`}
                        >
                            <h2 id={`${group.id}-title`}>{group.title}</h2>
                            <dl>
                                {group.entries.map((entry) => (
                                    <div key={entry.q} className="faq-item">
                                        <dt>
                                            <span aria-hidden="true">
                                                {entry.number}
                                            </span>
                                            {entry.q}
                                        </dt>
                                        <dd>{entry.a}</dd>
                                    </div>
                                ))}
                            </dl>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}

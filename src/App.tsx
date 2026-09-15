import { useEffect, useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowUpRight, Users, UserRound } from 'lucide-react';
import { DeviceSelector } from './components/DeviceSelector';
import { HouseholdEditor } from './components/HouseholdEditor';
import { ResultsDisplay } from './components/ResultsDisplay';
import { TickerTape } from './components/TickerTape';
import { ThemeToggle } from './components/ThemeToggle';
import { Footer } from './components/Footer';
import { FaqPage } from './components/FaqPage';
import { SiteLink } from './components/SiteLink';
import { useCalculator } from './hooks/useCalculator';
import { useRoute } from './hooks/useRoute';
import type { Billing, Person } from './hooks/useCalculator';

const makePerson = (name: string): Person => ({
    id: crypto.randomUUID(),
    name,
    devices: [],
    currentPlan: 'plus',
    currentBill: '',
});
const TITLES = {
    home: 'CareCompare | AppleCare+ vs One Individual vs Family',
    faq: 'FAQ | CareCompare',
    about: 'About | CareCompare',
};
function App() {
    const route = useRoute();
    useEffect(() => {
        document.title = TITLES[route];
    }, [route]);
    return (
        <MotionConfig reducedMotion="user">
            <div className="swiss-bg">
                <div className="swiss-grid" aria-hidden="true" />
                <TickerTape />
                <ThemeToggle />
                {route === 'faq' ? <FaqPage /> : <Calculator />}
                <Footer />
            </div>
        </MotionConfig>
    );
}
function Calculator() {
    const [people, setPeople] = useState<Person[]>(() => [makePerson('You')]);
    const [familyMode, setFamilyMode] = useState(false);
    const [activeId, setActiveId] = useState('');
    const [billing, setBilling] = useState<Billing>('monthly');
    const visiblePeople = familyMode ? people : people.slice(0, 1);
    const active =
        visiblePeople.find((person) => person.id === activeId) ??
        visiblePeople[0];
    const result = useCalculator(visiblePeople, billing, familyMode);
    const updatePerson = (person: Person) =>
        setPeople((current) =>
            current.map((item) => (item.id === person.id ? person : item))
        );
    const addPerson = () => {
        if (people.length >= 6) return;
        const person = makePerson(`Person ${people.length + 1}`);
        setPeople((current) => [...current, person]);
        setActiveId(person.id);
    };
    return (
        <main className="page-content">
            <nav className="site-nav" aria-label="Site">
                <SiteLink href="/" className="site-brand">
                    CareCompare
                </SiteLink>
                <ul>
                    <li>
                        <SiteLink href="/faq">FAQ</SiteLink>
                    </li>
                </ul>
            </nav>
            <motion.header
                className="hero"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="swiss-headline">
                    COMPARE<span>.</span>
                    <br />
                    CALCULATE<span>.</span>
                    <br />
                    <em>SAVE.</em>
                </h1>
                <div className="hero-copy">
                    <p>
                        Find the right AppleCare plan for you.
                        <br />
                        Or everyone you call family.
                    </p>
                    <p className="hero-description">
                        Add your devices. See AppleCare+, One Individual and
                        the new One Family side by side, with the lowest cost
                        worked out for you.
                    </p>
                    <a href="#calculator">
                        Let’s do the math <span>↘</span>
                    </a>
                </div>
            </motion.header>
            <section
                id="calculator"
                className="calculator"
                aria-label="AppleCare calculator"
            >
                <div
                    className="scope-toggle"
                    aria-label="Who are you comparing for?"
                >
                    <button
                        aria-pressed={!familyMode}
                        onClick={() => setFamilyMode(false)}
                    >
                        <UserRound size={17} /> Just me
                    </button>
                    <button
                        aria-pressed={familyMode}
                        onClick={() => setFamilyMode(true)}
                    >
                        <Users size={18} /> My family
                    </button>
                </div>
                <div className="calculator-columns">
                    <section
                        className="device-panel"
                        aria-label="Build your device list"
                    >
                        <div className="section-heading">
                            <span>01</span>
                            <h2>
                                {familyMode
                                    ? 'BUILD YOUR FAMILY'
                                    : 'CHOOSE YOUR DEVICES'}
                            </h2>
                        </div>
                        <HouseholdEditor
                            billing={billing}
                            comparisonMonthly={result.best / 1200}
                            people={visiblePeople}
                            activeId={active.id}
                            familyMode={familyMode}
                            onActive={setActiveId}
                            onAddPerson={addPerson}
                            onUpdate={updatePerson}
                            onRemovePerson={(id) => {
                                setPeople((current) =>
                                    current.filter(
                                        (person) => person.id !== id
                                    )
                                );
                                setActiveId(people[0].id);
                                requestAnimationFrame(() =>
                                    document
                                        .querySelector<HTMLButtonElement>(
                                            `[data-person-id="${people[0].id}"]`
                                        )
                                        ?.focus()
                                );
                            }}
                        >
                            <DeviceSelector
                                key={active.id}
                                devices={active.devices}
                                personName={active.name}
                                familyMode={familyMode}
                                onAdd={(device) =>
                                    updatePerson({
                                        ...active,
                                        devices: [
                                            ...active.devices,
                                            {
                                                id: crypto.randomUUID(),
                                                device,
                                                eligible: true,
                                            },
                                        ],
                                    })
                                }
                            />
                        </HouseholdEditor>
                    </section>
                    <ResultsDisplay
                        result={result}
                        familyMode={familyMode}
                        billing={billing}
                        onBilling={setBilling}
                    />
                </div>
            </section>
            <aside className="faq-teaser" aria-label="More information">
                <p>
                    Wondering about eligibility, claim limits, or how the math
                    works?
                </p>
                <SiteLink href="/faq">
                    Read the FAQ <ArrowUpRight size={15} />
                </SiteLink>
            </aside>
            <div className="page-foot">
                <p>
                    U.S. estimates · Prices checked September 9, 2026 · Not
                    affiliated with Apple.
                </p>
                <a
                    href="https://github.com/dlev02/carecompare"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View source <ArrowUpRight size={15} />
                </a>
            </div>
        </main>
    );
}
export default App;

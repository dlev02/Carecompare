import { useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowUpRight, Users, UserRound } from 'lucide-react';
import { DeviceSelector } from './components/DeviceSelector';
import { HouseholdEditor } from './components/HouseholdEditor';
import { ResultsDisplay } from './components/ResultsDisplay';
import { TickerTape } from './components/TickerTape';
import { ThemeToggle } from './components/ThemeToggle';
import { Footer } from './components/Footer';
import { useCalculator } from './hooks/useCalculator';
import type { Billing, Person } from './hooks/useCalculator';

const makePerson = (name: string): Person => ({
    id: crypto.randomUUID(),
    name,
    devices: [],
    currentPlan: 'plus',
    currentBill: '',
});
function App() {
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
        <MotionConfig reducedMotion="user">
            <div className="swiss-bg">
                <div className="swiss-grid" aria-hidden="true" />
                <TickerTape />
                <ThemeToggle />
                <main className="page-content">
                    <motion.header
                        className="hero"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <span className="swiss-label hero-kicker">
                                CareCompare / AppleCare calculator
                            </span>
                            <h1 className="swiss-headline">
                                COMPARE<span>.</span>
                                <br />
                                CALCULATE<span>.</span>
                                <br />
                                <em>SAVE.</em>
                            </h1>
                        </div>
                        <div className="hero-copy">
                            <p>
                                Find the right AppleCare plan for you.
                                <br />
                                Or everyone you call family.
                            </p>
                            <p className="hero-description">
                                Compare AppleCare+, One Individual, and the new
                                One Family plan. Up to six people for $49.99 a
                                month, starting September 14.
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
                                <p className="panel-intro">
                                    {familyMode
                                        ? 'Add each person and their devices. We’ll compare the whole household.'
                                        : 'Add the devices you want to cover. We’ll find the lowest-cost combination.'}
                                </p>
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
                                />
                                <DeviceSelector
                                    devices={active.devices}
                                    personName={active.name}
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
                            </section>
                            <ResultsDisplay
                                result={result}
                                familyMode={familyMode}
                                billing={billing}
                                onBilling={setBilling}
                            />
                        </div>
                    </section>
                    <section
                        className="coverage-guide"
                        aria-labelledby="coverage-heading"
                    >
                        <div>
                            <span className="swiss-label">
                                The details that matter
                            </span>
                            <h2 id="coverage-heading">
                                Same family.
                                <br />A few ground rules.
                            </h2>
                            <a
                                href="https://www.apple.com/applecare/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Read Apple’s coverage details{' '}
                                <ArrowUpRight size={15} />
                            </a>
                        </div>
                        <div className="coverage-facts">
                            <article>
                                <span>01 / THE PEOPLE</span>
                                <h3>Six people. One Family Sharing group.</h3>
                                <p>
                                    Family covers every eligible device across
                                    the group for $49.99/month, with no
                                    per-device add-on charge. U.S. availability
                                    begins September 14, 2026.
                                </p>
                            </article>
                            <article>
                                <span>02 / THE COVERAGE</span>
                                <h3>
                                    Six theft and loss claims. Unlimited
                                    accidents.
                                </h3>
                                <p>
                                    The six claims are shared per year across
                                    iPhone, iPad, and Apple Watch. One
                                    Individual allows three; AppleCare+ with
                                    Theft and Loss allows two per covered
                                    device. Service fees and deductibles apply.
                                </p>
                            </article>
                            <article>
                                <span>03 / THE DEVICES</span>
                                <h3>Older devices can qualify, too.</h3>
                                <p>
                                    Apple lists devices four years old or newer,
                                    or headphones one year old or newer, in good
                                    condition. Products already covered by
                                    AppleCare+ can also qualify. Apple may
                                    require a device check. Uncheck “Eligible
                                    for One” to keep a device on its separate
                                    plan in the math.
                                </p>
                            </article>
                            <article>
                                <span>04 / YOUR EXISTING PLANS</span>
                                <h3>Compare your real bill.</h3>
                                <p>
                                    Use “Current spending” for each person to
                                    enter older rates, prepaid coverage, or a
                                    mix of plans. Historical plans may have
                                    different benefits. This calculator compares
                                    costs; it doesn’t verify coverage or
                                    calculate refunds.
                                </p>
                            </article>
                        </div>
                    </section>
                    <div className="source-note">
                        <p>
                            U.S. estimates · New plan and current prices checked
                            September 9, 2026.
                            <br />
                            Legacy entries include older reference rates and
                            verified Apple refurbished offers. Not affiliated
                            with Apple.
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
                <Footer />
            </div>
        </MotionConfig>
    );
}
export default App;

import type { Billing, CalculationResult } from '../hooks/useCalculator';
import { AnimatedPrice } from './AnimatedPrice';
import { SiteLink } from './SiteLink';
interface Props {
    result: CalculationResult;
    familyMode: boolean;
    billing: Billing;
    onBilling: (billing: Billing) => void;
}
const monthly = (annualCents: number) => annualCents / 1200;
export function ResultsDisplay({
    result,
    familyMode,
    billing,
    onBilling,
}: Props) {
    const rows = [
        {
            id: 'plus',
            title: 'AppleCare+ per device',
            subtitle:
                result.billing === 'annual'
                    ? 'Annual rates where available'
                    : 'Every device on a separate plan',
            cost: result.plus,
        },
        {
            id: 'separate',
            title: familyMode
                ? 'Best mix, person by person'
                : 'AppleCare One Individual',
            subtitle: familyMode
                ? result.people.every(
                      (person) => person.bundledIds.length === 0
                  )
                    ? 'Same as per-device plans for these devices'
                    : 'AppleCare+ and One Individual, optimized'
                : 'A bundle + separate plans where cheaper',
            cost: familyMode ? result.separate : result.one,
        },
        ...(familyMode
            ? [
                  {
                      id: 'family',
                      title: 'AppleCare One Family',
                      subtitle: result.excluded
                          ? `$49.99 + separate plans for ${result.excluded} excluded`
                          : 'All eligible devices · up to 6 people',
                      cost: result.family,
                  },
              ]
            : []),
    ];
    const winners = rows.filter(
        (row) => row.cost !== null && row.cost === result.best
    );
    const allPlus =
        familyMode &&
        result.people.every((person) => person.bundledIds.length === 0);
    const meaningfulWinners = allPlus
        ? winners.filter((row) => row.id !== 'separate')
        : winners;
    const familyWins = meaningfulWinners.some((row) => row.id === 'family');
    const winnerTitle =
        meaningfulWinners.length > 1
            ? 'The lowest-cost options tie.'
            : familyWins
              ? result.excluded
                  ? 'Family + separate coverage costs least.'
                  : 'One plan. Everyone covered.'
              : familyMode
                ? allPlus
                    ? 'AppleCare+ costs less.'
                    : 'Separate plans cost less.'
                : winners[0]?.id === 'plus'
                  ? 'Keep it simple. Pay per device.'
                  : 'Bring your devices together.';
    const saving =
        result.current === null ? null : result.current - result.best;
    return (
        <section
            id="comparison"
            className="results"
            aria-label="Cost comparison"
        >
            <div className="section-heading results-heading">
                <span>02</span>
                <h2>SEE THE DIFFERENCE</h2>
                <div className="billing-control">
                    <span className="swiss-label">AppleCare+ billing</span>
                    <div>
                        <button
                            aria-pressed={billing === 'monthly'}
                            onClick={() => onBilling('monthly')}
                        >
                            Monthly
                        </button>
                        <button
                            aria-pressed={billing === 'annual'}
                            onClick={() => onBilling('annual')}
                        >
                            Annual
                        </button>
                    </div>
                </div>
            </div>
            {!result.count ? (
                <div className="results-empty">
                    <h3>
                        A little math.
                        <br />A clearer choice.
                    </h3>
                    <p>
                        {familyMode
                            ? 'Add each person’s devices and we’ll compare separate plans with Family.'
                            : 'Add your devices and we’ll compare AppleCare+ with One Individual.'}
                    </p>
                    <div className="empty-plan-preview">
                        <span>
                            One Individual
                            <strong>
                                $19.99<small>/mo</small>
                            </strong>
                            <small>3 devices, then $5.99 each</small>
                        </span>
                        <span>
                            One Family
                            <strong>
                                $49.99<small>/mo</small>
                            </strong>
                            <small>All eligible family devices</small>
                        </span>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className="result-verdict"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <span className="swiss-label">
                            {result.count}{' '}
                            {result.count === 1 ? 'device' : 'devices'} ·{' '}
                            {familyMode
                                ? `${result.people.length} people`
                                : '1 person'}
                        </span>
                        <h3>{winnerTitle}</h3>
                        <p>
                            {meaningfulWinners.length > 1
                                ? 'Different coverage options have the same estimated cost.'
                                : `Lowest estimated cost: $${monthly(result.best).toFixed(2)}/month${result.billing === 'annual' ? ' equivalent' : ''}.`}
                        </p>
                    </div>
                    <div className="comparison-rows">
                        {rows.map((row) => (
                            <div
                                key={row.id}
                                className={`comparison-row ${row.cost === result.best ? 'is-best' : ''}`}
                            >
                                <div className="comparison-row-top">
                                    <h4>{row.title}</h4>
                                    {row.cost === result.best && (
                                        <span className="value-label">
                                            {allPlus && row.id === 'separate'
                                                ? 'Same setup'
                                                : meaningfulWinners.length > 1
                                                  ? 'Tied lowest'
                                                  : 'Lowest cost'}
                                        </span>
                                    )}
                                </div>
                                <p>
                                    {row.subtitle}
                                </p>
                                {row.cost === null ? (
                                    <span className="small-note">
                                        No devices marked eligible
                                    </span>
                                ) : (
                                    <div className="comparison-price">
                                        <div>
                                            <AnimatedPrice
                                                value={monthly(row.cost)}
                                            />
                                            <small>
                                                /mo
                                                {result.billing === 'annual'
                                                    ? ' equiv.'
                                                    : ''}
                                            </small>
                                        </div>
                                        <span>
                                            ${(row.cost / 100).toFixed(2)} /
                                            year
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {saving !== null ? (
                        <div className="savings-line">
                            <div>
                                <span className="swiss-label">
                                    {saving > 0
                                        ? 'Compared with current spending'
                                        : saving === 0
                                          ? 'Already at the lowest estimate'
                                          : 'Compared with your current bill'}
                                </span>
                                <p>
                                    {saving > 0
                                        ? 'You could save'
                                        : saving === 0
                                          ? 'No change in estimated cost'
                                          : 'Full selected coverage costs more'}
                                </p>
                            </div>
                            {saving !== 0 && (
                                <strong>
                                    ${(Math.abs(saving) / 100).toFixed(2)}
                                    <small>/year</small>
                                </strong>
                            )}
                        </div>
                    ) : (
                        <p className="small-note bill-missing">
                            Enter a valid monthly bill under “Current spending”
                            to compare with what you pay now.
                        </p>
                    )}
                    <details className="math-details">
                        <summary>How we worked it out</summary>
                        <div>
                            {result.current !== null && (
                                <p>
                                    Current spending: $
                                    {monthly(result.current).toFixed(2)}/mo,
                                    from monthly catalog rates unless you
                                    entered a bill.
                                </p>
                            )}
                            {familyMode && (
                                <h4 className="math-subheading">
                                    {familyWins
                                        ? 'Separate-plan alternative'
                                        : 'Lowest-cost separate plans'}
                                </h4>
                            )}
                            {result.people
                                .filter((row) => row.person.devices.length)
                                .map((row) => (
                                    <div
                                        className="person-math"
                                        key={row.person.id}
                                    >
                                        <strong>
                                            {row.person.name ||
                                                'Unnamed person'}{' '}
                                            <span>
                                                ${monthly(row.best).toFixed(2)}
                                                /mo
                                                {result.billing === 'annual'
                                                    ? ' equiv.'
                                                    : ''}
                                            </span>
                                        </strong>
                                        <p>
                                            {row.bundledIds.length
                                                ? `${row.bundledIds.length} in One Individual; ${row.person.devices.length - row.bundledIds.length} on separate AppleCare+.`
                                                : 'AppleCare+ for each device costs least.'}
                                        </p>
                                        {row.bundledIds.length > 0 && (
                                            <p>
                                                In One:{' '}
                                                {row.person.devices
                                                    .filter((item) =>
                                                        row.bundledIds.includes(
                                                            item.id
                                                        )
                                                    )
                                                    .map(
                                                        (item) =>
                                                            item.device.name
                                                    )
                                                    .join(', ')}
                                                .
                                            </p>
                                        )}
                                    </div>
                                ))}
                            <p>
                                {result.billing === 'annual'
                                    ? 'Annual AppleCare+ prices where published, otherwise monthly × 12; One plans stay monthly.'
                                    : 'Monthly rates × 12 for every plan.'}{' '}
                                Taxes, service fees and refunds are excluded.{' '}
                                <SiteLink href="/faq#math">
                                    How the math works
                                </SiteLink>
                            </p>
                        </div>
                    </details>
                </>
            )}
        </section>
    );
}

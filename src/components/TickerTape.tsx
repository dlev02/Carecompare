const TICKER_ITEMS = [
    'AppleCare One — $19.99/mo covers any 3 devices',
    '+$5.99/mo per additional device',
    'Theft & loss included on iPhone, iPad & Apple Watch',
    '3 pooled theft & loss claims per year on One — vs 2 per device plan',
    'Annual billing = 10× monthly — two months free',
    'All math runs locally — nothing leaves your browser',
    'Pricing verified July 2026',
];

/** Editorial marquee strip — pauses on hover */
export function TickerTape() {
    const run = TICKER_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
            <span className="px-6">{item}</span>
            <span className="inline-block w-2 h-2 bg-[var(--swiss-accent)]" aria-hidden="true" />
        </span>
    ));

    return (
        <div className="ticker-tape relative z-10" aria-hidden="true">
            <div className="ticker-content">{run}</div>
            <div className="ticker-content">{run}</div>
        </div>
    );
}

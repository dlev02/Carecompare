const TICKER_ITEMS = [
    'One Individual / 3 devices from $19.99 a month',
    'One Family / $49.99 a month / available Sept 14',
    'All eligible devices for up to 6 people',
    'Family / 6 shared theft and loss claims per year',
    'Unlimited accidental damage repairs / service fees apply',
    'All calculations stay in your browser',
];

/** Editorial marquee strip — pauses on hover */
export function TickerTape() {
    const run = TICKER_ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
            <span className="px-6">{item}</span>
            <span
                className="inline-block w-2 h-2 bg-[var(--swiss-accent)]"
                aria-hidden="true"
            />
        </span>
    ));

    return (
        <div className="ticker-tape relative z-10" aria-hidden="true">
            <div className="ticker-content">{run}</div>
            <div className="ticker-content">{run}</div>
        </div>
    );
}

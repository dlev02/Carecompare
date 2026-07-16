import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { CalculationResult } from '../hooks/useCalculator';
import { APPLECARE_ONE } from '../hooks/useCalculator';
import type { Device } from '../data/devices';
import { DeviceIconMap } from './deviceIcons';
import { AnimatedPrice } from './AnimatedPrice';

function PriceCard({
    title,
    monthly,
    annual,
    isRecommended,
    savingsPercent,
}: {
    title: string;
    monthly: number;
    annual: number;
    isRecommended: boolean;
    savingsPercent: number;
}) {
    const cardClass = `${isRecommended ? 'pt-12' : 'pt-8'} pb-6 px-4 sm:px-6 ${isRecommended
        ? 'bg-[var(--swiss-bg)] border-2 border-[var(--swiss-accent)] shadow-[4px_4px_0_0_var(--swiss-accent)]'
        : 'bg-[var(--swiss-card-bg)] border-2 border-[var(--swiss-card-border)] shadow-[4px_4px_0_0_var(--swiss-card-border)]'
        } relative transition-all duration-400 overflow-hidden`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cardClass}
        >
            {isRecommended && (
                <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 uppercase font-mono whitespace-nowrap bg-[var(--swiss-accent)] text-white"
                >
                    Best value{savingsPercent >= 1 ? ` −${Math.round(savingsPercent)}%` : ''}
                </motion.div>
            )}
            <div className="mb-3 text-[var(--swiss-text)] opacity-60 font-mono uppercase text-[10px] leading-tight tracking-tight">
                {title}
            </div>
            <div className="flex flex-col">
                <AnimatedPrice
                    value={monthly}
                    className="font-bold text-[var(--swiss-text)] font-mono tracking-tighter text-2xl sm:text-3xl lg:text-4xl tabular-nums"
                />
                <span className="text-[var(--swiss-text)] font-mono uppercase text-[10px] opacity-70 leading-none mt-1">/mo</span>
            </div>
            <div className="text-[11px] sm:text-sm mt-2 text-[var(--swiss-text)] opacity-40 font-mono tabular-nums">
                ${annual.toFixed(2)}/year
            </div>
        </motion.div>
    );
}

/** Swiss data bars — costs drawn to a common scale */
function CostBars({ result }: { result: CalculationResult }) {
    const max = Math.max(result.individualMonthly, result.bundleMonthly);
    if (max <= 0) return null;

    const rows = [
        { label: 'Individual', value: result.individualMonthly, wins: result.recommendation === 'individual' },
        { label: 'One Bundle', value: result.bundleMonthly, wins: result.recommendation === 'bundle' },
    ];

    return (
        <div className="mb-8 space-y-3">
            {rows.map(row => (
                <div key={row.label}>
                    <div className="flex justify-between items-baseline mb-1">
                        <span className="font-mono uppercase text-[10px] tracking-widest text-[var(--swiss-muted)]">{row.label}</span>
                        <span className="font-mono text-[11px] tabular-nums text-[var(--swiss-text)] opacity-70">${row.value.toFixed(2)}/mo</span>
                    </div>
                    <div className="swiss-bar-track">
                        <motion.div
                            className="swiss-bar-fill"
                            style={{ background: row.wins ? 'var(--swiss-accent)' : 'var(--swiss-card-border)' }}
                            initial={false}
                            animate={{ scaleX: row.value / max }}
                            transition={{ type: 'spring', stiffness: 180, damping: 26 }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

interface ResultsDisplayProps {
    result: CalculationResult;
    selectedDevices: Device[];
    onRemoveDevice: (device: Device) => void;
}

export function ResultsDisplay({ result, selectedDevices, onRemoveDevice }: ResultsDisplayProps) {
    const hasDevices = selectedDevices.length > 0;

    const containerClass = 'bg-[var(--swiss-card-bg)] p-6 md:p-8 border-2 border-[var(--swiss-card-border)] relative transition-colors duration-400 after:absolute after:inset-0 after:bg-[var(--swiss-card-border)] after:translate-x-1 after:translate-y-1 after:-z-10';

    const badgeClass = result.recommendation === 'bundle' && hasDevices
        ? 'bg-[var(--swiss-accent)] text-white px-4 py-2 font-mono text-xs uppercase inline-block'
        : 'bg-[var(--swiss-button-bg)] text-[var(--swiss-button-text)] px-4 py-2 font-mono text-xs uppercase inline-block';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={containerClass}
        >
            {/* Recommendation Badge */}
            <div className="text-center mb-8">
                <motion.div
                    key={hasDevices ? result.recommendation : 'empty'}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={badgeClass}
                >
                    {!hasDevices
                        ? '■ Select devices to compare'
                        : result.recommendation === 'bundle'
                            ? '▲ AppleCare One saves you money'
                            : result.recommendation === 'individual'
                                ? '▼ Individual plans are cheaper'
                                : '= Both options cost the same'}
                </motion.div>
            </div>

            {!hasDevices ? (
                /* Empty state that teaches the tool */
                <div className="border-2 border-dashed border-[var(--swiss-card-border)] p-6 text-center">
                    <p className="font-mono text-xs uppercase tracking-widest text-[var(--swiss-muted)] leading-relaxed">
                        AppleCare One bundles any {APPLECARE_ONE.baseSlots} devices for ${APPLECARE_ONE.base}/mo.
                        <br /><br />
                        Pick your ecosystem on the left and the math appears here.
                    </p>
                </div>
            ) : (
                <>
                    {/* Price Comparison */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
                        <PriceCard
                            title="Individual AppleCare+"
                            monthly={result.individualMonthly}
                            annual={result.individualAnnual}
                            isRecommended={result.recommendation === 'individual'}
                            savingsPercent={result.savingsPercent}
                        />
                        <PriceCard
                            title="AppleCare One Bundle"
                            monthly={result.bundleMonthly}
                            annual={result.bundleAnnual}
                            isRecommended={result.recommendation === 'bundle'}
                            savingsPercent={result.savingsPercent}
                        />
                    </div>

                    <CostBars result={result} />

                    {/* Selected Devices */}
                    <div className="mb-8 p-4 border-2 border-[var(--swiss-card-border)] bg-[var(--swiss-bg)] transition-colors duration-400">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--swiss-muted)] mb-3">
                            Your ecosystem ({selectedDevices.length})
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedDevices.map(device => {
                                const DeviceIcon = DeviceIconMap[device.icon];
                                return (
                                    <button
                                        key={device.id}
                                        onClick={() => onRemoveDevice(device)}
                                        title={`Remove ${device.name}`}
                                        className="group flex items-center gap-1.5 px-2 py-1 bg-[var(--swiss-card-bg)] border border-[var(--swiss-card-border)] text-[9px] font-mono uppercase cursor-pointer transition-colors hover:border-[var(--swiss-accent)]"
                                    >
                                        <DeviceIcon size={10} className="text-[var(--swiss-accent)]" />
                                        <span>{device.name}</span>
                                        <X size={9} className="opacity-30 transition-opacity group-hover:opacity-100 group-hover:text-[var(--swiss-accent)]" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Savings */}
                    {result.monthlySavings >= 0.01 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[var(--swiss-card-bg)] border-2 border-[var(--swiss-card-border)] p-6 sm:p-8 relative overflow-hidden transition-colors duration-400"
                        >
                            <div className="mb-2 text-[var(--swiss-accent)] font-mono uppercase tracking-widest text-xs">
                                {result.recommendation === 'bundle' ? 'Bundle saves you' : 'Individual saves you'}
                            </div>
                            <div className="flex items-center justify-center gap-4 flex-wrap">
                                <div className="flex items-baseline gap-1">
                                    <AnimatedPrice
                                        value={result.monthlySavings}
                                        className="font-bold text-[var(--swiss-accent)] font-mono text-4xl lg:text-5xl tracking-tighter tabular-nums"
                                    />
                                    <span className="text-sm text-[var(--swiss-accent)]/70 font-mono uppercase">/mo</span>
                                </div>
                                <div className="text-xl text-[var(--swiss-muted)] opacity-40 font-mono">→</div>
                                <div className="flex items-baseline gap-1">
                                    <AnimatedPrice
                                        value={result.annualSavings}
                                        className="font-bold text-[var(--swiss-accent)] font-mono text-4xl lg:text-5xl tracking-tighter tabular-nums"
                                    />
                                    <span className="text-sm text-[var(--swiss-accent)]/70 font-mono uppercase">/year</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Footnotes: break-even hint + annual prepay */}
                    <div className="mt-6 space-y-2">
                        {result.recommendation === 'individual' && result.openBundleSlots > 0 && (
                            <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--swiss-muted)] leading-relaxed">
                                ▸ {result.openBundleSlots} bundle slot{result.openBundleSlots !== 1 ? 's' : ''} still open —
                                add ${result.monthlySavings.toFixed(2)}/mo of coverage and AppleCare One breaks even.
                            </p>
                        )}
                        {result.individualAnnualPrepay > 0 && result.individualAnnualPrepay < result.individualAnnual - 0.005 && (
                            <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--swiss-muted)] leading-relaxed">
                                ▸ Prepaying each plan yearly cuts individual to ${result.individualAnnualPrepay.toFixed(2)}/yr
                                (saves ${(result.individualAnnual - result.individualAnnualPrepay).toFixed(2)} vs monthly billing).
                            </p>
                        )}
                        {selectedDevices.some(d => d.legacy) && (
                            <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--swiss-muted)] leading-relaxed">
                                ▸ Legacy devices show their last published price — Apple no longer sells new plans for them,
                                but they remain AppleCare One eligible while under 4 years old.
                            </p>
                        )}
                    </div>
                </>
            )}
        </motion.div>
    );
}

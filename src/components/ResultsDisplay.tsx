import { motion, AnimatePresence } from 'framer-motion';
import type { CalculationResult } from '../hooks/useCalculator';
import type { Device, IconName } from '../data/devices';
import {
    Smartphone,
    Tablet,
    Laptop,
    Monitor,
    Watch,
    Headphones,
    Speaker,
    Tv,
    Glasses,
    Package
} from 'lucide-react';

const IconMap: Record<IconName, any> = {
    Smartphone,
    Tablet,
    Laptop,
    Monitor,
    Watch,
    Headphones,
    Speaker,
    Tv,
    Glasses,
    Package
};

// Extracted outside ResultsDisplay to prevent animation replay on parent re-renders
function PriceCard({
    title,
    monthly,
    annual,
    isRecommended
}: {
    title: string;
    monthly: number;
    annual: number;
    isRecommended: boolean;
}) {
    const cardClass = `${isRecommended ? 'pt-12' : 'pt-8'} pb-6 px-6 ${isRecommended ? 'bg-[var(--swiss-bg)] border-2 border-[var(--swiss-accent)] shadow-[0_4px_0_0_var(--swiss-accent)]' : 'bg-[var(--swiss-card-bg)] border-2 border-[var(--swiss-card-border)] shadow-[4px_4px_0_0_var(--swiss-card-border)]'} relative transition-colors duration-400`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cardClass}
        >
            {isRecommended && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 border border-black dark:border-white/10 rounded-none uppercase font-mono bg-[#e63946] text-white"
                >
                    Best Value
                </motion.div>
            )}
            <div className="text-sm font-medium mb-3 text-[var(--swiss-text)] opacity-60 font-mono uppercase text-[10px] leading-tight tracking-tight">
                {title}
            </div>
            <div className="flex items-baseline gap-0 flex-col">
                <motion.span
                    key={monthly}
                    className="text-4xl font-bold text-[var(--swiss-text)] font-mono tracking-tighter text-3xl sm:text-4xl"
                >
                    ${monthly.toFixed(2)}
                </motion.span>
                <span className="text-sm text-[var(--swiss-text)] font-mono uppercase text-[10px] opacity-70 leading-none mt-1">/mo</span>
            </div>
            <div className="text-sm mt-2 text-[var(--swiss-text)] opacity-40 font-mono">
                ${annual.toFixed(2)}/year
            </div>
        </motion.div>
    );
}

interface ResultsDisplayProps {
    result: CalculationResult;
    selectedDevices: Device[];
}

export function ResultsDisplay({ result, selectedDevices }: ResultsDisplayProps) {
    const hasDevices = selectedDevices.length > 0;

    const getContainerClass = () => 'bg-[var(--swiss-card-bg)] p-6 md:p-8 border-2 border-[var(--swiss-card-border)] relative transition-colors duration-400 after:absolute after:inset-0 after:bg-[var(--swiss-card-border)] after:translate-x-1 after:translate-y-1 after:-z-10';

    const getRecommendationClass = () => {
        if (result.recommendation === 'bundle') {
            return 'bg-[#e63946] text-white px-4 py-2 font-mono text-xs uppercase inline-block border-2 border-black';
        }
        return 'bg-black text-white px-4 py-2 font-mono text-xs uppercase inline-block';
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={getContainerClass()}
            >
                {/* Recommendation Badge */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={getRecommendationClass()}
                    >
                        {!hasDevices
                            ? '⬡ SELECT DEVICES TO COMPARE'
                            : result.recommendation === 'bundle'
                                ? '🎉 AppleCare One saves you money!'
                                : result.recommendation === 'individual'
                                    ? '💡 Individual plans are cheaper'
                                    : '⚖️ Both options cost the same'}
                    </motion.div>
                </div>

                {/* Price Comparison */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <PriceCard
                        title="Individual AppleCare+"
                        monthly={result.individualMonthly}
                        annual={result.individualAnnual}
                        isRecommended={result.recommendation === 'individual'}
                    />
                    <PriceCard
                        title="AppleCare One Bundle"
                        monthly={result.bundleMonthly}
                        annual={result.bundleAnnual}
                        isRecommended={result.recommendation === 'bundle'}
                    />
                </div>

                {/* Selected Devices List with Icons */}
                {hasDevices && (
                    <div className="mb-8 p-4 border-2 border-[var(--swiss-card-border)] bg-[var(--swiss-bg)]">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--swiss-muted)] mb-3">
                            Current Ecosystem ({selectedDevices.length})
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedDevices.map(device => {
                                const DeviceIcon = IconMap[device.icon];
                                return (
                                    <div
                                        key={device.id}
                                        className="flex items-center gap-1.5 px-2 py-1 bg-[var(--swiss-card-bg)] border border-[var(--swiss-card-border)] text-[9px] font-mono uppercase"
                                    >
                                        <DeviceIcon size={10} className="text-[var(--swiss-accent)]" />
                                        <span>{device.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Savings */}
                {hasDevices && result.monthlySavings > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[var(--swiss-card-bg)] border-2 border-[var(--swiss-card-border)] p-8 relative overflow-hidden transition-colors duration-400"
                    >
                        <div className="text-sm font-medium mb-1 text-[#e63946] font-mono uppercase tracking-widest text-xs">
                            Potential Savings
                        </div>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <div className="flex items-baseline gap-1">
                                <motion.span
                                    key={result.monthlySavings}
                                    className="text-3xl font-bold text-[#e63946] font-mono text-4xl lg:text-5xl tracking-tighter"
                                >
                                    ${result.monthlySavings.toFixed(2)}
                                </motion.span>
                                <span className="text-sm text-[#e63946]/70 font-mono uppercase">/mo</span>
                            </div>
                            <div className="text-xl text-black/20 font-mono">→</div>
                            <div className="flex items-baseline gap-1">
                                <motion.span
                                    key={result.annualSavings}
                                    className="text-3xl font-bold text-[#e63946] font-mono text-4xl lg:text-5xl tracking-tighter"
                                >
                                    ${result.annualSavings.toFixed(2)}
                                </motion.span>
                                <span className="text-sm text-[#e63946]/70 font-mono uppercase">/year</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

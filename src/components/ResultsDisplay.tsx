import { motion, AnimatePresence } from 'framer-motion';
import type { CalculationResult } from '../hooks/useCalculator';
import type { Device } from '../data/devices';

interface ResultsDisplayProps {
    result: CalculationResult;
    selectedDevices: Device[];
    variant: 'glass' | 'minimal' | 'playful' | 'swiss' | 'liquid';
}

export function ResultsDisplay({ result, selectedDevices, variant }: ResultsDisplayProps) {
    const hasDevices = selectedDevices.length > 0;

    const getContainerClass = () => {
        switch (variant) {
            case 'glass':
                return 'glass-card p-8';
            case 'minimal':
                return 'minimal-surface p-8';
            case 'playful':
                return 'playful-card p-8';
            case 'swiss':
                return 'bg-white p-6 md:p-8 border-2 border-black relative after:absolute after:inset-0 after:bg-black after:translate-x-1 after:translate-y-1 after:-z-10';
            case 'liquid':
                return 'liquid-card p-8 liquid-glow';
        }
    };

    const getRecommendationClass = () => {
        const base = 'inline-block px-4 py-2 rounded-full text-sm font-semibold';
        if (result.recommendation === 'bundle') {
            switch (variant) {
                case 'glass':
                    return `${base} bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 text-emerald-300`;
                case 'minimal':
                    return `${base} bg-emerald-500/20 text-emerald-400`;
                case 'playful':
                    return `${base} bg-gradient-to-r from-green-400 to-emerald-400 text-white`;
                case 'swiss':
                    return 'bg-[#e63946] text-white px-4 py-2 font-mono text-xs uppercase inline-block border-2 border-black';
                case 'liquid':
                    return `${base} bg-white/10 text-emerald-400 backdrop-blur-md border border-emerald-500/30`;
            }
        }
        switch (variant) {
            case 'glass':
                return `${base} bg-purple-500/30 text-purple-300`;
            case 'minimal':
                return `${base} bg-cyan-500/20 text-cyan-400`;
            case 'playful':
                return `${base} bg-gradient-to-r from-orange-400 to-pink-400 text-white`;
            case 'swiss':
                return 'bg-black text-white px-4 py-2 font-mono text-xs uppercase inline-block';
            case 'liquid':
                return `${base} bg-white/10 text-purple-400 backdrop-blur-md border border-purple-500/30`;
        }
    };

    const PriceCard = ({
        title,
        monthly,
        annual,
        isRecommended
    }: {
        title: string;
        monthly: number;
        annual: number;
        isRecommended: boolean;
    }) => {
        const getCardClass = () => {
            const base = 'p-6 rounded-2xl relative overflow-hidden';
            switch (variant) {
                case 'glass':
                    return `${base} ${isRecommended
                        ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30'
                        : 'bg-white/5 border border-white/10'}`;
                case 'minimal':
                    return `${base} ${isRecommended
                        ? 'bg-emerald-500/10 border border-emerald-500/50'
                        : 'bg-white/5 border border-white/10'}`;
                case 'playful':
                    return `${base} ${isRecommended
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400'
                        : 'bg-white border-2 border-black/5'}`;
                case 'swiss':
                    return `${isRecommended ? 'pt-12' : 'pt-8'} pb-6 px-6 ${isRecommended ? 'bg-[#f5f2eb] border-2 border-[#e63946]' : 'bg-white border-2 border-black'} relative`;
                case 'liquid':
                    return `${base} rounded-3xl ${isRecommended
                        ? 'bg-white/10 border border-cyan-400/50 backdrop-blur-md'
                        : 'bg-white/5 border border-white/10'}`;
            }
        };

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={getCardClass()}
            >
                {isRecommended && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 border border-black rounded-none uppercase font-mono ${variant === 'swiss' ? 'bg-[#e63946] text-white' : variant === 'playful' ? 'bg-green-400 text-white rounded-full' : 'bg-emerald-500 text-white rounded-full'
                            }`}
                    >
                        Best Value
                    </motion.div>
                )}
                <div className={`text-sm font-medium mb-3 ${variant === 'playful' || variant === 'swiss' ? 'text-black/60' : 'text-white/60'} ${variant === 'swiss' ? 'font-mono uppercase text-[10px] leading-tight tracking-tight' : ''}`}>
                    {title}
                </div>
                <div className={`flex items-baseline ${variant === 'swiss' ? 'gap-0 flex-col' : 'gap-1'}`}>
                    <motion.span
                        key={monthly}
                        initial={{ opacity: 1, y: 0, color: variant === 'playful' || variant === 'swiss' ? '#000000' : '#ffffff' }}
                        animate={{ opacity: 1, y: 0, color: variant === 'playful' || variant === 'swiss' ? '#000000' : '#ffffff' }}
                        className={`text-4xl font-bold ${variant === 'playful' || variant === 'swiss' ? 'text-black' : 'text-white'} ${variant === 'swiss' ? 'font-mono tracking-tighter text-3xl sm:text-4xl' : variant === 'liquid' ? 'font-serif' : ''}`}
                    >
                        ${monthly.toFixed(2)}
                    </motion.span>
                    <span className={`text-sm ${variant === 'playful' || variant === 'swiss' ? 'text-black/50' : 'text-white/50'} ${variant === 'swiss' ? 'font-mono uppercase text-[10px] opacity-70 leading-none mt-1' : ''}`}>/mo</span>
                </div>
                <div className={`text-sm mt-2 ${variant === 'playful' || variant === 'swiss' ? 'text-black/40' : 'text-white/40'} ${variant === 'swiss' ? 'font-mono' : ''}`}>
                    ${annual.toFixed(2)}/year
                </div>
            </motion.div>
        );
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
                            ? (variant === 'swiss' ? '⬡ SELECT DEVICES TO COMPARE' : 'Select devices to see comparison')
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

                {/* Savings */}
                {hasDevices && result.monthlySavings > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`text-center ${variant === 'swiss'
                            ? "bg-white border-2 border-black p-8 relative overflow-hidden"
                            : variant === 'liquid'
                                ? "bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md"
                                : "bg-white border-2 border-black/5 p-8 rounded-3xl shadow-sm"
                            }`}
                    >
                        <div className={`text-sm font-medium mb-1 ${variant === 'playful' || variant === 'swiss' ? 'text-[#e63946]' : 'text-emerald-400'} ${variant === 'swiss' ? 'font-mono uppercase tracking-widest text-xs' : ''}`}>
                            Potential Savings
                        </div>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            <div className="flex items-baseline gap-1">
                                <motion.span
                                    key={result.monthlySavings}
                                    initial={{ opacity: 0, scale: 1.1, color: variant === 'swiss' ? '#e63946' : 'currentColor' }}
                                    animate={{ opacity: 1, scale: 1, color: variant === 'swiss' ? '#e63946' : 'currentColor' }}
                                    className={`text-3xl font-bold ${variant === 'playful' || variant === 'swiss' ? 'text-[#e63946]' : 'text-emerald-400'} ${variant === 'swiss' ? 'font-mono text-4xl lg:text-5xl tracking-tighter' : ''}`}
                                >
                                    ${result.monthlySavings.toFixed(2)}
                                </motion.span>
                                <span className={`text-sm ${variant === 'playful' || variant === 'swiss' ? 'text-[#e63946]/70' : 'text-emerald-500/70'} ${variant === 'swiss' ? 'font-mono uppercase' : ''}`}>/mo</span>
                            </div>
                            <div className={`text-xl ${variant === 'playful' || variant === 'swiss' ? 'text-black/20' : 'text-white/20'} ${variant === 'swiss' ? 'font-mono' : ''}`}>→</div>
                            <div className="flex items-baseline gap-1">
                                <motion.span
                                    key={result.annualSavings}
                                    initial={{ opacity: 0, scale: 1.1, color: variant === 'swiss' ? '#e63946' : 'currentColor' }}
                                    animate={{ opacity: 1, scale: 1, color: variant === 'swiss' ? '#e63946' : 'currentColor' }}
                                    className={`text-3xl font-bold ${variant === 'playful' || variant === 'swiss' ? 'text-[#e63946]' : 'text-emerald-400'} ${variant === 'swiss' ? 'font-mono text-4xl lg:text-5xl tracking-tighter' : ''}`}
                                >
                                    ${result.annualSavings.toFixed(2)}
                                </motion.span>
                                <span className={`text-sm ${variant === 'playful' || variant === 'swiss' ? 'text-[#e63946]/70' : 'text-emerald-500/70'} ${variant === 'swiss' ? 'font-mono uppercase' : ''}`}>/year</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

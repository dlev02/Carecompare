import { useState } from 'react';
import { motion } from 'framer-motion';
import { DeviceSelector } from '../../components/DeviceSelector';
import { ResultsDisplay } from '../../components/ResultsDisplay';
import { DesignSwitcher } from '../../components/DesignSwitcher';
import type { Device } from '../../data/devices';
import { useCalculator } from '../../hooks/useCalculator';
import { Footer } from '../../components/Footer';

const MinimalBlack = () => {
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
    const result = useCalculator(selectedDevices);

    // Letter animation variants
    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1] as const,
            },
        }),
    };

    const title = "CALCULATE";

    return (
        <div className="minimal-bg">
            <div className="px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto">

                    {/* Hero Section */}
                    <div className="mb-20">
                        {/* Animated Title */}
                        <div className="overflow-hidden mb-4">
                            <div className="flex justify-center md:justify-start">
                                {title.split('').map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        initial="hidden"
                                        animate="visible"
                                        variants={letterVariants}
                                        className="text-7xl md:text-9xl font-black tracking-tighter text-white"
                                        style={{ display: 'inline-block' }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="h-px flex-1 bg-gradient-to-r from-cyan-400 to-transparent" />
                            <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">
                                Your AppleCare
                            </span>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-xl md:text-2xl text-neutral-500 max-w-xl leading-relaxed"
                        >
                            Individual plans or the bundle?
                            <br />
                            <span className="text-neutral-400">Find out in seconds.</span>
                        </motion.p>
                    </div>

                    {/* Accent Line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="h-0.5 bg-gradient-to-r from-cyan-400 via-cyan-400/50 to-transparent mb-12 origin-left"
                    />

                    {/* Calculator Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-4">
                                Select Your Devices
                            </h2>
                            <DeviceSelector
                                selectedDevices={selectedDevices}
                                onDevicesChange={setSelectedDevices}
                                variant="minimal"
                            />
                        </div>

                        <ResultsDisplay
                            result={result}
                            selectedDevices={selectedDevices}
                            variant="minimal"
                        />
                    </motion.div>

                    {/* Footer */}
                    <motion.footer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="mt-24 pt-8 border-t border-white/5"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-neutral-600 text-sm">
                                Prices based on current AppleCare+ rates
                            </p>
                            <div className="flex items-center gap-6">
                                <a
                                    href="https://github.com/dlev02/carecompare"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-500 hover:text-cyan-400 text-sm transition-colors"
                                >
                                    GitHub
                                </a>
                                <span className="text-neutral-700">•</span>
                                <span className="text-neutral-600 text-sm">
                                    Not affiliated with Apple
                                </span>
                            </div>
                        </div>
                    </motion.footer>
                </div>
            </div>

            {/* Design Switcher */}
            <DesignSwitcher />
            <Footer variant="minimal" />
        </div>
    );
}

export default MinimalBlack;

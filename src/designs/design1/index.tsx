import { useState } from 'react';
import { motion } from 'framer-motion';
import { DeviceSelector } from '../../components/DeviceSelector';
import { ResultsDisplay } from '../../components/ResultsDisplay';
import { DesignSwitcher } from '../../components/DesignSwitcher';
import type { Device } from '../../data/devices';
import { useCalculator } from '../../hooks/useCalculator';
import { Footer } from '../../components/Footer';

const GlassAurora = () => {
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
    const result = useCalculator(selectedDevices);

    return (
        <div className="aurora-bg min-h-screen">
            {/* Aurora Background Orbs */}
            <div className="aurora-orb aurora-orb-1" />
            <div className="aurora-orb aurora-orb-2" />
            <div className="aurora-orb aurora-orb-3" />

            {/* Content */}
            <div className="relative z-10 px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto">

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/70 text-sm mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Compare AppleCare+ vs AppleCare One
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            <span className="text-gradient-aurora">Smart Protection</span>
                            <br />
                            <span className="text-white/90">for Your Devices</span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
                        >
                            Find out whether individual AppleCare+ plans or the AppleCare One bundle
                            saves you more money. Add your devices below.
                        </motion.p>
                    </motion.div>

                    {/* Calculator Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="space-y-8"
                    >
                        <DeviceSelector
                            selectedDevices={selectedDevices}
                            onDevicesChange={setSelectedDevices}
                            variant="glass"
                        />

                        <ResultsDisplay
                            result={result}
                            selectedDevices={selectedDevices}
                            variant="glass"
                        />
                    </motion.div>

                    {/* Footer */}
                    <motion.footer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-20 text-center"
                    >
                        <p className="text-white/30 text-sm">
                            Prices based on current AppleCare+ rates • Not affiliated with Apple Inc.
                        </p>
                        <a
                            href="https://github.com/dlev02/carecompare"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-4 text-white/40 hover:text-white/60 text-sm transition-colors"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                            </svg>
                            Open Source
                        </a>
                    </motion.footer>
                    <DesignSwitcher />
                    <Footer variant="glass" />
                </div>
            </div>
        </div>
    );
};

export default GlassAurora;

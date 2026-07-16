import { useState } from 'react';
import { motion } from 'framer-motion';
import { DeviceSelector } from './components/DeviceSelector';
import { ResultsDisplay } from './components/ResultsDisplay';
import { TickerTape } from './components/TickerTape';
import { ThemeToggle } from './components/ThemeToggle';
import { Footer } from './components/Footer';
import type { Device } from './data/devices';
import { useCalculator } from './hooks/useCalculator';

function App() {
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
    const result = useCalculator(selectedDevices);

    const removeDevice = (device: Device) =>
        setSelectedDevices(selectedDevices.filter(d => d.id !== device.id));

    return (
        <div className="swiss-bg">
            {/* Grid Background */}
            <div className="swiss-grid" />

            {/* Decorative Accents */}
            <div className="swiss-accent swiss-accent-1" />
            <div className="swiss-accent swiss-accent-2" />

            {/* Large Background Numbers */}
            <div className="swiss-number" style={{ top: '5%', left: '-5%' }}>01</div>
            <div className="swiss-number" style={{ bottom: '10%', right: '-8%' }}>02</div>

            {/* Ticker Header */}
            <motion.div
                initial={{ y: -48 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <TickerTape />
            </motion.div>

            <ThemeToggle />

            {/* Content */}
            <div className="relative z-10">
                <div className="px-4 md:px-8 lg:px-16 py-12 md:py-20">
                    {/* Hero Section - Asymmetric Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                        {/* Left Column - Large Title */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-7"
                        >
                            <span className="swiss-label mb-4 block">AppleCare Calculator / 2026</span>
                            <h1 className="swiss-headline text-5xl md:text-7xl lg:text-8xl mb-6">
                                COMPARE<span className="swiss-red">.</span>
                                <br />
                                CALCULATE<span className="swiss-red">.</span>
                                <br />
                                <span className="swiss-red">SAVE.</span>
                            </h1>
                        </motion.div>

                        {/* Right Column - Description */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="lg:col-span-5 flex flex-col justify-end"
                        >
                            <div className="lg:max-w-sm">
                                <span className="swiss-label mb-4 block">About This Tool</span>
                                <p className="text-lg leading-relaxed mb-6">
                                    Determine whether individual AppleCare+ subscriptions or the unified
                                    AppleCare One bundle provides optimal value for your device ecosystem.
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="swiss-red text-3xl font-bold font-mono tabular-nums">
                                        {selectedDevices.length}
                                    </span>
                                    <span className="text-sm text-[var(--swiss-text)] opacity-50">devices selected</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="swiss-divider mb-12 origin-left"
                    />

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Device Selector */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="lg:col-span-7"
                        >
                            <div className="swiss-card p-6 md:p-8">
                                <div className="flex items-baseline gap-4 mb-6">
                                    <span className="swiss-red text-4xl font-bold font-mono">01</span>
                                    <h2 className="swiss-headline text-2xl">SELECT DEVICES</h2>
                                </div>
                                <DeviceSelector
                                    selectedDevices={selectedDevices}
                                    onDevicesChange={setSelectedDevices}
                                />
                            </div>
                        </motion.div>

                        {/* Results Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="lg:col-span-5 lg:sticky lg:top-8"
                        >
                            <div className="swiss-card p-6 md:p-8 border-none after:hidden">
                                <div className="flex items-baseline gap-4 mb-6">
                                    <span className="swiss-red text-4xl font-bold font-mono">02</span>
                                    <h2 className="swiss-headline text-2xl">RESULTS</h2>
                                </div>
                                <ResultsDisplay
                                    result={result}
                                    selectedDevices={selectedDevices}
                                    onRemoveDevice={removeDevice}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer */}
                    <motion.footer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-16 pt-8 border-t-2 border-[var(--swiss-card-border)] transition-colors duration-400"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <span className="swiss-label">Disclaimer</span>
                                <p className="text-sm text-[var(--swiss-muted)] mt-1 transition-colors duration-400">
                                    U.S. AppleCare+ pricing as of July 2026. Not affiliated with Apple Inc.
                                </p>
                            </div>
                            <a
                                href="https://github.com/dlev02/carecompare"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="swiss-button"
                            >
                                VIEW SOURCE →
                            </a>
                        </div>
                    </motion.footer>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default App;

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DeviceSelector } from '../../components/DeviceSelector';
import { ResultsDisplay } from '../../components/ResultsDisplay';
import { DesignSwitcher } from '../../components/DesignSwitcher';
import type { Device } from '../../data/devices';
import { useCalculator } from '../../hooks/useCalculator';
import { Footer } from '../../components/Footer';

const LiquidCrystal = () => {
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
    const result = useCalculator(selectedDevices);

    return (
        <div className="liquid-bg">
            {/* Organic Blob Backgrounds */}
            <div className="liquid-blob liquid-blob-1" />
            <div className="liquid-blob liquid-blob-2" />
            <div className="liquid-blob liquid-blob-3" />

            {/* Content */}
            <div className="relative z-10 px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto">

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center mb-20"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-10"
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 animate-pulse" />
                            <span className="text-white/50 text-sm font-light tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                AppleCare Protection Analysis
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 tracking-tight"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            <span className="text-white/90">Discover Your</span>
                            <br />
                            <span className="text-gradient-iridescent font-medium">Optimal Coverage</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-lg md:text-xl text-white/40 max-w-xl mx-auto leading-relaxed font-light"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                            Compare individual AppleCare+ subscriptions against the unified
                            One bundle to find your perfect protection strategy.
                        </motion.p>
                    </motion.div>

                    {/* Calculator Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="space-y-10"
                    >
                        {/* Device Selector Card */}
                        <div className="liquid-card p-8 liquid-glow">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-8 rounded-full bg-gradient-to-b from-cyan-400 via-violet-500 to-pink-500" />
                                <h2
                                    className="text-xl text-white/80 font-medium"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                    Select Your Devices
                                </h2>
                            </div>
                            <DeviceSelector
                                selectedDevices={selectedDevices}
                                onDevicesChange={setSelectedDevices}
                                variant="liquid"
                            />
                        </div>

                        {/* Results */}
                        <ResultsDisplay
                            result={result}
                            selectedDevices={selectedDevices}
                            variant="liquid"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Design Switcher */}
            <DesignSwitcher />
            <Footer variant="liquid" />
        </div>
    );
};

export default LiquidCrystal;

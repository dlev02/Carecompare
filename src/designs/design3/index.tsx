import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeviceSelector } from '../../components/DeviceSelector';
import { ResultsDisplay } from '../../components/ResultsDisplay';
import { DesignSwitcher } from '../../components/DesignSwitcher';
import { Footer } from '../../components/Footer';
import type { Device } from '../../data/devices';
import { useCalculator } from '../../hooks/useCalculator';

// Confetti component
function Confetti() {
    const colors = ['#f97316', '#ec4899', '#8b5cf6', '#22c55e', '#facc15'];
    const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {pieces.map((piece) => (
                <motion.div
                    key={piece.id}
                    initial={{
                        y: -20,
                        x: `${piece.x}vw`,
                        rotate: 0,
                        opacity: 1,
                    }}
                    animate={{
                        y: '110vh',
                        rotate: piece.rotation + 720,
                        opacity: [1, 1, 0],
                    }}
                    transition={{
                        duration: 3,
                        delay: piece.delay,
                        ease: 'linear',
                    }}
                    className="absolute"
                    style={{
                        width: piece.size,
                        height: piece.size,
                        backgroundColor: piece.color,
                        borderRadius: piece.size > 8 ? '50%' : '2px',
                    }}
                />
            ))}
        </div>
    );
}

const PlayfulGradient = () => {
    const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const result = useCalculator(selectedDevices);

    // Show confetti when savings are significant
    useEffect(() => {
        if (result.annualSavings > 50 && selectedDevices.length >= 3) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [result.annualSavings, selectedDevices.length]);

    return (
        <div className="playful-bg min-h-screen relative">
            {/* Gradient Mesh Background */}
            <div className="gradient-mesh" />

            {/* Confetti */}
            <AnimatePresence>
                {showConfetti && <Confetti />}
            </AnimatePresence>

            {/* Floating Shapes */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute top-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-orange-200/40 to-pink-200/40 blur-2xl"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute bottom-40 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-violet-200/40 to-cyan-200/40 blur-2xl"
            />

            {/* Content */}
            <div className="relative z-10 px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto">

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.34, 1.56, 0.64, 1], // bouncy
                        }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: 0.2,
                                type: 'spring',
                                stiffness: 200,
                                damping: 15,
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-lg border border-black/5 text-black/60 text-sm font-medium mb-8"
                        >
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-lg"
                            >
                                🍎
                            </motion.span>
                            AppleCare Calculator
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                        >
                            <span className="text-gradient-playful">Save Money</span>
                            <br />
                            <span className="text-black/80">on Protection!</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl text-black/50 max-w-xl mx-auto leading-relaxed"
                        >
                            Discover if AppleCare One or individual plans work better for your setup
                            <motion.span
                                animate={{ rotate: [0, 10, 0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                className="inline-block ml-2"
                            >
                                ✨
                            </motion.span>
                        </motion.p>
                    </motion.div>

                    {/* Calculator Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.6,
                            type: 'spring',
                            stiffness: 80,
                            damping: 20,
                        }}
                        className="space-y-8"
                    >
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                                className="text-lg font-semibold text-black/70 mb-4 flex items-center gap-2"
                            >
                                <span className="text-2xl">📱</span>
                                Pick Your Apple Devices
                            </motion.h2>
                            <DeviceSelector
                                selectedDevices={selectedDevices}
                                onDevicesChange={setSelectedDevices}
                                variant="playful"
                            />
                        </div>

                        <ResultsDisplay
                            result={result}
                            selectedDevices={selectedDevices}
                            variant="playful"
                        />
                    </motion.div>

                    {/* Fun Fact */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-16 text-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.02, rotate: 1 }}
                            className="inline-block p-6 rounded-3xl bg-white/60 backdrop-blur-sm border-2 border-black/5 shadow-xl"
                        >
                            <p className="text-black/60 text-sm">
                                <span className="text-xl mr-2">💡</span>
                                <strong>Pro tip:</strong> AppleCare One becomes more valuable the more devices you have!
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Design Switcher */}
            <DesignSwitcher />
            <Footer variant="playful" />
        </div>
    );
};

export default PlayfulGradient;

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { DEVICE_CATALOG, CATEGORIES } from '../data/devices';
import type { Device } from '../data/devices';

interface DeviceSelectorProps {
    selectedDevices: Device[];
    onDevicesChange: (devices: Device[]) => void;
    variant: 'glass' | 'minimal' | 'playful' | 'swiss' | 'liquid';
}

export function DeviceSelector({ selectedDevices, onDevicesChange, variant }: DeviceSelectorProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredDevices = useMemo(() => {
        let devices = DEVICE_CATALOG;

        if (activeCategory) {
            devices = devices.filter(d => d.category === activeCategory);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            devices = devices.filter(d =>
                d.name.toLowerCase().includes(query)
            );
        }

        return devices;
    }, [searchQuery, activeCategory]);

    const toggleDevice = (device: Device) => {
        const isSelected = selectedDevices.some(d => d.id === device.id);
        if (isSelected) {
            onDevicesChange(selectedDevices.filter(d => d.id !== device.id));
        } else {
            onDevicesChange([...selectedDevices, device]);
        }
    };

    const isSelected = (deviceId: string) =>
        selectedDevices.some(d => d.id === deviceId);

    // Variant-specific styles
    const getContainerClass = () => {
        switch (variant) {
            case 'glass':
                return 'glass-card p-6';
            case 'minimal':
                return 'minimal-surface p-6';
            case 'playful':
                return 'playful-card p-6';
            case 'swiss':
                return 'bg-white p-6 border-2 border-black relative after:absolute after:inset-0 after:bg-black after:translate-x-1 after:translate-y-1 after:-z-10';
            case 'liquid':
                return 'liquid-card p-6 liquid-glow';
        }
    };

    const getInputClass = () => {
        switch (variant) {
            case 'glass':
                return 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors';
            case 'minimal':
                return 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-colors';
            case 'playful':
                return 'w-full bg-white border-2 border-black/10 rounded-2xl px-4 py-3 text-black placeholder-black/40 focus:outline-none focus:border-orange-400 transition-colors';
            case 'swiss':
                return 'w-full bg-[#f5f2eb] border-2 border-black px-4 py-3 text-black placeholder-neutral-500 focus:outline-none focus:border-[#e63946] transition-colors font-mono';
            case 'liquid':
                return 'w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 transition-colors';
        }
    };

    const getCategoryClass = (isActive: boolean) => {
        const base = 'px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer';
        switch (variant) {
            case 'glass':
                return `${base} ${isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'}`;
            case 'minimal':
                return `${base} ${isActive
                    ? 'bg-cyan-400 text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'}`;
            case 'playful':
                return `${base} ${isActive
                    ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-white'
                    : 'bg-black/5 text-black/60 hover:bg-black/10'}`;
            case 'swiss':
                return `${isActive ? 'bg-[#e63946] text-white border-2 border-black' : 'bg-white text-black border-2 border-black hover:bg-[#f5f2eb]'} px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer`;
            case 'liquid':
                return `${base} ${isActive
                    ? 'bg-white/20 text-white backdrop-blur-md'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'}`;
        }
    };

    const getDeviceCardClass = (selected: boolean) => {
        const base = 'p-4 cursor-pointer transition-all';
        switch (variant) {
            case 'glass':
                return `${base} rounded-2xl ${selected
                    ? 'bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-white/30'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'}`;
            case 'minimal':
                return `${base} rounded-2xl ${selected
                    ? 'bg-cyan-400/20 border border-cyan-400'
                    : 'bg-white/5 border border-white/10 hover:border-white/20'}`;
            case 'playful':
                return `${base} rounded-2xl ${selected
                    ? 'bg-gradient-to-br from-orange-100 to-pink-100 border-2 border-orange-400'
                    : 'bg-white border-2 border-black/5 hover:border-black/20'}`;
            case 'swiss':
                return `${base} ${selected
                    ? 'bg-[#f5f2eb] border-2 border-[#e63946] ring-2 ring-black'
                    : 'bg-white border-2 border-black hover:bg-[#f5f2eb]'}`;
            case 'liquid':
                return `${base} rounded-3xl ${selected
                    ? 'bg-white/10 border border-cyan-400/50 backdrop-blur-md'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'}`;
        }
    };

    return (
        <div className={getContainerClass()}>
            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search devices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={getInputClass()}
                />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(null)}
                    className={getCategoryClass(activeCategory === null)}
                >
                    All
                </motion.button>
                {CATEGORIES.map(cat => (
                    <motion.button
                        key={cat.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveCategory(cat.id)}
                        className={getCategoryClass(activeCategory === cat.id)}
                    >
                        {cat.icon} {cat.name}
                    </motion.button>
                ))}
            </div>

            {/* Device Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2">
                <AnimatePresence mode="popLayout">
                    {filteredDevices.map(device => (
                        <motion.div
                            key={device.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleDevice(device)}
                            className={getDeviceCardClass(isSelected(device.id))}
                        >
                            <div className="text-2xl mb-2">{device.icon}</div>
                            <div className={`text-sm font-medium ${variant === 'playful' || variant === 'swiss' ? 'text-black' : 'text-white'} ${variant === 'swiss' ? 'font-mono uppercase tracking-tighter' : ''}`}>
                                {device.name}
                            </div>
                            <div className={`text-xs mt-1 ${variant === 'playful' || variant === 'swiss' ? 'text-black/50' : 'text-white/50'} ${variant === 'swiss' ? 'font-mono' : ''}`}>
                                ${device.monthlyPrice.toFixed(2)}/mo
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Selected Count */}
            {selectedDevices.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 text-center text-sm ${variant === 'playful' ? 'text-black/60' : 'text-white/60'}`}
                >
                    {selectedDevices.length} device{selectedDevices.length !== 1 ? 's' : ''} selected
                </motion.div>
            )}
        </div>
    );
}

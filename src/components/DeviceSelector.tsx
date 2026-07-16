import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { DEVICE_CATALOG, CATEGORIES } from '../data/devices';
import type { Device, IconName } from '../data/devices';
import { DeviceIconMap } from './deviceIcons';

interface DeviceSelectorProps {
    selectedDevices: Device[];
    onDevicesChange: (devices: Device[]) => void;
}

export function DeviceSelector({ selectedDevices, onDevicesChange }: DeviceSelectorProps) {
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

    const containerClass = 'bg-[var(--swiss-card-bg)] p-4 md:p-6 border-2 border-[var(--swiss-card-border)] relative transition-colors duration-400 after:absolute after:inset-0 after:bg-[var(--swiss-card-border)] after:translate-x-1 after:translate-y-1 after:-z-10';

    const inputClass = 'w-full bg-[var(--swiss-input-bg)] border-2 border-[var(--swiss-card-border)] pl-10 pr-10 py-3 text-[var(--swiss-text)] placeholder-neutral-500 focus:outline-none focus:border-[var(--swiss-accent)] transition-colors font-mono text-sm';

    const getCategoryClass = (isActive: boolean) => `${isActive ? 'bg-[var(--swiss-accent)] text-white border-2 border-[var(--swiss-card-border)]' : 'bg-[var(--swiss-category-bg)] text-[var(--swiss-text)] border-2 border-[var(--swiss-card-border)] hover:bg-[var(--swiss-bg)]'} px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2`;

    const getDeviceCardClass = (selected: boolean) => `flex items-center gap-2.5 md:gap-3 p-3 md:p-4 border-2 text-left w-full transition-colors duration-200 ${selected
        ? 'bg-[var(--swiss-accent)] border-[var(--swiss-card-border)]'
        : 'bg-[var(--swiss-card-bg)] border-[var(--swiss-card-border)] hover:bg-[var(--swiss-bg)]'
        } relative cursor-pointer`;

    return (
        <div className={containerClass}>
            {/* Search */}
            <div className="mb-6 relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--swiss-muted)] pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search devices…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search devices"
                    className={inputClass}
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--swiss-muted)] hover:text-[var(--swiss-accent)] cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(null)}
                    aria-pressed={activeCategory === null}
                    className={getCategoryClass(activeCategory === null)}
                >
                    All
                </motion.button>
                {CATEGORIES.map(cat => {
                    const CategoryIcon = DeviceIconMap[cat.icon as IconName];
                    return (
                        <motion.button
                            key={cat.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                            aria-pressed={activeCategory === cat.id}
                            className={getCategoryClass(activeCategory === cat.id)}
                        >
                            <CategoryIcon size={14} />
                            {cat.name}
                        </motion.button>
                    );
                })}
            </div>

            {/* Device Grid */}
            {filteredDevices.length === 0 ? (
                <div className="border-2 border-dashed border-[var(--swiss-card-border)] p-8 text-center">
                    <p className="font-mono text-xs uppercase tracking-widest text-[var(--swiss-muted)]">
                        No matches for “{searchQuery}”
                    </p>
                </div>
            ) : (
                <div className="device-scroll grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-h-[500px] overflow-y-auto p-1 pr-2">
                    <AnimatePresence mode="popLayout">
                        {filteredDevices.map((device, index) => {
                            const DeviceIcon = DeviceIconMap[device.icon];
                            const selected = isSelected(device.id);
                            return (
                                <motion.button
                                    key={device.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.92 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.92 }}
                                    transition={{ delay: Math.min(index * 0.015, 0.25) }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => toggleDevice(device)}
                                    aria-pressed={selected}
                                    className={getDeviceCardClass(selected)}
                                >
                                    <div className={selected ? 'text-white' : 'text-[var(--swiss-accent)]'}>
                                        <DeviceIcon size={24} strokeWidth={2.5} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`font-mono uppercase text-[11px] font-bold leading-[1.2] ${selected ? 'text-white' : 'text-[var(--swiss-text)]'}`}>
                                            {device.name}
                                        </div>
                                        <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                                            <span className={`text-[10px] font-mono leading-none tabular-nums ${selected ? 'text-white/70' : 'text-[var(--swiss-text)] opacity-50'}`}>
                                                ${device.monthlyPrice.toFixed(2)}/mo
                                            </span>
                                            {device.isNew && (
                                                <span className={`px-1 py-px text-[8px] font-mono font-bold uppercase leading-none ${selected ? 'bg-white text-[var(--swiss-accent)]' : 'bg-[var(--swiss-accent)] text-white'}`}>
                                                    New
                                                </span>
                                            )}
                                            {device.legacy && (
                                                <span
                                                    title="No longer sold new — last published price"
                                                    className={`px-1 py-px text-[8px] font-mono font-bold uppercase leading-none border ${selected ? 'border-white/40 text-white/80' : 'border-[var(--swiss-card-border)] text-[var(--swiss-muted)]'}`}>
                                                    Legacy
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}

            {/* Selection summary */}
            <div className="mt-4 flex items-center justify-between min-h-6">
                <span className="text-sm text-[var(--swiss-text)] opacity-60 font-mono text-xs uppercase tracking-wide">
                    {selectedDevices.length > 0
                        ? `${selectedDevices.length} device${selectedDevices.length !== 1 ? 's' : ''} selected`
                        : `${filteredDevices.length} device${filteredDevices.length !== 1 ? 's' : ''} in catalog`}
                </span>
                <AnimatePresence>
                    {selectedDevices.length > 0 && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => onDevicesChange([])}
                            className="font-mono text-[10px] uppercase tracking-widest text-[var(--swiss-muted)] hover:text-[var(--swiss-accent)] cursor-pointer underline underline-offset-4"
                        >
                            Clear all
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

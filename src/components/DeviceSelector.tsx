import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { DEVICE_CATALOG, CATEGORIES } from '../data/devices';
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

    const getContainerClass = () => 'bg-[var(--swiss-card-bg)] p-6 border-2 border-[var(--swiss-card-border)] relative transition-colors duration-400 after:absolute after:inset-0 after:bg-[var(--swiss-card-border)] after:translate-x-1 after:translate-y-1 after:-z-10';

    const getInputClass = () => 'w-full bg-[var(--swiss-input-bg)] border-2 border-[var(--swiss-card-border)] px-4 py-3 text-[var(--swiss-text)] placeholder-neutral-500 focus:outline-none focus:border-[var(--swiss-accent)] transition-colors font-mono';

    const getCategoryClass = (isActive: boolean) => `${isActive ? 'bg-[var(--swiss-accent)] text-white border-2 border-[var(--swiss-card-border)]' : 'bg-[var(--swiss-category-bg)] text-[var(--swiss-text)] border-2 border-[var(--swiss-card-border)] hover:bg-[var(--swiss-bg)]'} px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2`;

    const getDeviceCardClass = (selected: boolean) => `flex items-center gap-3 p-4 border-2 transition-all ${selected
        ? 'bg-[#e63946] border-black dark:border-[#f5f2eb]/20 translate-x-1 translate-y-1'
        : 'bg-[var(--swiss-card-bg)] border-[var(--swiss-card-border)] hover:bg-[var(--swiss-bg)]'
        } relative cursor-pointer`;

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
                {CATEGORIES.map(cat => {
                    const CategoryIcon = IconMap[cat.icon as IconName];
                    return (
                        <motion.button
                            key={cat.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveCategory(cat.id)}
                            className={getCategoryClass(activeCategory === cat.id)}
                        >
                            <CategoryIcon size={14} />
                            {cat.name}
                        </motion.button>
                    );
                })}
            </div>

            {/* Device Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-h-[500px] overflow-y-auto p-2">
                <AnimatePresence mode="popLayout">
                    {filteredDevices.map(device => {
                        const DeviceIcon = IconMap[device.icon];
                        return (
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
                                <div className={`${isSelected(device.id) ? 'text-white' : 'text-[var(--swiss-accent)]'}`}>
                                    <DeviceIcon size={24} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                    <div
                                        className={`font-mono uppercase text-[11px] font-bold leading-[1.2] ${isSelected(device.id) ? 'text-white' : 'text-[var(--swiss-text)]'}`}
                                    >
                                        {device.name}
                                    </div>
                                    <div className={`text-[10px] mt-1 font-mono leading-none ${isSelected(device.id) ? 'text-white/70' : 'text-[var(--swiss-text)] opacity-50'}`}>
                                        ${device.monthlyPrice.toFixed(2)}/mo
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Selected Count */}
            {selectedDevices.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center text-sm text-[var(--swiss-text)] opacity-60"
                >
                    {selectedDevices.length} device{selectedDevices.length !== 1 ? 's' : ''} selected
                </motion.div>
            )}
        </div>
    );
}

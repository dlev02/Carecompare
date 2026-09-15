import { useEffect, useRef, useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { DEVICE_CATALOG, CATEGORIES } from '../data/devices';
import type { Device } from '../data/devices';
import type { OwnedDevice } from '../hooks/useCalculator';
import { DeviceIconMap } from './deviceIcons';

interface Props {
    devices: OwnedDevice[];
    personName: string;
    familyMode: boolean;
    onAdd: (device: Device) => void;
}
export function DeviceSelector({
    devices,
    personName,
    familyMode,
    onAdd,
}: Props) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<string | null>(null);
    // null = automatic: open until this person has a device, then rest closed.
    const [expanded, setExpanded] = useState<boolean | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const open = expanded ?? devices.length === 0;
    useEffect(() => {
        if (expanded) searchRef.current?.focus();
    }, [expanded]);
    const name = personName || 'this person';
    if (!open) {
        return (
            <div className="catalog">
                <button
                    className="catalog-toggle"
                    onClick={() => setExpanded(true)}
                >
                    <Plus size={18} aria-hidden="true" />
                    Add another device{' '}
                    {familyMode && <span>for {name}</span>}
                </button>
            </div>
        );
    }
    const filtered = DEVICE_CATALOG.filter(
        (device) =>
            (!category || device.category === category) &&
            device.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    // The section heading already says “choose your devices” for a first,
    // solo device; the catalog only needs its own heading once there is
    // something to close it against or a person to name.
    const showHeading = devices.length > 0 || familyMode;
    return (
        <div className={`catalog ${showHeading ? '' : 'catalog-lead'}`}>
            {showHeading && (
                <div className="catalog-heading">
                    <h3>
                        {devices.length ? 'Add more' : 'Add devices'}
                        {familyMode && <span> for {name}</span>}
                    </h3>
                    {devices.length > 0 && (
                        <button
                            className="text-button"
                            onClick={() => setExpanded(false)}
                        >
                            <X size={14} /> Done
                        </button>
                    )}
                </div>
            )}
            <div className="search-field">
                <Search size={18} aria-hidden="true" />
                <input
                    ref={searchRef}
                    aria-label="Search devices"
                    placeholder="Find your iPhone, Mac, Watch…"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        aria-label="Clear search"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
            <div className="category-filter" aria-label="Device categories">
                <button
                    aria-pressed={category === null}
                    onClick={() => setCategory(null)}
                >
                    All
                </button>
                {CATEGORIES.map((item) => (
                    <button
                        key={item.id}
                        aria-pressed={category === item.id}
                        onClick={() => setCategory(item.id)}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
            <div className="device-scroll catalog-grid">
                {filtered.map((device) => {
                    const Icon = DeviceIconMap[device.icon];
                    const quantity = devices.filter(
                        (item) => item.device.id === device.id
                    ).length;
                    return (
                        <button
                            key={device.id}
                            className="catalog-device"
                            onClick={() => {
                                onAdd(device);
                                if (expanded === null) setExpanded(true);
                            }}
                            aria-label={`Add ${device.name}`}
                        >
                            <Icon
                                size={23}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />
                            <span className="catalog-device-copy">
                                <strong>{device.name}</strong>
                                <span>
                                    ${device.monthlyPrice.toFixed(2)}/mo
                                    {device.isNew && <b>New</b>}
                                    {device.pricingStatus && (
                                        <b className="price-tag">
                                            {device.pricingStatus ===
                                            'unrefreshed'
                                                ? 'Older rate'
                                                : 'Refurb offer'}
                                        </b>
                                    )}
                                </span>
                            </span>
                            <span className="catalog-add" aria-hidden="true">
                                {quantity || <Plus size={16} />}
                            </span>
                        </button>
                    );
                })}
                {!filtered.length && (
                    <p className="catalog-empty">
                        No models found. Try a shorter name or another category.
                    </p>
                )}
            </div>
        </div>
    );
}

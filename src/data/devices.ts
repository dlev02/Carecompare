// Device catalog with AppleCare+ pricing
// U.S. prices verified against apple.com/applecare — July 16, 2026
// (includes the July 15, 2026 Mac/iPad price increase for new sign-ups)
export type IconName =
    | 'Smartphone'
    | 'Tablet'
    | 'Laptop'
    | 'Monitor'
    | 'Watch'
    | 'Headphones'
    | 'Speaker'
    | 'Tv'
    | 'Glasses'
    | 'Package';

export interface Device {
    id: string;
    name: string;
    category: 'iphone' | 'ipad' | 'mac' | 'watch' | 'airpods' | 'other';
    icon: IconName;
    monthlyPrice: number;
    /** Annual prepay (10× monthly). Omitted for legacy devices — Apple no longer publishes new-signup pricing for them. */
    annualPrice?: number;
    /** Current-generation hardware — gets a NEW tag in the picker */
    isNew?: boolean;
    /** No longer sold new; last-published monthly price. Still bundle-eligible if under 4 years old. */
    legacy?: boolean;
}

export const DEVICE_CATALOG: Device[] = [
    // iPhones — AppleCare+ now includes Theft & Loss (single tier)
    { id: 'iphone-17-pro-max', name: 'iPhone 17 Pro Max', category: 'iphone', icon: 'Smartphone', monthlyPrice: 13.99, annualPrice: 139.99, isNew: true },
    { id: 'iphone-17-pro', name: 'iPhone 17 Pro', category: 'iphone', icon: 'Smartphone', monthlyPrice: 13.99, annualPrice: 139.99, isNew: true },
    { id: 'iphone-air', name: 'iPhone Air', category: 'iphone', icon: 'Smartphone', monthlyPrice: 13.99, annualPrice: 139.99, isNew: true },
    { id: 'iphone-17', name: 'iPhone 17', category: 'iphone', icon: 'Smartphone', monthlyPrice: 11.99, annualPrice: 119.99, isNew: true },
    { id: 'iphone-17e', name: 'iPhone 17e', category: 'iphone', icon: 'Smartphone', monthlyPrice: 9.99, annualPrice: 99.99, isNew: true },
    { id: 'iphone-16-plus', name: 'iPhone 16 Plus', category: 'iphone', icon: 'Smartphone', monthlyPrice: 12.99, annualPrice: 129.99 },
    { id: 'iphone-16', name: 'iPhone 16', category: 'iphone', icon: 'Smartphone', monthlyPrice: 11.99, annualPrice: 119.99 },
    { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', category: 'iphone', icon: 'Smartphone', monthlyPrice: 13.49, legacy: true },
    { id: 'iphone-16-pro', name: 'iPhone 16 Pro', category: 'iphone', icon: 'Smartphone', monthlyPrice: 13.49, legacy: true },
    { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', category: 'iphone', icon: 'Smartphone', monthlyPrice: 13.49, legacy: true },
    { id: 'iphone-15-pro', name: 'iPhone 15 Pro', category: 'iphone', icon: 'Smartphone', monthlyPrice: 13.49, legacy: true },
    { id: 'iphone-15-plus', name: 'iPhone 15 Plus', category: 'iphone', icon: 'Smartphone', monthlyPrice: 9.99, legacy: true },
    { id: 'iphone-15', name: 'iPhone 15', category: 'iphone', icon: 'Smartphone', monthlyPrice: 9.99, legacy: true },
    { id: 'iphone-14', name: 'iPhone 14', category: 'iphone', icon: 'Smartphone', monthlyPrice: 9.99, legacy: true },
    { id: 'iphone-se', name: 'iPhone SE', category: 'iphone', icon: 'Smartphone', monthlyPrice: 4.49, legacy: true },

    // iPads — AppleCare+ now includes Theft & Loss
    { id: 'ipad-pro-13', name: 'iPad Pro 13" (M5)', category: 'ipad', icon: 'Tablet', monthlyPrice: 11.99, annualPrice: 119.99, isNew: true },
    { id: 'ipad-pro-11', name: 'iPad Pro 11" (M5)', category: 'ipad', icon: 'Tablet', monthlyPrice: 10.99, annualPrice: 109.99, isNew: true },
    { id: 'ipad-air-13', name: 'iPad Air 13" (M4)', category: 'ipad', icon: 'Tablet', monthlyPrice: 7.99, annualPrice: 79.99, isNew: true },
    { id: 'ipad-air-11', name: 'iPad Air 11" (M4)', category: 'ipad', icon: 'Tablet', monthlyPrice: 6.99, annualPrice: 69.99, isNew: true },
    { id: 'ipad-11', name: 'iPad (A16)', category: 'ipad', icon: 'Tablet', monthlyPrice: 5.99, annualPrice: 59.99 },
    { id: 'ipad-mini', name: 'iPad mini (A17 Pro)', category: 'ipad', icon: 'Tablet', monthlyPrice: 5.99, annualPrice: 59.99 },
    { id: 'ipad-10', name: 'iPad (10th gen)', category: 'ipad', icon: 'Tablet', monthlyPrice: 4.49, legacy: true },

    // Macs
    { id: 'macbook-pro-16', name: 'MacBook Pro 16" (M5)', category: 'mac', icon: 'Laptop', monthlyPrice: 15.99, annualPrice: 159.99, isNew: true },
    { id: 'macbook-pro-14', name: 'MacBook Pro 14" (M5)', category: 'mac', icon: 'Laptop', monthlyPrice: 10.99, annualPrice: 109.99, isNew: true },
    { id: 'macbook-air-15', name: 'MacBook Air 15" (M5)', category: 'mac', icon: 'Laptop', monthlyPrice: 8.99, annualPrice: 89.99, isNew: true },
    { id: 'macbook-air-13', name: 'MacBook Air 13" (M5)', category: 'mac', icon: 'Laptop', monthlyPrice: 7.99, annualPrice: 79.99, isNew: true },
    { id: 'macbook-neo', name: 'MacBook Neo', category: 'mac', icon: 'Laptop', monthlyPrice: 5.99, annualPrice: 59.99, isNew: true },
    { id: 'imac-24', name: 'iMac 24" (M4)', category: 'mac', icon: 'Monitor', monthlyPrice: 6.99, annualPrice: 69.99 },
    { id: 'mac-mini', name: 'Mac mini (M4)', category: 'mac', icon: 'Monitor', monthlyPrice: 4.49, annualPrice: 44.99 },
    { id: 'mac-studio', name: 'Mac Studio', category: 'mac', icon: 'Monitor', monthlyPrice: 6.99, annualPrice: 69.99 },
    { id: 'mac-pro', name: 'Mac Pro', category: 'mac', icon: 'Monitor', monthlyPrice: 18.49, annualPrice: 184.99 },

    // Apple Watch — AppleCare+ includes Theft & Loss
    { id: 'watch-ultra-3', name: 'Apple Watch Ultra 3', category: 'watch', icon: 'Watch', monthlyPrice: 5.99, annualPrice: 59.99, isNew: true },
    { id: 'watch-series-11', name: 'Apple Watch Series 11', category: 'watch', icon: 'Watch', monthlyPrice: 4.99, annualPrice: 49.99, isNew: true },
    { id: 'watch-se', name: 'Apple Watch SE 3', category: 'watch', icon: 'Watch', monthlyPrice: 2.99, annualPrice: 29.99, isNew: true },
    { id: 'watch-ultra-2', name: 'Apple Watch Ultra 2', category: 'watch', icon: 'Watch', monthlyPrice: 4.49, legacy: true },
    { id: 'watch-series-10', name: 'Apple Watch Series 10', category: 'watch', icon: 'Watch', monthlyPrice: 3.49, legacy: true },

    // AirPods
    { id: 'airpods-pro-3', name: 'AirPods Pro 3', category: 'airpods', icon: 'Headphones', monthlyPrice: 1.99, annualPrice: 19.99, isNew: true },
    { id: 'airpods-max-2', name: 'AirPods Max 2', category: 'airpods', icon: 'Headphones', monthlyPrice: 2.99, annualPrice: 29.99, isNew: true },
    { id: 'airpods-4', name: 'AirPods 4', category: 'airpods', icon: 'Headphones', monthlyPrice: 1.49, annualPrice: 14.99 },
    { id: 'airpods-pro-2', name: 'AirPods Pro 2', category: 'airpods', icon: 'Headphones', monthlyPrice: 3.99, legacy: true },
    { id: 'airpods-max', name: 'AirPods Max', category: 'airpods', icon: 'Headphones', monthlyPrice: 3.99, legacy: true },

    // Other
    { id: 'vision-pro', name: 'Apple Vision Pro (M5)', category: 'other', icon: 'Glasses', monthlyPrice: 19.99, annualPrice: 199.99, isNew: true },
    { id: 'studio-display', name: 'Studio Display', category: 'other', icon: 'Monitor', monthlyPrice: 4.99, annualPrice: 49.99, isNew: true },
    { id: 'studio-display-xdr', name: 'Studio Display XDR', category: 'other', icon: 'Monitor', monthlyPrice: 9.99, annualPrice: 99.99, isNew: true },
    { id: 'apple-tv-4k', name: 'Apple TV 4K', category: 'other', icon: 'Tv', monthlyPrice: 0.99, annualPrice: 9.99 },
    { id: 'homepod', name: 'HomePod', category: 'other', icon: 'Speaker', monthlyPrice: 1.99, annualPrice: 19.99 },
    { id: 'homepod-mini', name: 'HomePod mini', category: 'other', icon: 'Speaker', monthlyPrice: 0.99, annualPrice: 9.99 },
];

export const CATEGORIES = [
    { id: 'iphone', name: 'iPhone', icon: 'Smartphone' },
    { id: 'ipad', name: 'iPad', icon: 'Tablet' },
    { id: 'mac', name: 'Mac', icon: 'Laptop' },
    { id: 'watch', name: 'Apple Watch', icon: 'Watch' },
    { id: 'airpods', name: 'AirPods', icon: 'Headphones' },
    { id: 'other', name: 'Other', icon: 'Package' },
] as const;

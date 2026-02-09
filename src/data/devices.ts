// Device catalog with AppleCare+ pricing
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
    annualPrice: number;
}

export const DEVICE_CATALOG: Device[] = [
    // iPhones
    { id: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', category: 'iphone', icon: 'Smartphone', monthlyPrice: 13.49, annualPrice: 269 },
    { id: 'iphone-16-pro', name: 'iPhone 16 Pro', category: 'iphone', icon: 'Smartphone', monthlyPrice: 13.49, annualPrice: 269 },
    { id: 'iphone-16-plus', name: 'iPhone 16 Plus', category: 'iphone', icon: 'Smartphone', monthlyPrice: 9.99, annualPrice: 199 },
    { id: 'iphone-16', name: 'iPhone 16', category: 'iphone', icon: 'Smartphone', monthlyPrice: 9.99, annualPrice: 199 },
    { id: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', category: 'iphone', icon: 'Smartphone', monthlyPrice: 13.49, annualPrice: 269 },
    { id: 'iphone-15-pro', name: 'iPhone 15 Pro', category: 'iphone', icon: 'Smartphone', monthlyPrice: 13.49, annualPrice: 269 },
    { id: 'iphone-15-plus', name: 'iPhone 15 Plus', category: 'iphone', icon: 'Smartphone', monthlyPrice: 9.99, annualPrice: 199 },
    { id: 'iphone-15', name: 'iPhone 15', category: 'iphone', icon: 'Smartphone', monthlyPrice: 9.99, annualPrice: 199 },
    { id: 'iphone-14', name: 'iPhone 14', category: 'iphone', icon: 'Smartphone', monthlyPrice: 9.99, annualPrice: 199 },
    { id: 'iphone-se', name: 'iPhone SE', category: 'iphone', icon: 'Smartphone', monthlyPrice: 4.49, annualPrice: 79 },

    // iPads
    { id: 'ipad-pro-13', name: 'iPad Pro 13"', category: 'ipad', icon: 'Tablet', monthlyPrice: 9.99, annualPrice: 199 },
    { id: 'ipad-pro-11', name: 'iPad Pro 11"', category: 'ipad', icon: 'Tablet', monthlyPrice: 9.99, annualPrice: 199 },
    { id: 'ipad-air-13', name: 'iPad Air 13"', category: 'ipad', icon: 'Tablet', monthlyPrice: 5.99, annualPrice: 99 },
    { id: 'ipad-air-11', name: 'iPad Air 11"', category: 'ipad', icon: 'Tablet', monthlyPrice: 5.99, annualPrice: 99 },
    { id: 'ipad-10', name: 'iPad (10th gen)', category: 'ipad', icon: 'Tablet', monthlyPrice: 4.49, annualPrice: 79 },
    { id: 'ipad-mini', name: 'iPad mini', category: 'ipad', icon: 'Tablet', monthlyPrice: 4.49, annualPrice: 79 },

    // Macs
    { id: 'macbook-pro-16', name: 'Macbook Pro 16"', category: 'mac', icon: 'Laptop', monthlyPrice: 9.99, annualPrice: 199 },
    { id: 'macbook-pro-14', name: 'Macbook Pro 14"', category: 'mac', icon: 'Laptop', monthlyPrice: 9.99, annualPrice: 199 },
    { id: 'macbook-air-15', name: 'Macbook Air 15"', category: 'mac', icon: 'Laptop', monthlyPrice: 5.99, annualPrice: 99 },
    { id: 'macbook-air-13', name: 'Macbook Air 13"', category: 'mac', icon: 'Laptop', monthlyPrice: 5.99, annualPrice: 99 },
    { id: 'imac-24', name: 'iMac 24"', category: 'mac', icon: 'Monitor', monthlyPrice: 5.99, annualPrice: 99 },
    { id: 'mac-mini', name: 'Mac mini', category: 'mac', icon: 'Monitor', monthlyPrice: 3.99, annualPrice: 69 },
    { id: 'mac-studio', name: 'Mac Studio', category: 'mac', icon: 'Monitor', monthlyPrice: 5.99, annualPrice: 99 },
    { id: 'mac-pro', name: 'Mac Pro', category: 'mac', icon: 'Monitor', monthlyPrice: 9.99, annualPrice: 199 },

    // Apple Watch
    { id: 'watch-ultra-2', name: 'Apple Watch Ultra 2', category: 'watch', icon: 'Watch', monthlyPrice: 4.49, annualPrice: 99 },
    { id: 'watch-series-10', name: 'Apple Watch Series 10', category: 'watch', icon: 'Watch', monthlyPrice: 3.49, annualPrice: 79 },
    { id: 'watch-se', name: 'Apple Watch SE', category: 'watch', icon: 'Watch', monthlyPrice: 2.99, annualPrice: 49 },

    // AirPods
    { id: 'airpods-pro-2', name: 'AirPods Pro 2', category: 'airpods', icon: 'Headphones', monthlyPrice: 3.99, annualPrice: 59 },
    { id: 'airpods-4', name: 'AirPods 4', category: 'airpods', icon: 'Headphones', monthlyPrice: 2.99, annualPrice: 49 },
    { id: 'airpods-max', name: 'AirPods Max', category: 'airpods', icon: 'Headphones', monthlyPrice: 3.99, annualPrice: 59 },

    // Other
    { id: 'apple-tv-4k', name: 'Apple TV 4K', category: 'other', icon: 'Tv', monthlyPrice: 2.49, annualPrice: 39 },
    { id: 'homepod', name: 'HomePod', category: 'other', icon: 'Speaker', monthlyPrice: 2.49, annualPrice: 39 },
    { id: 'homepod-mini', name: 'HomePod mini', category: 'other', icon: 'Speaker', monthlyPrice: 1.99, annualPrice: 29 },
    { id: 'vision-pro', name: 'Apple Vision Pro', category: 'other', icon: 'Glasses', monthlyPrice: 24.99, annualPrice: 499 },
];

export const CATEGORIES = [
    { id: 'iphone', name: 'iPhone', icon: 'Smartphone' },
    { id: 'ipad', name: 'iPad', icon: 'Tablet' },
    { id: 'mac', name: 'Mac', icon: 'Laptop' },
    { id: 'watch', name: 'Apple Watch', icon: 'Watch' },
    { id: 'airpods', name: 'AirPods', icon: 'Headphones' },
    { id: 'other', name: 'Other', icon: 'Package' },
] as const;



import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type ThemeChoice = 'dark' | 'light';

const STORAGE_KEY = 'theme';

/** An explicit choice the visitor made, or null when we should follow the system. */
function readStoredChoice(): ThemeChoice | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
}

function systemPrefersDark(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeToggle() {
    const [choice, setChoice] = useState<ThemeChoice | null>(readStoredChoice);
    const [systemDark, setSystemDark] = useState(systemPrefersDark);

    // Keep following the OS for as long as the visitor hasn't picked a theme.
    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    const isDark = choice !== null ? choice === 'dark' : systemDark;

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    // Only an explicit click pins a theme — first-time visitors stay on the system setting.
    const handleClick = () => {
        const next: ThemeChoice = isDark ? 'light' : 'dark';
        setChoice(next);
        localStorage.setItem(STORAGE_KEY, next);
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="absolute top-14 right-4 md:right-6 z-50 px-4 py-2 bg-[var(--swiss-button-bg)] text-[var(--swiss-button-text)] font-mono text-xs uppercase font-bold border-2 border-[var(--swiss-card-border)] tracking-widest transition-colors duration-300 cursor-pointer"
        >
            <div className="flex items-center gap-3">
                <span>{isDark ? 'LIGHT' : 'DARK'}</span>
                <div className="w-3 h-3 bg-[var(--swiss-accent)]" />
            </div>
            {/* Minimalist offset shadow */}
            <div className="absolute inset-0 bg-[var(--swiss-button-bg)] translate-x-1 translate-y-1 -z-10 opacity-20" />
        </motion.button>
    );
}

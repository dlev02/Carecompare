import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDark(!isDark)}
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

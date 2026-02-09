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
            className="fixed top-8 right-8 z-50 px-4 py-2 bg-black dark:bg-[#f5f2eb] text-[#f5f2eb] dark:text-black font-mono text-xs uppercase font-bold border-2 border-black tracking-widest transition-colors duration-300"
        >
            <div className="flex items-center gap-3">
                <span>{isDark ? 'LIGHT' : 'DARK'}</span>
                <div className="w-3 h-3 bg-[#e63946]" />
            </div>
            {/* Minimalist offset shadow */}
            <div className="absolute inset-0 bg-black dark:bg-[#f5f2eb] translate-x-1 translate-y-1 -z-10 opacity-20" />
        </motion.button>
    );
}

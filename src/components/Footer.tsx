import { motion } from 'framer-motion';

export function Footer() {
    return (
        <footer className="py-12 px-6 border-t-2 border-[var(--swiss-card-border)] bg-[var(--swiss-bg)] transition-colors duration-400">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-2">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-[var(--swiss-text)] opacity-60 text-xs font-mono uppercase tracking-tighter font-bold transition-colors duration-400"
                >
                    Designed &amp; developed by{' '}
                    <a
                        href="https://drewlevinson.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-[var(--swiss-accent)]"
                    >
                        Drew Levinson ↗
                    </a>
                </motion.p>
            </div>
        </footer>
    );
}

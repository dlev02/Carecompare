import { motion } from 'framer-motion';

interface FooterProps {
    variant?: 'glass' | 'minimal' | 'playful' | 'liquid' | 'swiss';
}

export function Footer({ variant = 'minimal' }: FooterProps) {
    const getFooterClass = () => {
        switch (variant) {
            case 'glass':
                return "py-12 px-6 border-t border-white/10 backdrop-blur-md bg-white/5";
            case 'minimal':
                return "py-12 px-6 border-t border-white/5 bg-black";
            case 'playful':
                return "py-12 px-6 border-t font-medium";
            case 'liquid':
                return "py-12 px-6 border-t border-cyan-500/10 backdrop-blur-xl bg-[#0c1222]/50";
            case 'swiss':
                return "py-12 px-6 border-t-2 border-black bg-[#f5f2eb]";
            default:
                return "py-12 px-6";
        }
    };

    const getTextClass = () => {
        switch (variant) {
            case 'glass':
                return "text-white/40 text-sm tracking-wide";
            case 'minimal':
                return "text-white/30 text-xs uppercase tracking-widest";
            case 'playful':
                return "text-black/40 text-sm font-medium";
            case 'liquid':
                return "text-cyan-300/40 text-sm font-serif tracking-wide italic";
            case 'swiss':
                return "text-black/60 text-xs font-mono uppercase tracking-tighter font-bold";
            default:
                return "text-gray-400 text-sm";
        }
    };

    const getLinkClass = () => {
        switch (variant) {
            case 'glass':
                return "text-white/60 hover:text-white transition-colors duration-300 underline underline-offset-4 decoration-white/20";
            case 'minimal':
                return "text-white/50 hover:text-white transition-all duration-300 hover:tracking-[0.2em]";
            case 'playful':
                return "text-black/60 hover:text-[#ff3366] transition-colors duration-300 underline decoration-2 decoration-[#ff3366]/20 hover:decoration-[#ff3366]";
            case 'liquid':
                return "text-cyan-300/60 hover:text-cyan-200 transition-all duration-500 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]";
            case 'swiss':
                return "text-black hover:text-[#e63946] transition-colors duration-200 border-b border-black hover:border-[#e63946]";
            default:
                return "text-gray-600 hover:text-black transition-colors";
        }
    };

    return (
        <footer className={getFooterClass()}>
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-2">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={getTextClass()}
                >
                    Designed & Developed by{" "}
                    <a
                        href="https://drewlevinson.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={getLinkClass()}
                    >
                        Drew Levinson
                    </a>
                </motion.p>
            </div>
        </footer>
    );
}

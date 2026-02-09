import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const designs = [
    { path: '/1', name: 'Glass Aurora', color: 'from-purple-500 to-cyan-500' },
    { path: '/2', name: 'Minimal Black', color: 'from-neutral-600 to-cyan-400' },
    { path: '/3', name: 'Playful', color: 'from-orange-400 to-pink-400' },
    { path: '/4', name: 'Liquid Crystal', color: 'from-cyan-400 via-violet-500 to-pink-500' },
    { path: '/5', name: 'Swiss Precision', color: 'from-red-500 to-neutral-800' },
];

export function DesignSwitcher() {
    const location = useLocation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                <span className="text-white/50 text-xs font-medium mr-2">Design</span>
                {designs.map((design) => (
                    <Link
                        key={design.path}
                        to={design.path}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                w-8 h-8 rounded-full bg-gradient-to-br ${design.color}
                flex items-center justify-center text-white text-xs font-bold
                transition-all cursor-pointer
                ${location.pathname === design.path
                                    ? 'ring-2 ring-white ring-offset-2 ring-offset-black/80'
                                    : 'opacity-60 hover:opacity-100'}
              `}
                            title={design.name}
                        >
                            {design.path.slice(1)}
                        </motion.div>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
}

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedPriceProps {
    value: number;
    className?: string;
}

/** Odometer-style price that springs toward its new value instead of snapping */
export function AnimatedPrice({ value, className }: AnimatedPriceProps) {
    const spring = useSpring(value, { stiffness: 180, damping: 26, mass: 0.6 });
    const display = useTransform(spring, (v) => `$${v.toFixed(2)}`);

    useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    return <motion.span className={className}>{display}</motion.span>;
}

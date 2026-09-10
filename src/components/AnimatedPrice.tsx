import {
    motion,
    useSpring,
    useTransform,
    useReducedMotion,
} from 'framer-motion';
import { useEffect } from 'react';

interface AnimatedPriceProps {
    value: number;
    className?: string;
}

/** Odometer-style price that springs toward its new value instead of snapping */
export function AnimatedPrice({ value, className }: AnimatedPriceProps) {
    const reduceMotion = useReducedMotion();
    const spring = useSpring(value, { stiffness: 180, damping: 26, mass: 0.6 });
    const display = useTransform(spring, (v) => `$${v.toFixed(2)}`);

    useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    if (reduceMotion)
        return <span className={className}>${value.toFixed(2)}</span>;
    return <motion.span className={className}>{display}</motion.span>;
}

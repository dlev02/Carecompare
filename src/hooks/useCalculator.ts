import { useMemo } from 'react';
import type { Device } from '../data/devices';

// AppleCare One pricing
const APPLECARE_ONE_BASE = 19.99; // Monthly for up to 3 devices
const APPLECARE_ONE_ADDITIONAL = 5.99; // Per additional device beyond 3

export interface CalculationResult {
    individualMonthly: number;
    individualAnnual: number;
    bundleMonthly: number;
    bundleAnnual: number;
    monthlySavings: number;
    annualSavings: number;
    recommendation: 'individual' | 'bundle' | 'equal';
    savingsPercent: number;
}

export function useCalculator(selectedDevices: Device[]): CalculationResult {
    return useMemo(() => {
        if (selectedDevices.length === 0) {
            return {
                individualMonthly: 0,
                individualAnnual: 0,
                bundleMonthly: 0,
                bundleAnnual: 0,
                monthlySavings: 0,
                annualSavings: 0,
                recommendation: 'equal',
                savingsPercent: 0,
            };
        }

        // Calculate individual AppleCare+ costs
        const individualMonthly = selectedDevices.reduce(
            (sum, device) => sum + device.monthlyPrice,
            0
        );
        const individualAnnual = individualMonthly * 12;

        // Calculate AppleCare One bundle cost
        const deviceCount = selectedDevices.length;
        const additionalDevices = Math.max(0, deviceCount - 3);
        const bundleMonthly = APPLECARE_ONE_BASE + (additionalDevices * APPLECARE_ONE_ADDITIONAL);
        const bundleAnnual = bundleMonthly * 12;

        // Calculate savings
        const monthlySavings = Math.abs(individualMonthly - bundleMonthly);
        const annualSavings = monthlySavings * 12;

        // Determine recommendation
        let recommendation: 'individual' | 'bundle' | 'equal';
        if (individualMonthly < bundleMonthly) {
            recommendation = 'individual';
        } else if (bundleMonthly < individualMonthly) {
            recommendation = 'bundle';
        } else {
            recommendation = 'equal';
        }

        // Calculate savings percentage
        const maxCost = Math.max(individualMonthly, bundleMonthly);
        const savingsPercent = maxCost > 0 ? (monthlySavings / maxCost) * 100 : 0;

        return {
            individualMonthly,
            individualAnnual,
            bundleMonthly,
            bundleAnnual,
            monthlySavings,
            annualSavings,
            recommendation,
            savingsPercent,
        };
    }, [selectedDevices]);
}

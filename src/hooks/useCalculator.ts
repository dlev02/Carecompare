import { useMemo } from 'react';
import type { Device } from '../data/devices';

// AppleCare One pricing
const APPLECARE_ONE_BASE = 19.99; // Monthly for up to 3 devices
const APPLECARE_ONE_ADDITIONAL = 5.99; // Per additional device beyond 3
export const APPLECARE_ONE = {
    base: APPLECARE_ONE_BASE,
    additional: APPLECARE_ONE_ADDITIONAL,
    baseSlots: 3,
};

export interface CalculationResult {
    individualMonthly: number;
    individualAnnual: number;
    /** Total if each plan is prepaid yearly instead of billed monthly */
    individualAnnualPrepay: number;
    bundleMonthly: number;
    bundleAnnual: number;
    monthlySavings: number;
    annualSavings: number;
    recommendation: 'individual' | 'bundle' | 'equal';
    savingsPercent: number;
    /** Unused bundle slots before the +$5.99 surcharge kicks in */
    openBundleSlots: number;
}

export function useCalculator(selectedDevices: Device[]): CalculationResult {
    return useMemo(() => {
        if (selectedDevices.length === 0) {
            return {
                individualMonthly: 0,
                individualAnnual: 0,
                individualAnnualPrepay: 0,
                bundleMonthly: 0,
                bundleAnnual: 0,
                monthlySavings: 0,
                annualSavings: 0,
                recommendation: 'equal' as const,
                savingsPercent: 0,
                openBundleSlots: APPLECARE_ONE.baseSlots,
            };
        }

        // Individual AppleCare+ costs
        const individualMonthly = selectedDevices.reduce(
            (sum, device) => sum + device.monthlyPrice,
            0
        );
        const individualAnnual = individualMonthly * 12;
        // Legacy devices have no published annual option — they stay on monthly billing
        const individualAnnualPrepay = selectedDevices.reduce(
            (sum, device) => sum + (device.annualPrice ?? device.monthlyPrice * 12),
            0
        );

        // AppleCare One bundle cost
        const deviceCount = selectedDevices.length;
        const additionalDevices = Math.max(0, deviceCount - APPLECARE_ONE.baseSlots);
        const bundleMonthly = APPLECARE_ONE_BASE + (additionalDevices * APPLECARE_ONE_ADDITIONAL);
        const bundleAnnual = bundleMonthly * 12;

        // Savings
        const monthlySavings = Math.abs(individualMonthly - bundleMonthly);
        const annualSavings = monthlySavings * 12;

        let recommendation: 'individual' | 'bundle' | 'equal';
        if (individualMonthly < bundleMonthly) {
            recommendation = 'individual';
        } else if (bundleMonthly < individualMonthly) {
            recommendation = 'bundle';
        } else {
            recommendation = 'equal';
        }

        const maxCost = Math.max(individualMonthly, bundleMonthly);
        const savingsPercent = maxCost > 0 ? (monthlySavings / maxCost) * 100 : 0;

        return {
            individualMonthly,
            individualAnnual,
            individualAnnualPrepay,
            bundleMonthly,
            bundleAnnual,
            monthlySavings,
            annualSavings,
            recommendation,
            savingsPercent,
            openBundleSlots: Math.max(0, APPLECARE_ONE.baseSlots - deviceCount),
        };
    }, [selectedDevices]);
}

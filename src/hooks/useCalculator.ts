import { useMemo } from 'react';
import type { Device } from '../data/devices';

// U.S. terms checked September 9, 2026: https://www.apple.com/applecare/
export const APPLECARE_ONE = { base: 19.99, additional: 5.99, baseSlots: 3 };
export const APPLECARE_FAMILY = {
    monthly: 49.99,
    maxPeople: 6,
    available: 'September 14, 2026',
};
export type Billing = 'monthly' | 'annual';
export const validBill = (value: string) =>
    /^\d+(\.\d{1,2})?$/.test(value) && Number(value) <= 100000;
export interface OwnedDevice {
    id: string;
    device: Device;
    eligible: boolean;
}
export interface Person {
    id: string;
    name: string;
    devices: OwnedDevice[];
    currentPlan: 'plus' | 'one' | 'custom';
    currentBill: string;
}
export interface PersonComparison {
    person: Person;
    plus: number;
    one: number | null;
    best: number;
    bundledIds: string[];
    current: number | null;
}
export interface CalculationResult {
    people: PersonComparison[];
    count: number;
    excluded: number;
    plus: number;
    separate: number;
    one: number | null;
    family: number;
    current: number | null;
    best: number;
    billing: Billing;
}
const cents = (amount: number) => Math.round(amount * 100);
// Compare integer annual cents so annual fallbacks and ties are exact.
const plusCost = (device: Device, billing: Billing) =>
    billing === 'annual' && device.annualPrice !== undefined
        ? cents(device.annualPrice)
        : cents(device.monthlyPrice) * 12;
const bundleCost = (count: number) =>
    count === 0 ? 0 : (1999 + 599 * Math.max(0, count - 3)) * 12;

export function calculate(
    people: Person[],
    billing: Billing,
    familyMode: boolean
): CalculationResult {
    const comparisons = people.map((person) => {
        const plus = person.devices.reduce(
            (sum, item) => sum + plusCost(item.device, billing),
            0
        );
        const eligible = person.devices
            .filter((item) => item.eligible)
            .sort(
                (a, b) =>
                    plusCost(b.device, billing) - plusCost(a.device, billing)
            );
        let one: number | null = null;
        let bestIds: string[] = [];
        let removedCost = 0;
        // For each bundle size, covering the most expensive separate plans is optimal.
        eligible.forEach((item, index) => {
            removedCost += plusCost(item.device, billing);
            const candidate = bundleCost(index + 1) + plus - removedCost;
            if (one === null || candidate < one) {
                one = candidate;
                bestIds = eligible.slice(0, index + 1).map((entry) => entry.id);
            }
        });
        const excluded = person.devices
            .filter((item) => !item.eligible)
            .reduce((sum, item) => sum + plusCost(item.device, 'monthly'), 0);
        let current: number | null =
            person.currentPlan === 'one'
                ? bundleCost(eligible.length) + excluded
                : person.devices.reduce(
                      (sum, item) => sum + plusCost(item.device, 'monthly'),
                      0
                  );
        if (person.currentPlan === 'custom') {
            current = validBill(person.currentBill)
                ? cents(Number(person.currentBill)) * 12
                : null;
        }
        return {
            person,
            plus,
            one,
            best: Math.min(plus, one ?? plus),
            bundledIds: one !== null && one < plus ? bestIds : [],
            current,
        };
    });
    const count = people.reduce(
        (sum, person) => sum + person.devices.length,
        0
    );
    const excludedDevices = people
        .flatMap((person) => person.devices)
        .filter((item) => !item.eligible);
    const plus = comparisons.reduce((sum, person) => sum + person.plus, 0);
    const separate = comparisons.reduce((sum, person) => sum + person.best, 0);
    const family = count
        ? cents(APPLECARE_FAMILY.monthly) * 12 +
          excludedDevices.reduce(
              (sum, item) => sum + plusCost(item.device, billing),
              0
          )
        : 0;
    const current = comparisons.some((person) => person.current === null)
        ? null
        : comparisons.reduce((sum, person) => sum + person.current!, 0);
    return {
        people: comparisons,
        count,
        excluded: excludedDevices.length,
        plus,
        separate,
        one: comparisons[0]?.one ?? null,
        family,
        current,
        best:
            familyMode && people.length <= APPLECARE_FAMILY.maxPeople
                ? Math.min(separate, family)
                : separate,
        billing,
    };
}
export function useCalculator(
    people: Person[],
    billing: Billing,
    familyMode: boolean
) {
    return useMemo(
        () => calculate(people, billing, familyMode),
        [people, billing, familyMode]
    );
}

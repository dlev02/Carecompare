import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculate } from '../src/hooks/useCalculator';
import type { Person, OwnedDevice, Billing } from '../src/hooks/useCalculator';
import { DEVICE_CATALOG } from '../src/data/devices';
const item = (
    id: string,
    monthlyPrice: number,
    annualPrice?: number,
    eligible = true
): OwnedDevice => ({
    id,
    eligible,
    device: {
        id: 'same-model',
        name: 'Test device',
        category: 'iphone',
        icon: 'Smartphone',
        monthlyPrice,
        annualPrice,
    },
});
const person = (
    devices: OwnedDevice[],
    extra: Partial<Person> = {}
): Person => ({
    id: 'person',
    name: 'You',
    devices,
    currentPlan: 'plus',
    currentBill: '',
    ...extra,
});
const annualCents = (monthly: number) => Math.round(monthly * 100) * 12;

describe('AppleCare comparisons', () => {
    it('has no cost or recommendation without devices', () => {
        const result = calculate([person([])], 'monthly', true);
        assert.equal(result.count, 0);
        assert.equal(result.best, 0);
        assert.equal(result.family, 0);
        assert.equal(result.one, null);
    });
    it('uses the three-device base and adds a fourth expensive device for $5.99', () => {
        const three = [item('a', 15), item('b', 15), item('c', 15)];
        assert.equal(
            calculate([person(three)], 'monthly', false).one,
            annualCents(19.99)
        );
        assert.equal(
            calculate([person([...three, item('d', 15)])], 'monthly', false)
                .one,
            annualCents(25.98)
        );
    });
    it('leaves a low-cost fourth device separate instead of adding a $5.99 slot', () => {
        const result = calculate(
            [
                person([
                    item('a', 15),
                    item('b', 15),
                    item('c', 15),
                    item('d', 0.99),
                ]),
            ],
            'monthly',
            true
        );
        assert.equal(result.separate, annualCents(20.98));
        assert.deepEqual(result.people[0].bundledIds, ['a', 'b', 'c']);
    });
    it('never pools Individual slots across people', () => {
        const result = calculate(
            [
                person([item('a', 14.99)]),
                person([item('b', 14.99)], { id: 'other' }),
            ],
            'monthly',
            true
        );
        assert.equal(result.separate, annualCents(29.98));
    });
    it('counts repeated models separately and Family stays flat beyond three devices', () => {
        const people = Array.from({ length: 6 }, (_, i) =>
            person(
                Array.from({ length: 8 }, (_, j) => item(`${i}-${j}`, 14.99)),
                { id: String(i) }
            )
        );
        const result = calculate(people, 'monthly', true);
        assert.equal(result.count, 48);
        assert.equal(result.family, annualCents(49.99));
        assert.equal(result.best, result.family);
    });
    it('keeps excluded devices in every option and outside all bundles', () => {
        const result = calculate(
            [
                person([
                    item('a', 15, undefined, false),
                    item('b', 15),
                    item('c', 15),
                ]),
            ],
            'monthly',
            true
        );
        assert.equal(result.family, annualCents(64.99));
        assert.equal(result.one, annualCents(34.99));
        assert.equal(result.excluded, 1);
        assert.deepEqual(result.people[0].bundledIds, ['b', 'c']);
        assert.equal(
            calculate(
                [person([item('x', 15, undefined, false)])],
                'monthly',
                false
            ).one,
            null
        );
    });
    it('handles exact ties in cents', () => {
        const result = calculate(
            [person([item('a', 10), item('b', 9.99)])],
            'monthly',
            false
        );
        assert.equal(result.plus, result.one);
        assert.equal(result.best, result.plus);
    });
    it('annual pricing can change the winner and uses monthly fallback only where needed', () => {
        const devices = [item('a', 12, 120), item('b', 9, 90)];
        assert.equal(
            calculate([person(devices)], 'monthly', false).best,
            annualCents(19.99)
        );
        const annual = calculate([person(devices)], 'annual', false);
        assert.equal(annual.best, 21000);
        assert.equal(annual.plus, 21000);
        assert.equal(
            calculate(
                [person([item('c', 2), item('d', 9, 90)])],
                'annual',
                false
            ).plus,
            11400
        );
    });
    it('compares real mixed spending without rounding or accepting invalid input', () => {
        const people = [
            person([item('a', 15), item('b', 15), item('c', 15)], {
                currentPlan: 'one',
            }),
            person([item('d', 15)], {
                id: '2',
                currentPlan: 'custom',
                currentBill: '12.34',
            }),
        ];
        assert.equal(
            calculate(people, 'annual', true).current,
            annualCents(32.33)
        );
        for (const invalid of [
            '',
            '-1',
            'NaN',
            'Infinity',
            '1.234',
            '1e3',
            '100001',
        ]) {
            assert.equal(
                calculate(
                    [
                        person([item('a', 15)], {
                            currentPlan: 'custom',
                            currentBill: invalid,
                        }),
                    ],
                    'monthly',
                    false
                ).current,
                null
            );
        }
        assert.equal(
            calculate(
                [
                    person([item('a', 15)], {
                        currentPlan: 'custom',
                        currentBill: '0',
                    }),
                ],
                'monthly',
                false
            ).current,
            0
        );
    });
    it('matches exhaustive bundle-subset costs for uneven annual and monthly device sets', () => {
        const devices = [
            item('a', 14.99, 149.99),
            item('b', 9.99, 99.99),
            item('c', 0.99),
            item('d', 3.99, 39.99),
            item('e', 12.99),
            item('f', 7.49, 74.99, false),
        ];
        for (const billing of ['monthly', 'annual'] as Billing[]) {
            const cost = (entry: OwnedDevice) =>
                billing === 'annual' && entry.device.annualPrice !== undefined
                    ? Math.round(entry.device.annualPrice * 100)
                    : annualCents(entry.device.monthlyPrice);
            let brute = devices.reduce((sum, entry) => sum + cost(entry), 0);
            for (let mask = 1; mask < 2 ** devices.length; mask++) {
                const covered = devices.filter(
                    (_, index) => mask & (1 << index)
                );
                if (covered.some((entry) => !entry.eligible)) continue;
                const total =
                    (1999 + Math.max(0, covered.length - 3) * 599) * 12 +
                    devices
                        .filter((_, index) => !(mask & (1 << index)))
                        .reduce((sum, entry) => sum + cost(entry), 0);
                brute = Math.min(brute, total);
            }
            assert.equal(
                calculate([person(devices)], billing, false).best,
                brute
            );
        }
    });
    it('catalog has unique IDs, valid prices and all requested verified additions', () => {
        assert.equal(
            new Set(DEVICE_CATALOG.map((d) => d.id)).size,
            DEVICE_CATALOG.length
        );
        for (const device of DEVICE_CATALOG) {
            assert.ok(
                Number.isFinite(device.monthlyPrice) && device.monthlyPrice > 0
            );
            if (device.annualPrice !== undefined)
                assert.ok(device.annualPrice > 0);
        }
        for (const id of [
            'iphone-18-pro',
            'iphone-18-pro-max',
            'watch-series-12',
            'watch-ultra-4',
            'airpods-5',
            'macbook-pro-14-m3-max',
            'macbook-pro-16-m3-max',
            'watch-series-9',
        ])
            assert.ok(
                DEVICE_CATALOG.some((device) => device.id === id),
                id
            );
    });
});

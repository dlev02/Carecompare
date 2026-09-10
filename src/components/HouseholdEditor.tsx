import { useState } from 'react';
import { validBill } from '../hooks/useCalculator';
import { Plus, Minus, X } from 'lucide-react';
import type { Person, OwnedDevice, Billing } from '../hooks/useCalculator';
import { DeviceIconMap } from './deviceIcons';
interface Props {
    people: Person[];
    activeId: string;
    familyMode: boolean;
    comparisonMonthly: number;
    billing: Billing;
    onActive: (id: string) => void;
    onAddPerson: () => void;
    onRemovePerson: (id: string) => void;
    onUpdate: (person: Person) => void;
}
export function HouseholdEditor({
    people,
    activeId,
    familyMode,
    comparisonMonthly,
    billing,
    onActive,
    onAddPerson,
    onRemovePerson,
    onUpdate,
}: Props) {
    const [blurredBillId, setBlurredBillId] = useState<string | null>(null);
    const person = people.find((item) => item.id === activeId) ?? people[0];
    const billError =
        blurredBillId === person.id &&
        person.currentPlan === 'custom' &&
        !validBill(person.currentBill);
    const updateDevice = (item: OwnedDevice) =>
        onUpdate({
            ...person,
            devices: person.devices.map((entry) =>
                entry.id === item.id ? item : entry
            ),
        });
    return (
        <div className="household-editor">
            {familyMode && (
                <>
                    <div
                        className="people-list"
                        aria-label="People in your comparison"
                    >
                        {people.map((item, index) => (
                            <button
                                key={item.id}
                                data-person-id={item.id}
                                aria-pressed={person.id === item.id}
                                onClick={() => onActive(item.id)}
                            >
                                <span className="person-number">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span>
                                    {item.name || `Person ${index + 1}`}
                                </span>
                                <span className="person-count">
                                    {item.devices.length}
                                </span>
                            </button>
                        ))}
                        <button
                            className="add-person"
                            disabled={people.length >= 6}
                            onClick={onAddPerson}
                        >
                            <Plus size={15} /> Add person
                        </button>
                    </div>
                    <p className="small-note people-note">
                        {people.length} of 6 people · One Family Sharing group
                    </p>
                </>
            )}
            <div className="person-heading">
                {familyMode ? (
                    <label className="name-field">
                        <span className="swiss-label">Name</span>
                        <input
                            aria-label="Person name"
                            maxLength={30}
                            value={person.name}
                            onChange={(event) =>
                                onUpdate({
                                    ...person,
                                    name: event.target.value,
                                })
                            }
                        />
                    </label>
                ) : (
                    <h3>Your devices</h3>
                )}
                {familyMode && people.indexOf(person) > 0 && (
                    <button
                        className="text-button"
                        onClick={() => onRemovePerson(person.id)}
                    >
                        <X size={14} /> Remove person
                    </button>
                )}
            </div>
            {person.devices.length ? (
                <div className="owned-devices">
                    {person.devices.map((item) => {
                        const Icon = DeviceIconMap[item.device.icon];
                        return (
                            <div className="owned-device" key={item.id}>
                                <Icon size={19} aria-hidden="true" />
                                <div className="owned-device-copy">
                                    <strong>{item.device.name}</strong>
                                    {item.device.pricingStatus && (
                                        <small className="price-provenance">
                                            {item.device.pricingStatus ===
                                            'refurbished'
                                                ? 'Apple refurbished offer; your bill may differ.'
                                                : 'Older reference rate; price and coverage may differ.'}
                                        </small>
                                    )}
                                    <label>
                                        <input
                                            type="checkbox"
                                            aria-label={`${item.device.name}: eligible for One`}
                                            checked={item.eligible}
                                            onChange={(event) =>
                                                updateDevice({
                                                    ...item,
                                                    eligible:
                                                        event.target.checked,
                                                })
                                            }
                                        />{' '}
                                        Eligible for One
                                    </label>
                                </div>
                                <button
                                    className="remove-device"
                                    aria-label={`Remove ${item.device.name}`}
                                    onClick={() =>
                                        onUpdate({
                                            ...person,
                                            devices: person.devices.filter(
                                                (entry) => entry.id !== item.id
                                            ),
                                        })
                                    }
                                >
                                    <Minus size={16} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="devices-empty">
                    <span>＋</span>
                    <p>
                        {familyMode
                            ? `Start with ${person.name || 'this person'}’s devices.`
                            : 'Start with the devices you want to cover.'}
                        <br />
                        <small>Choose from the catalog below.</small>
                    </p>
                </div>
            )}
            <details className="current-plan" key={person.id}>
                <summary>
                    Current spending <span>Optional</span>
                </summary>
                <div className="current-plan-fields">
                    <label>
                        <span>
                            Current coverage for {person.name || 'this person'}
                        </span>
                        <select
                            value={person.currentPlan}
                            onChange={(event) =>
                                onUpdate({
                                    ...person,
                                    currentPlan: event.target
                                        .value as Person['currentPlan'],
                                })
                            }
                        >
                            <option value="plus">AppleCare+ per device</option>
                            <option value="one">
                                AppleCare One Individual
                            </option>
                            <option value="custom">
                                Mixed plans / enter my bill
                            </option>
                        </select>
                    </label>
                    {person.currentPlan === 'custom' && (
                        <label>
                            <span>Total per month (USD)</span>
                            <input
                                inputMode="decimal"
                                placeholder="e.g. 34.97"
                                value={person.currentBill}
                                aria-invalid={billError || undefined}
                                aria-describedby={
                                    billError
                                        ? 'bill-help bill-error'
                                        : 'bill-help'
                                }
                                onBlur={() => setBlurredBillId(person.id)}
                                onChange={(event) =>
                                    onUpdate({
                                        ...person,
                                        currentBill: event.target.value,
                                    })
                                }
                            />
                        </label>
                    )}
                    {billError && (
                        <p id="bill-error" className="field-error" role="alert">
                            Enter a monthly amount from $0 to $100,000, with up
                            to two decimal places.
                        </p>
                    )}
                    <p className="small-note" id="bill-help">
                        {person.currentPlan === 'custom'
                            ? 'Include all selected devices for this person. For prepaid plans, divide the total by the number of covered months. Use up to two decimal places.'
                            : 'Estimated from the selected devices. Choose “Mixed plans” to enter your actual bill, including older rates.'}
                    </p>
                </div>
            </details>
            {people.some((item) => item.devices.length > 0) && (
                <a className="mobile-results-link" href="#comparison">
                    View comparison{' '}
                    <span>${comparisonMonthly.toFixed(2)}/mo{billing === 'annual' ? ' equiv.' : ' lowest'} ↓</span>
                </a>
            )}
        </div>
    );
}

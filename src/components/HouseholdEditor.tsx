import { useState } from 'react';
import type { ReactNode } from 'react';
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
    /** The device catalog, rendered between the owned list and current spending. */
    children: ReactNode;
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
    children,
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
    const hasDevices = person.devices.length > 0;
    return (
        <div className="household-editor">
            {familyMode && (
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
                            <span>{item.name || `Person ${index + 1}`}</span>
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
                        <Plus size={15} />{' '}
                        {people.length >= 6 ? 'Six people max' : 'Add person'}
                    </button>
                </div>
            )}
            {(familyMode || hasDevices) && (
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
                        <h3>
                            Your devices{' '}
                            <span className="device-count">
                                {person.devices.length}
                            </span>
                        </h3>
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
            )}
            {hasDevices && (
                <div className="owned-devices">
                    {person.devices.map((item) => {
                        const Icon = DeviceIconMap[item.device.icon];
                        return (
                            <div className="owned-device" key={item.id}>
                                <Icon size={19} aria-hidden="true" />
                                <div className="owned-device-copy">
                                    <strong>{item.device.name}</strong>
                                    <span>
                                        ${item.device.monthlyPrice.toFixed(2)}
                                        /mo on AppleCare+
                                        {item.device.pricingStatus && (
                                            <b
                                                className="price-tag"
                                                title={
                                                    item.device
                                                        .pricingStatus ===
                                                    'refurbished'
                                                        ? 'Apple refurbished offer; your bill may differ.'
                                                        : 'Older reference rate; price and coverage may differ.'
                                                }
                                            >
                                                {item.device.pricingStatus ===
                                                'refurbished'
                                                    ? 'Refurb offer'
                                                    : 'Older rate'}
                                            </b>
                                        )}
                                    </span>
                                </div>
                                <label className="eligible-toggle">
                                    <input
                                        type="checkbox"
                                        aria-label={`${item.device.name}: eligible for One`}
                                        checked={item.eligible}
                                        onChange={(event) =>
                                            updateDevice({
                                                ...item,
                                                eligible: event.target.checked,
                                            })
                                        }
                                    />
                                    <span>Eligible for One</span>
                                </label>
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
            )}
            {children}
            {hasDevices && (
                <details className="current-plan" key={person.id}>
                    <summary>
                        Current spending <span>Optional</span>
                    </summary>
                    <div className="current-plan-fields">
                        <label>
                            <span>
                                Current coverage for{' '}
                                {person.name || 'this person'}
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
                                <option value="plus">
                                    AppleCare+ per device
                                </option>
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
                            <p
                                id="bill-error"
                                className="field-error"
                                role="alert"
                            >
                                Enter a monthly amount from $0 to $100,000,
                                with up to two decimal places.
                            </p>
                        )}
                        <p className="small-note" id="bill-help">
                            {person.currentPlan === 'custom'
                                ? 'Include every selected device for this person. For prepaid plans, divide the total by the covered months.'
                                : 'Estimated from the selected devices. Choose “Mixed plans” to enter what you actually pay.'}
                        </p>
                    </div>
                </details>
            )}
            {people.some((item) => item.devices.length > 0) && (
                <a className="mobile-results-link" href="#comparison">
                    View comparison{' '}
                    <span>
                        ${comparisonMonthly.toFixed(2)}/mo
                        {billing === 'annual' ? ' equiv.' : ' lowest'} ↓
                    </span>
                </a>
            )}
        </div>
    );
}

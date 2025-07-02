import { type ChangeEvent, useState } from 'react';
import { useSpacetime } from '~/spacetimedb/useSpacetimeConnection';

export default function UpgradeForm() {
  const { conn } = useSpacetime();

  const [form, setForm] = useState({
    identifier: '',
    title: '',
    description: '',
    level: '',
    cost: '',
    passive_income_bonus: '',
    click_power_bonus: '',
    click_timer_bonus: '',
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!conn) {
      return;
    }

    const level = Number.parseInt(form.level || '1', 10);
    const cost = BigInt(form.cost || '0');

    const passiveIncomeBonus = form.passive_income_bonus
      ? BigInt(form.passive_income_bonus)
      : undefined;
    const clickPowerBonus = form.click_power_bonus
      ? BigInt(form.click_power_bonus)
      : undefined;
    const clickTimerBonus = form.click_timer_bonus
      ? BigInt(form.click_timer_bonus)
      : undefined;

    conn.reducers.addUpgrade(
      form.identifier,
      form.title,
      form.description,
      level,
      cost,
      passiveIncomeBonus,
      clickPowerBonus,
      clickTimerBonus
    );

    setStatus('✅ Upgrade added successfully!');
    setForm({
      identifier: '',
      title: '',
      description: '',
      level: '',
      cost: '',
      passive_income_bonus: '',
      click_power_bonus: '',
      click_timer_bonus: '',
    });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-2 rounded border p-4">
      <h2 className="font-bold text-xl">Add New Upgrade</h2>

      <input
        className="rounded border p-2"
        name="identifier"
        onChange={handleChange}
        placeholder="Identifier (e.g., click_power_1)"
        value={form.identifier}
      />
      <input
        className="rounded border p-2"
        name="title"
        onChange={handleChange}
        placeholder="Title (e.g., Stronger Clicks)"
        value={form.title}
      />
      <textarea
        className="rounded border p-2"
        name="description"
        onChange={handleChange}
        placeholder="Description"
        value={form.description}
      />
      <input
        className="rounded border p-2"
        name="level"
        onChange={handleChange}
        placeholder="Level"
        type="number"
        value={form.level}
      />
      <input
        className="rounded border p-2"
        name="cost"
        onChange={handleChange}
        placeholder="Cost (e.g., 100 for $100)"
        type="number"
        value={form.cost}
      />
      <input
        className="rounded border p-2"
        name="passive_income_bonus"
        onChange={handleChange}
        placeholder="Passive Bonus (e.g., 100 for +$0.10/s)"
        type="number"
        value={form.passive_income_bonus}
      />
      <input
        className="rounded border p-2"
        name="click_power_bonus"
        onChange={handleChange}
        placeholder="Click Bonus (e.g., 100 for +$0.10/click)"
        type="number"
        value={form.click_power_bonus}
      />
      <input
        className="rounded border p-2"
        name="click_timer_bonus"
        onChange={handleChange}
        placeholder="Click Cooldown Reduction (in µs)"
        type="number"
        value={form.click_timer_bonus}
      />

      <button
        className="btn btn-primary rounded px-4 py-2"
        onClick={handleSubmit}
        type="submit"
      >
        Submit
      </button>

      {status && <p className="text-gray-700 text-sm">{status}</p>}
    </div>
  );
}

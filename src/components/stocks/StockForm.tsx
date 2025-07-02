import { type ChangeEvent, useState } from 'react';
import { useSpacetime } from '~/spacetimedb/useSpacetimeConnection';

export default function StockForm() {
  const { conn } = useSpacetime();

  const [form, setForm] = useState({
    name: '',
    description: '',
    initial_price: 0n,
    total_shares: 0n,
    volatility: 0n,
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const newForm = { ...prev };

      switch (name) {
        case 'initial_price':
        case 'total_shares':
        case 'volatility':
          newForm[name] = BigInt(value || '0');
          break;
        default:
          newForm[name] = value;
          break;
      }
      return newForm;
    });
  };

  const handleSubmit = () => {
    if (!conn) {
      setStatus('❌ Connection not available.');
      return;
    }

    if (!(form.name && form.description)) {
      setStatus('❌ Name and description are required.');
      return;
    }

    conn.reducers.createStock(
      form.name,
      form.description,
      form.initial_price,
      form.total_shares,
      form.volatility
    );

    setStatus(`✅ Stock "${form.name}" submitted for creation!`);
    setForm({
      name: '',
      description: '',
      initial_price: 0n,
      total_shares: 0n,
      volatility: 0n,
    });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-2 rounded border p-4 shadow">
      <h2 className="font-bold text-xl">Add New Stock</h2>

      <input
        className="rounded border p-2"
        name="name"
        onChange={handleChange}
        placeholder="Stock Name (e.g., 'Stonks Inc.')"
        value={form.name}
      />
      <textarea
        className="rounded border p-2"
        name="description"
        onChange={handleChange}
        placeholder="Stock Description"
        value={form.description}
      />
      <input
        className="rounded border p-2"
        name="initial_price"
        onChange={handleChange}
        placeholder="Initial Price Per Share"
        type="number"
        value={form.initial_price.toString()}
      />
      <input
        className="rounded border p-2"
        name="total_shares"
        onChange={handleChange}
        placeholder="Total Shares"
        type="number"
        value={form.total_shares.toString()}
      />
      <input
        className="rounded border p-2"
        name="volatility"
        onChange={handleChange}
        placeholder="Volatility"
        type="number"
        value={form.volatility.toString()}
      />
      <button
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        disabled={!(conn && form.name)}
        onClick={handleSubmit}
        type="submit"
      >
        Submit
      </button>

      {status && <p className="mt-2 text-gray-700 text-sm">{status}</p>}
    </div>
  );
}

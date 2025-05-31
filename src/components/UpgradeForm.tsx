import { useState } from "react";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";

export default function UpgradeForm() {
   const { conn } = useSpacetime();
   const [form, setForm] = useState({
      identifier: "",
      title: "",
      description: "",
      level: 1,
      cost: 0,
      passive_income_bonus: "",
      click_power_bonus: "",
      click_timer_bonus: "",
      auto_click_rate: "",
   });

   const [status, setStatus] = useState<string | null>(null);

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = async () => {
      conn?.reducers.addUpgrade(
         form.identifier,
         form.title,
         form.description,
         parseInt(form.level.toString(), 10),
         BigInt(form.cost),
         form.passive_income_bonus
            ? BigInt(form.passive_income_bonus)
            : undefined,
         form.click_power_bonus ? BigInt(form.click_power_bonus) : undefined,
         form.click_timer_bonus ? BigInt(form.click_timer_bonus) : undefined,
         form.auto_click_rate ? BigInt(form.auto_click_rate) : undefined
      );

      setStatus("✅ Upgrade added successfully!");
      setForm({
         identifier: "",
         title: "",
         description: "",
         level: 1,
         cost: 0,
         passive_income_bonus: "",
         click_power_bonus: "",
         click_timer_bonus: "",
         auto_click_rate: "",
      });
   };

   return (
      <div className="p-4 border rounded max-w-md mx-auto flex flex-col gap-2">
         <h2 className="text-xl font-bold">Add New Upgrade</h2>

         <input
            name="identifier"
            placeholder="Identifier (e.g., click_power)"
            value={form.identifier}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <input
            name="title"
            placeholder="Title (e.g., Stronger Clicks)"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <input
            name="level"
            type="number"
            placeholder="Level"
            value={form.level}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <input
            name="cost"
            type="number"
            placeholder="Cost (u128)"
            value={form.cost}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <input
            name="passive_income_bonus"
            type="number"
            placeholder="Passive Income Bonus (optional)"
            value={form.passive_income_bonus}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <input
            name="click_power_bonus"
            type="number"
            placeholder="Click Power Bonus (optional)"
            value={form.click_power_bonus}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <input
            name="click_timer_bonus"
            type="number"
            placeholder="Click Timer Bonus (optional)"
            value={form.click_timer_bonus}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <input
            name="auto_click_rate"
            type="number"
            placeholder="Auto Click Rate (optional)"
            value={form.auto_click_rate}
            onChange={handleChange}
            className="border p-2 rounded"
         />

         <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
         >
            Submit
         </button>

         {status && <p className="text-sm text-gray-700">{status}</p>}
      </div>
   );
}

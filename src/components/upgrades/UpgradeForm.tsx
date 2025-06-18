import { useState, ChangeEvent } from "react";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";

export default function UpgradeForm() {
   const { conn } = useSpacetime();

   const [form, setForm] = useState({
      identifier: "",
      title: "",
      description: "",
      level: "",
      cost: "",
      passive_income_bonus: "",
      click_power_bonus: "",
      click_timer_bonus: "",
   });

   const [status, setStatus] = useState<string | null>(null);

   const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = async () => {
      if (!conn) return;

      const level = parseInt(form.level || "1", 10);
      const cost = BigInt(form.cost || "0");

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

      setStatus("✅ Upgrade added successfully!");
      setForm({
         identifier: "",
         title: "",
         description: "",
         level: "",
         cost: "",
         passive_income_bonus: "",
         click_power_bonus: "",
         click_timer_bonus: "",
      });
   };

   return (
      <div className="p-4 border rounded max-w-md mx-auto flex flex-col gap-2">
         <h2 className="text-xl font-bold">Add New Upgrade</h2>

         <input
            name="identifier"
            placeholder="Identifier (e.g., click_power_1)"
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
            placeholder="Cost (e.g., 100 for $100)"
            value={form.cost}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <input
            name="passive_income_bonus"
            type="number"
            placeholder="Passive Bonus (e.g., 100 for +$0.10/s)"
            value={form.passive_income_bonus}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <input
            name="click_power_bonus"
            type="number"
            placeholder="Click Bonus (e.g., 100 for +$0.10/click)"
            value={form.click_power_bonus}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <input
            name="click_timer_bonus"
            type="number"
            placeholder="Click Cooldown Reduction (in µs)"
            value={form.click_timer_bonus}
            onChange={handleChange}
            className="border p-2 rounded"
         />

         <button
            onClick={handleSubmit}
            className="btn btn-primary px-4 py-2 rounded"
         >
            Submit
         </button>

         {status && <p className="text-sm text-gray-700">{status}</p>}
      </div>
   );
}

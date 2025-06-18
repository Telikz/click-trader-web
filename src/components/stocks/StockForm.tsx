import { ChangeEvent, useState } from "react";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";

export default function StockForm() {
   const { conn } = useSpacetime();

   const [form, setForm] = useState({
      name: "",
      description: "",
      initial_price: 0n,
      total_shares: 0n,
      volatility: 5,
   });

   const [status, setStatus] = useState<string | null>(null);

   const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const { name, value } = e.target;

      setForm((prev) => {
         const newForm = { ...prev };

         switch (name) {
            case "initial_price":
            case "total_shares":
               // This prevents a crash from `BigInt("")` and handles empty inputs gracefully.
               newForm[name] = BigInt(value || "0");
               break;
            case "volatility":
               // Explicitly convert to a number.
               newForm[name] = Number(value);
               break;
            default:
               // ✅ FIX: This default case handles the `name` and `description` fields.
               // It was missing before, causing those fields not to update.
               (newForm as any)[name] = value;
               break;
         }
         return newForm;
      });
   };

   const handleSubmit = async () => {
      if (!conn) {
         setStatus("❌ Connection not available.");
         return;
      }

      if (!form.name || !form.description) {
         setStatus("❌ Name and description are required.");
         return;
      }

      // SpacetimeDB reducers are fire-and-forget. We perform an "optimistic update"
      // by immediately showing a success message.
      conn.reducers.createStock(
         form.name,
         form.description,
         form.initial_price,
         form.total_shares,
         form.volatility
      );

      // Optimistically update UI
      setStatus(`✅ Stock "${form.name}" submitted for creation!`);
      setForm({
         name: "",
         description: "",
         initial_price: 0n,
         total_shares: 0n,
         volatility: 5,
      });
   };

   return (
      <div className="p-4 border rounded max-w-md mx-auto flex flex-col gap-2 shadow">
         <h2 className="text-xl font-bold">Add New Stock</h2>

         <input
            name="name"
            placeholder="Stock Name (e.g., 'Stonks Inc.')"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <textarea
            name="description"
            placeholder="Stock Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <input
            name="initial_price"
            type="number"
            placeholder="Initial Price Per Share"
            value={form.initial_price.toString()}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <input
            name="total_shares"
            type="number"
            placeholder="Total Shares"
            value={form.total_shares.toString()}
            onChange={handleChange}
            className="border p-2 rounded"
         />
         <label className="text-sm text-gray-600">
            Volatility (Current: {form.volatility})
            <input
               name="volatility"
               type="range"
               min="1"
               max="100"
               value={form.volatility}
               onChange={handleChange}
               className="w-full"
            />
         </label>
         <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={!conn || !form.name}
         >
            Submit
         </button>

         {status && <p className="text-sm text-gray-700 mt-2">{status}</p>}
      </div>
   );
}

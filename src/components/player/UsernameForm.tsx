import { useState } from "react";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";

export default function UsernameForm() {
   const { conn } = useSpacetime();
   const [usernameInput, setUsernameInput] = useState("");

   if (!conn) return null;

   const handleUsernameSubmit = () => {
      if (usernameInput.trim() !== "") {
         conn.reducers.setName(usernameInput.trim());
         setUsernameInput("");
      }
   };

   return (
      <div className="flex gap-2 items-center">
         <input
            type="text"
            className="input border-primary"
            placeholder="Enter username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
         />
         <button className="btn btn-primary" onClick={handleUsernameSubmit}>
            Set
         </button>
      </div>
   );
}

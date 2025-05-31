import { createFileRoute } from "@tanstack/react-router";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";
import { usePlayerStore } from "~/stores/usePlayerStore";
import CanvasButton from "~/components/CanvasButton";
import { formatBitInt } from "~/utils/formatBigInt";
import { useState } from "react";

export const Route = createFileRoute("/")({
   component: Home,
});

function Home() {
   const { conn, connected, identity } = useSpacetime();
   const currentPlayer = usePlayerStore((s) => s.currentPlayer);

   const [usernameInput, setUsernameInput] = useState("");

   if (!connected || !conn || !identity || !currentPlayer)
      return <h3>Connecting...</h3>;

   const handleUsernameSubmit = () => {
      if (usernameInput.trim() !== "") {
         conn.reducers.setName(usernameInput.trim());
         setUsernameInput("");
      }
   };

   return (
      <div className="p-2 justify-center items-center flex flex-col gap-2">
         <div className="flex gap-2 items-center">
            <input
               type="text"
               className="border border-gray-300 rounded px-2 py-1"
               placeholder="Enter username"
               value={usernameInput}
               onChange={(e) => setUsernameInput(e.target.value)}
            />
            <button
               className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
               onClick={handleUsernameSubmit}
            >
               Set
            </button>
         </div>
         <h1 className={"text-5xl"}>Hello, {currentPlayer.username}</h1>
         <h1 className={"text-5xl"}>{formatBitInt(currentPlayer.money)}</h1>
         <CanvasButton
            text="Click!"
            size={500}
            timeLimitMs={1000}
            clicksRequired={5}
            onClick={() => conn.reducers.increaseMoney()}
         />
      </div>
   );
}

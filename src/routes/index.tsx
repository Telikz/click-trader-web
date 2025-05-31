import { createFileRoute } from "@tanstack/react-router";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";
import { usePlayerStore } from "~/stores/usePlayerStore";
import CanvasButton from "~/components/CanvasButton";
import { formatBitInt } from "~/utils/formatBigInt";
import UsernameForm from "~/components/UsernameForm";
import UpgradeForm from "~/components/UpgradeForm";
import { useLockedUpgrades } from "~/stores/useUpgradeStore";

export const Route = createFileRoute("/")({
   component: Home,
});

function Home() {
   const { conn, connected, identity } = useSpacetime();
   const currentPlayer = usePlayerStore((s) => s.currentPlayer);
   const upgrades = useLockedUpgrades();

   if (!connected || !conn || !identity || !currentPlayer)
      return <h3>Connecting...</h3>;

   return (
      <div className="p-2 justify-center items-center flex flex-col gap-2">
         <UsernameForm />
         <h1 className={"text-5xl"}>Hello, {currentPlayer.username}</h1>
         <h1 className={"text-5xl"}>{formatBitInt(currentPlayer.money)}</h1>
         <CanvasButton
            text="Click!"
            size={350}
            timeLimitMs={Number(currentPlayer.clickTimer) / 1000}
            clicksRequired={5}
            onClick={() => conn.reducers.increaseMoney()}
         />
         <ul>
            {upgrades.map((upgrade) => (
               <li key={upgrade.id}>
                  {upgrade.title} – Cost: {upgrade.cost}
                  <button
                     className={"btn"}
                     onClick={() => conn.reducers.buyUpgrade(upgrade.id)}
                  >
                     Buy
                  </button>
               </li>
            ))}
         </ul>
         <UpgradeForm />
      </div>
   );
}

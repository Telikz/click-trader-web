import { formatBitInt } from "~/utils/formatBigInt";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { Upgrades } from "../../module_bindings";

export default function UpgradesList({ upgrades }: { upgrades: Upgrades[] }) {
   const { conn } = useSpacetime();
   const currentPlayer = usePlayerStore((s) => s.currentPlayer);

   if (!conn || !currentPlayer) return null;

   return (
      <div className="flex-1 bg-base-100 rounded-lg shadow-lg p-6 overflow-y-auto">
         <h3 className="text-3xl font-semibold mb-6 text-primary text-center">
            Available Upgrades
         </h3>
         {upgrades.length > 0 ? (
            <ul className="space-y-4">
               {upgrades.map((upgrade) => (
                  <li
                     key={upgrade.id}
                     className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-base-200 p-3 rounded-md shadow-sm"
                  >
                     <div>
                        <p className="text-lg font-medium text-primary">
                           {upgrade.title}
                        </p>
                        <p className="text-sm text-info">
                           Cost:{" "}
                           <span className="font-bold text-primary">
                              {formatBitInt(upgrade.cost)}
                           </span>
                        </p>
                        <p className="text-sm text-info">
                           {upgrade.description}
                        </p>
                     </div>
                     <button
                        className="btn btn-primary mt-3 sm:mt-0 px-4 py-2 font-bold duration-200 disabled:cursor-not-allowed"
                        onClick={() => conn.reducers.buyUpgrade(upgrade.id)}
                        disabled={currentPlayer.money < upgrade.cost}
                     >
                        {currentPlayer.money < upgrade.cost
                           ? "Can't Afford"
                           : "Buy Upgrade"}
                     </button>
                  </li>
               ))}
            </ul>
         ) : (
            <p className="text-primary/50 text-center">
               No new upgrades available right now!
            </p>
         )}
      </div>
   );
}

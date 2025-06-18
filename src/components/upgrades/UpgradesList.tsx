import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { Upgrades } from "../../../module_bindings";
import { formatBigInt } from "~/utils/formatBigInt";

export default function UpgradesList({ upgrades }: { upgrades: Upgrades[] }) {
   const { conn } = useSpacetime();
   const currentPlayer = usePlayerStore((s) => s.currentPlayer);

   if (!conn || !currentPlayer) return null;

   const PRICE_SCALE_FACTOR = 1000n;

   const availableUpgrades = upgrades.filter(
      (upgrade) => !currentPlayer.upgrades.includes(upgrade.id)
   );

   return (
      <div className="flex-2 bg-base-100 rounded-lg shadow-lg p-4 flex-col items-center justify-center">
         <h3 className="text-3xl font-semibold mb-6 text-primary text-center">
            Available Upgrades
         </h3>
         {availableUpgrades.length > 0 ? (
            <ul className="space-y-4 overflow-auto h-96">
               {availableUpgrades.map((upgrade) => {
                  const scaledCost = upgrade.cost * PRICE_SCALE_FACTOR;

                  return (
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
                                 {formatBigInt(scaledCost)}
                              </span>
                           </p>
                           <p className="text-sm text-info">
                              <span className="font-bold text-primary">
                                 Passive Increase:{" "}
                                 {formatBigInt(
                                    upgrade.passiveIncomeBonus || 0n
                                 )}
                              </span>
                           </p>
                           <p className="text-sm text-info">
                              <span className="font-bold text-primary">
                                 Click power Increase:{" "}
                                 {formatBigInt(upgrade.clickPowerBonus || 0n)}
                              </span>
                           </p>
                           <p className="text-sm text-info">
                              {upgrade.description}
                           </p>
                        </div>
                        <button
                           className="btn btn-primary mt-3 sm:mt-0 px-4 py-2 font-bold duration-200 disabled:cursor-not-allowed"
                           onClick={() => conn.reducers.buyUpgrade(upgrade.id)}
                           disabled={currentPlayer.money < scaledCost}
                        >
                           {currentPlayer.money < scaledCost
                              ? "Can't Afford"
                              : "Buy Upgrade"}
                        </button>
                     </li>
                  );
               })}
            </ul>
         ) : (
            <p className="text-primary/50 text-center">
               No new upgrades available right now!
            </p>
         )}
      </div>
   );
}

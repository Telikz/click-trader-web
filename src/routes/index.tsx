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

   if (!connected || !conn || !identity || !currentPlayer) {
      return (
         <div className="flex justify-center items-center h-screen bg-gray-900 text-gray-200">
            <h3 className="text-2xl animate-pulse">
               Connecting to Spacetime...
            </h3>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-4 font-sans flex flex-col items-center">
         <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
               <h1 className="text-4xl font-bold text-yellow-400">
                  Welcome, {currentPlayer.username}!
               </h1>
               <UsernameForm />
            </div>
            <div className="text-center sm:text-right">
               <p className="text-lg text-gray-400">Your Current Balance:</p>
               <h2 className="text-5xl font-extrabold text-green-500">
                  {formatBitInt(currentPlayer.money)}
               </h2>
            </div>
         </div>

         <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center min-h-[300px]">
               <h3 className="text-3xl font-semibold mb-6 text-blue-400">
                  Click to Earn!
               </h3>
               <CanvasButton
                  text="Click!"
                  size={300}
                  timeLimitMs={Number(currentPlayer.clickTimer) / 1000}
                  clicksRequired={5}
                  onClick={() => conn.reducers.increaseMoney()}
               />
            </div>

            <div className="flex-1 bg-gray-800 rounded-lg shadow-lg p-6">
               <h3 className="text-3xl font-semibold mb-6 text-purple-400">
                  Available Upgrades
               </h3>
               {upgrades.length > 0 ? (
                  <ul className="space-y-4">
                     {upgrades.map((upgrade) => (
                        <li
                           key={upgrade.id}
                           className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-700 p-3 rounded-md shadow-sm"
                        >
                           <div>
                              <p className="text-lg font-medium text-gray-50">
                                 {upgrade.title}
                              </p>
                              <p className="text-sm text-gray-300">
                                 Cost:{" "}
                                 <span className="font-bold text-green-300">
                                    {formatBitInt(upgrade.cost)}
                                 </span>
                              </p>
                              <p className="text-sm text-gray-300">
                                 {upgrade.description}
                              </p>
                           </div>
                           <button
                              className="mt-3 sm:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                              onClick={() =>
                                 conn.reducers.buyUpgrade(upgrade.id)
                              }
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
                  <p className="text-gray-400 text-center">
                     No new upgrades available right now!
                  </p>
               )}
               <div className="mt-6">
                  <h4 className="text-2xl font-semibold mb-4 text-orange-400">
                     Manage Upgrades
                  </h4>
                  <UpgradeForm />
               </div>
            </div>
         </div>
      </div>
   );
}

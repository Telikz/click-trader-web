import { usePlayerStore } from "~/stores/usePlayerStore";
import { formatBigInt } from "~/utils/formatBigInt";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";
import { Link } from "@tanstack/react-router";

export function Leaderboards() {
   const { identity } = useSpacetime();

   const players = Array.from(usePlayerStore((s) => s.players).values()).sort(
      (a, b) => Number(b.money - a.money)
   );

   return (
      <div className="flex-1 bg-base-100 rounded-2xl shadow-xl p-6 flex flex-col items-center h-96">
         <h3 className="text-3xl font-bold mb-6 text-primary text-center">
            <Link to="/leaderboards">Leaderboards</Link>
         </h3>

         {players.length > 0 ? (
            <ul className="space-y-3 w-full max-w-lg overflow-y-auto">
               {players.map((player, index) => {
                  const isCurrentUser =
                     identity?.toHexString() === player.identity.toHexString();

                  return (
                     <li
                        key={player.identity.toHexString()}
                        className={`flex justify-between px-4 py-2 rounded-lg ${
                           isCurrentUser
                              ? "bg-primary/10 text-primary font-semibold"
                              : "bg-base-200"
                        }`}
                     >
                        <span>
                           {index + 1}. {player.username || "Unknown"}
                        </span>
                        <span>{formatBigInt(player.money)}</span>
                     </li>
                  );
               })}
            </ul>
         ) : (
            <p className="text-primary/50 text-center">No players found.</p>
         )}
      </div>
   );
}

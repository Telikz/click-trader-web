import { usePlayerStore } from "~/stores/usePlayerStore";
import { formatBitInt } from "~/utils/formatBigInt";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";

export function Leaderboards() {
   const { identity } = useSpacetime();
   const players = Array.from(usePlayerStore((s) => s.players).values()).sort(
      (a, b) => Number(b.money - a.money)
   );

   return (
      <div className="w-full bg-base-100 rounded-lg shadow-lg p-4 mb-6 flex flex-col justify-between items-center">
         <h3 className="text-3xl font-semibold mb-6 text-primary text-center">
            Leaderboards
         </h3>
         {players.length > 0 ? (
            <ul className="space-y-4">
               {players.map((value) =>
                  identity?.toHexString() !== value.identity.toHexString() ? (
                     <li key={value?.identity.toHexString()}>
                        {value?.username || "Unknown"} :{" "}
                        {formatBitInt(value.money)}
                     </li>
                  ) : (
                     <li
                        className={"font-bold text-primary"}
                        key={value?.identity.toHexString()}
                     >
                        {value?.username || "Unknown"} :{" "}
                        {formatBitInt(value.money)}
                     </li>
                  )
               )}
            </ul>
         ) : (
            <p className="text-primary/50 text-center">No players found.</p>
         )}
      </div>
   );
}

import { formatBigInt } from "~/utils/formatBigInt";
import { usePlayerStore } from "~/stores/usePlayerStore";

export default function BalanceCard() {
   const currentPlayer = usePlayerStore((s) => s.currentPlayer);

   if (!currentPlayer) return null;

   return (
      <div className="w-full bg-base-100 rounded-lg shadow-lg p-4 flex flex-col justify-between items-center">
         <div className="text-center">
            <p className="text-lg font-bold text-primary">
               Your Current Balance:
            </p>
            <h2 className="text-5xl font-extrabold text-primary">
               {formatBigInt(currentPlayer.money)}
            </h2>
         </div>
      </div>
   );
}

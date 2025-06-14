import UsernameForm from "~/components/UsernameForm";
import { formatBitInt } from "~/utils/formatBigInt";
import { usePlayerStore } from "~/stores/usePlayerStore";

export default function PlayerHeader() {
   const currentPlayer = usePlayerStore((s) => s.currentPlayer);

   if (!currentPlayer) return null;

   return (
      <div className="w-full bg-base-100 rounded-lg shadow-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-center">
         <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold text-primary p-1">
               Welcome, {currentPlayer.username}!
            </h1>
            <UsernameForm />
         </div>
         <div className="text-center sm:text-right">
            <p className="text-lg font-bold text-primary">
               Your Current Balance:
            </p>
            <h2 className="text-5xl font-extrabold text-primary">
               {formatBitInt(currentPlayer.money)}
            </h2>
         </div>
      </div>
   );
}

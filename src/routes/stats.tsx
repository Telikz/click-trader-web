import { createFileRoute } from "@tanstack/react-router";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { formatBigInt } from "~/utils/formatBigInt";
import UsernameForm from "~/components/player/UsernameForm";

export const Route = createFileRoute("/stats")({
   component: RouteComponent,
});

function RouteComponent() {
   const currentPlayer = usePlayerStore((s) => s.currentPlayer);

   if (!currentPlayer) return null;

   return (
      <div>
         <h3>Current Balance: {formatBigInt(currentPlayer.money)}</h3>
         <h3>
            Current Click Power: {formatBigInt(currentPlayer.clickPower)}{" "}
            pr/click
         </h3>
         <h3>
            Current Passive Income: {formatBigInt(currentPlayer.passiveIncome)}{" "}
            pr/sec
         </h3>
         <UsernameForm />
      </div>
   );
}

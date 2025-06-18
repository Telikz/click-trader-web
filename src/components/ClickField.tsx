import CanvasButton from "~/components/CanvasButton";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";
import { usePlayerStore } from "~/stores/usePlayerStore";

export default function ClickField() {
   const { conn } = useSpacetime();
   const currentPlayer = usePlayerStore((s) => s.currentPlayer);

   if (!conn || !currentPlayer) return null;

   return (
      <div className="flex-1 bg-base-100 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
         <h3 className="text-3xl font-semibold mb-3 text-primary">
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
   );
}

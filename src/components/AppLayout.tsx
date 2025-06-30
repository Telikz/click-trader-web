import { useSpacetimeConnection } from "~/spacetimedb/useSpacetimeConnection";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";
import SpacetimeLoading from "./SpacetimeLoading";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { ReactNode } from "react";
import { usePlayerSync } from "~/spacetimedb/usePlayerSync";
import { useUpgradeSync } from "~/spacetimedb/useUpgradeSync";
import { useStockSync } from "~/spacetimedb/useStockSync";

export const AppLayout = ({ children }: { children: ReactNode }) => {
   useSpacetimeConnection();
   usePlayerSync();
   useUpgradeSync();
   useStockSync();

   const { connected, identity } = useSpacetime();
   const currentPlayer = usePlayerStore((s) => s.currentPlayer);

   if (!connected || !identity || !currentPlayer) {
      return <SpacetimeLoading />;
   }

   return <>{children}</>;
};

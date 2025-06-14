import { createFileRoute } from "@tanstack/react-router";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";
import { usePlayerStore } from "~/stores/usePlayerStore";
import SpacetimeLoading from "~/components/SpacetimeLoading";
import ClickField from "~/components/ClickField";
import UpgradesList from "~/components/UpgradesList";
import PlayerHeader from "~/components/PlayerHeader";
import { Leaderboards } from "~/components/Leaderboards";
import { useLockedUpgrades } from "~/stores/useUpgradeStore";

export const Route = createFileRoute("/")({
   component: Home,
});

function Home() {
   const { conn, connected, identity } = useSpacetime();
   const currentPlayer = usePlayerStore((s) => s.currentPlayer);
   const upgrades = useLockedUpgrades();

   if (!connected || !conn || !identity || !currentPlayer) {
      return <SpacetimeLoading />;
   }

   return (
      <div className="min-h-screen bg-base-200 p-4 flex flex-col items-center">
         <PlayerHeader />
         <div className="w-full flex flex-col lg:flex-row gap-6">
            <ClickField />
            <UpgradesList upgrades={upgrades} />
         </div>
         <div className="w-full pt-6">
            <Leaderboards />
         </div>
      </div>
   );
}

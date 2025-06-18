import { createFileRoute } from "@tanstack/react-router";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";
import { usePlayerStore } from "~/stores/usePlayerStore";
import SpacetimeLoading from "~/components/SpacetimeLoading";
import ClickField from "~/components/ClickField";
import UpgradesList from "~/components/upgrades/UpgradesList";
import PlayerHeader from "~/components/player/PlayerHeader";
import { Leaderboards } from "~/components/Leaderboards";
import { useLockedUpgrades } from "~/stores/useUpgradeStore";
import BalanceCard from "~/components/player/BalanceCard";
import NavBar from "~/components/NavBar";
import PortfolioCard from "~/components/player/PortfolioCard";

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
      <div className="min-h-screen bg-base-200 p-4 flex flex-col items-center gap-6">
         <BalanceCard />
         <div className="w-full flex flex-col lg:flex-row gap-6">
            <ClickField />
            <UpgradesList upgrades={upgrades} />
         </div>
         <div className="w-full flex flex-col lg:flex-row gap-6">
            <PortfolioCard />
            <Leaderboards />
         </div>
      </div>
   );
}

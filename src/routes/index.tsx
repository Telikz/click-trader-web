import { createFileRoute } from "@tanstack/react-router";
import { SignedIn, SignedOut } from "@clerk/tanstack-react-start";
import { AppLayout } from "~/components/AppLayout";
import ClickField from "~/components/ClickField";
import UpgradesList from "~/components/upgrades/UpgradesList";
import { Leaderboards } from "~/components/Leaderboards";
import { useLockedUpgrades } from "~/stores/useUpgradeStore";
import BalanceCard from "~/components/player/BalanceCard";
import PortfolioCard from "~/components/player/PortfolioCard";
import { LandingPage } from "~/components/LandingPage";

export const Route = createFileRoute("/")({
   component: Home,
});

function Home() {
   const upgrades = useLockedUpgrades();

   return (
      <>
         <SignedIn>
            <AppLayout>
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
            </AppLayout>
         </SignedIn>
         <SignedOut>
            <LandingPage />
         </SignedOut>
      </>
   );
}

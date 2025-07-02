import { SignedIn, SignedOut } from '@clerk/tanstack-react-start';
import { createFileRoute } from '@tanstack/react-router';
import ClickField from '~/components/ClickField';
import { LandingPage } from '~/components/LandingPage';
import { Leaderboards } from '~/components/Leaderboards';
import BalanceCard from '~/components/player/BalanceCard';
import PortfolioCard from '~/components/player/PortfolioCard';
import UpgradesList from '~/components/upgrades/UpgradesList';
import { useLockedUpgrades } from '~/stores/useUpgradeStore';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const upgrades = useLockedUpgrades();

  return (
    <>
      <SignedIn>
        <div className="flex min-h-screen flex-col items-center gap-6 bg-base-200 px-4 pb-4">
          <BalanceCard />
          <div className="flex w-full flex-col gap-6 lg:flex-row">
            <ClickField />
            <UpgradesList upgrades={upgrades} />
          </div>
          <div className="flex w-full flex-col gap-6 lg:flex-row">
            <PortfolioCard />
            <Leaderboards />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <LandingPage />
      </SignedOut>
    </>
  );
}

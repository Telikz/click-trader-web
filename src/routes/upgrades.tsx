import { createFileRoute } from '@tanstack/react-router';
import UpgradeForm from '~/components/upgrades/UpgradeForm';
import UpgradesList from '~/components/upgrades/UpgradesList';
import { useUpgrades } from '~/stores/useUpgradeStore';

export const Route = createFileRoute('/upgrades')({
  component: RouteComponent,
});

function RouteComponent() {
  const upgrades = Array.from(useUpgrades().upgrades.values());

  return (
    <div className="flex min-h-screen flex-col items-center bg-base-200 p-4">
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        <div className="lg:w-2/5">
          <UpgradeForm />
        </div>
        <UpgradesList upgrades={upgrades} />
      </div>
    </div>
  );
}

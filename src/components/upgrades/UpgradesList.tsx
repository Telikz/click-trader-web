import { Link } from '@tanstack/react-router';
import { useSpacetime } from '~/spacetimedb/useSpacetimeConnection';
import { usePlayerStore } from '~/stores/usePlayerStore';
import { formatBigInt } from '~/utils/formatBigInt';
import type { Upgrades } from '../../../module_bindings';

export default function UpgradesList({ upgrades }: { upgrades: Upgrades[] }) {
  const { conn } = useSpacetime();
  const currentPlayer = usePlayerStore((s) => s.currentPlayer);

  if (!(conn && currentPlayer)) {
    return null;
  }

  const PRICE_SCALE_FACTOR = 1000n;

  const availableUpgrades = upgrades.filter(
    (upgrade) => !currentPlayer.upgrades.includes(upgrade.id)
  );

  return (
    <div className="flex-2 flex-col items-center justify-center rounded-lg bg-base-100 p-4 shadow-lg">
      <h3 className="mb-6 text-center font-semibold text-3xl text-primary">
        <Link to="/upgrades">Available Upgrades</Link>
      </h3>
      {availableUpgrades.length > 0 ? (
        <ul className="h-96 space-y-4 overflow-auto">
          {availableUpgrades.map((upgrade) => {
            const scaledCost = upgrade.cost * PRICE_SCALE_FACTOR;

            return (
              <li
                className="flex flex-col items-start justify-between rounded-md bg-base-200 p-3 shadow-sm sm:flex-row sm:items-center"
                key={upgrade.id}
              >
                <div>
                  <p className="font-medium text-lg text-primary">
                    {upgrade.title}
                  </p>
                  <p className="text-info text-sm">
                    Cost:{' '}
                    <span className="font-bold text-primary">
                      {formatBigInt(scaledCost)}
                    </span>
                  </p>
                  <p className="text-info text-sm">
                    <span className="font-bold text-primary">
                      Passive Increase:{' '}
                      {formatBigInt(upgrade.passiveIncomeBonus || 0n)}
                    </span>
                  </p>
                  <p className="text-info text-sm">
                    <span className="font-bold text-primary">
                      Click power Increase:{' '}
                      {formatBigInt(upgrade.clickPowerBonus || 0n)}
                    </span>
                  </p>
                  <p className="text-info text-sm">{upgrade.description}</p>
                </div>
                <button
                  className="btn btn-primary mt-3 px-4 py-2 font-bold duration-200 disabled:cursor-not-allowed sm:mt-0"
                  disabled={currentPlayer.money < scaledCost}
                  onClick={() => conn.reducers.buyUpgrade(upgrade.id)}
                  type="submit"
                >
                  {currentPlayer.money < scaledCost
                    ? "Can't Afford"
                    : 'Buy Upgrade'}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-primary/50">
          No new upgrades available right now!
        </p>
      )}
    </div>
  );
}

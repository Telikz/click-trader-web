import { Link } from '@tanstack/react-router';
import { useSpacetime } from '~/spacetimedb/useSpacetimeConnection';
import { usePlayerStore } from '~/stores/usePlayerStore';
import { formatBigInt } from '~/utils/formatBigInt';

export function Leaderboards() {
  const { identity } = useSpacetime();

  const players = Array.from(usePlayerStore((s) => s.players).values()).sort(
    (a, b) => Number(b.money - a.money)
  );

  return (
    <div className="flex h-96 flex-1 flex-col items-center rounded-2xl bg-base-100 p-6 shadow-xl">
      <h3 className="mb-6 text-center font-bold text-3xl text-primary">
        <Link to="/leaderboards">Leaderboards</Link>
      </h3>

      {players.length > 0 ? (
        <ul className="w-full max-w-lg space-y-3 overflow-y-auto">
          {players.map((player, index) => {
            const isCurrentUser =
              identity?.toHexString() === player.identity.toHexString();

            return (
              <li
                className={`flex justify-between rounded-lg px-4 py-2 ${
                  isCurrentUser
                    ? 'bg-primary/10 font-semibold text-primary'
                    : 'bg-base-200'
                }`}
                key={player.identity.toHexString()}
              >
                <span>
                  {index + 1}. {player.username || 'Unknown'}
                </span>
                <span>{formatBigInt(player.money)}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-primary/50">No players found.</p>
      )}
    </div>
  );
}

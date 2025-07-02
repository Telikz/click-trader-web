import { usePlayerStore } from '~/stores/usePlayerStore';
import { formatBigInt } from '~/utils/formatBigInt';

export default function BalanceCard() {
  const currentPlayer = usePlayerStore((s) => s.currentPlayer);

  if (!currentPlayer) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center justify-between rounded-lg bg-base-100 p-4 shadow-lg">
      <div className="text-center">
        <p className="font-bold text-lg text-primary">Your Current Balance:</p>
        <h2 className="font-extrabold text-5xl text-primary">
          {formatBigInt(currentPlayer.money)}
        </h2>
      </div>
    </div>
  );
}

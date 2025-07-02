import UsernameForm from '~/components/player/UsernameForm';
import { usePlayerStore } from '~/stores/usePlayerStore';
import { formatBigInt } from '~/utils/formatBigInt';

export default function PlayerHeader() {
  const currentPlayer = usePlayerStore((s) => s.currentPlayer);

  if (!currentPlayer) {
    return null;
  }

  return (
    <div className="mb-6 flex w-full flex-col items-center justify-between rounded-lg bg-base-100 p-4 shadow-lg sm:flex-row">
      <div className="text-center sm:text-left">
        <h1 className="p-1 font-bold text-4xl text-primary">
          Welcome, {currentPlayer.username}!
        </h1>
        <UsernameForm />
      </div>
      <div className="text-center sm:text-right">
        <p className="font-bold text-lg text-primary">Your Current Balance:</p>
        <h2 className="font-extrabold text-5xl text-primary">
          {formatBigInt(currentPlayer.money)}
        </h2>
      </div>
    </div>
  );
}

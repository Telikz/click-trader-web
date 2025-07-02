import { Link } from '@tanstack/react-router';
import CanvasButton from '~/components/CanvasButton';
import { useSpacetime } from '~/spacetimedb/useSpacetimeConnection';
import { usePlayerStore } from '~/stores/usePlayerStore';

export default function ClickField() {
  const { conn } = useSpacetime();
  const currentPlayer = usePlayerStore((s) => s.currentPlayer);

  if (!(conn && currentPlayer)) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-lg bg-base-100 p-4 shadow-lg">
      <h3 className="mb-3 font-semibold text-3xl text-primary">
        <Link to={'/stats'}>Click to Earn!</Link>
      </h3>
      <CanvasButton
        clicksRequired={5}
        onClick={() => conn.reducers.increaseMoney()}
        size={300}
        text="Click!"
        timeLimitMs={Number(currentPlayer.clickTimer) / 1000}
      />
    </div>
  );
}

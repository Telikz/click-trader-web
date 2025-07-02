import { Link } from '@tanstack/react-router';

export default function PortfolioCard() {
  return (
    <div className="flex h-96 flex-1 flex-col items-center rounded-lg bg-base-100 p-4 shadow-lg">
      <h3 className="mb-6 text-center font-semibold text-3xl text-primary">
        <Link to={'/trading'}>Portfolio</Link>
      </h3>
    </div>
  );
}

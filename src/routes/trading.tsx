import { createFileRoute } from '@tanstack/react-router';
import StockForm from '~/components/stocks/StockForm';
import StockList from '~/components/stocks/StockList';
import { useStocks } from '~/stores/useStockStore';

export const Route = createFileRoute('/trading')({
  component: RouteComponent,
});

function RouteComponent() {
  const stocks = Array.from(useStocks().stocks.values());

  return (
    <div className="space-y-4 p-4">
      <StockList stocks={stocks} />
      <StockForm />
    </div>
  );
}

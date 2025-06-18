import { createFileRoute } from "@tanstack/react-router";
import { useStocks } from "~/stores/useStockStore";
import StockForm from "~/components/stocks/StockForm";
import StockList from "~/components/stocks/StockList";

export const Route = createFileRoute("/trading")({
   component: RouteComponent,
});

function RouteComponent() {
   const stocks = Array.from(useStocks().stocks.values());

   return (
      <div className="p-4 space-y-4">
         <StockList stocks={stocks} />
         <StockForm />
      </div>
   );
}

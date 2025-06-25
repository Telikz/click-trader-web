import { formatBigInt } from "~/utils/formatBigInt";
import { useSpacetime } from "~/spacetimedb/useSpacetimeConnection";
import { Stock, TransactionType } from "../../../module_bindings";
import { usePlayerStore } from "~/stores/usePlayerStore";
import { useState } from "react";

export default function StockList({ stocks }: { stocks: Stock[] }) {
   const { conn } = useSpacetime();
   const currentPlayer = usePlayerStore((s) => s.currentPlayer);
   const [amounts, setAmounts] = useState<Record<number, bigint>>({});

   if (!conn || !currentPlayer) return null;

   // Calculate total portfolio value
   const portfolioValue = currentPlayer.stocks.reduce((total, s) => {
      const stock = stocks.find((stk) => stk.id === s.stockId);
      if (!stock) return total;
      return total + stock.pricePerShare * BigInt(s.amount);
   }, 0n);

   return (
      <div className="flex-2 bg-base-100 rounded-lg shadow-lg p-4 flex-col items-center justify-center">
         <h3 className="text-3xl font-semibold mb-6 text-primary text-center">
            Your Portfolio
         </h3>
         <p className="text-center mb-4 text-info">
            Total Portfolio Value:{" "}
            <span className="font-bold text-primary">
               {formatBigInt(portfolioValue)}
            </span>
         </p>

         {stocks.length > 0 ? (
            <ul className="space-y-4 overflow-auto h-[36rem]">
               {stocks.map((stock) => {
                  const playerStock = currentPlayer.stocks.find(
                     (s) => s.stockId === stock.id
                  );

                  const hasStock = playerStock && playerStock.amount > 0;
                  const inputAmount = amounts[stock.id] ?? 1n;

                  const updateAmount = (value: string) => {
                     const num = BigInt(Math.max(1, Number(value) || 1));
                     setAmounts((prev) => ({
                        ...prev,
                        [stock.id]: num,
                     }));
                  };

                  return (
                     <li
                        key={stock.id}
                        className="flex flex-col bg-base-200 p-3 rounded-md shadow-sm"
                     >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                           <div>
                              <p className="text-lg font-medium text-primary">
                                 {stock.name}
                              </p>
                              <p className="text-sm text-info">
                                 <span className="block">
                                    Price per Share:{" "}
                                    <span className="font-bold text-primary">
                                       {formatBigInt(stock.pricePerShare)}
                                    </span>
                                 </span>
                                 <span className="block">
                                    + Buy Fee:{" "}
                                    <span className="font-bold text-primary">
                                       $
                                       {(
                                          (Number(stock.pricePerShare) *
                                             currentPlayer.stockBuyFee) /
                                          1000000
                                       ).toFixed(3)}
                                    </span>
                                 </span>
                                 <span className="block">
                                    + Sell Fee:{" "}
                                    <span className="font-bold text-primary">
                                       $
                                       {(
                                          (Number(stock.pricePerShare) *
                                             currentPlayer.stockSellFee) /
                                          1000000
                                       ).toFixed(3)}
                                    </span>
                                 </span>
                              </p>

                              <p className="text-sm text-info">
                                 Total Value:{" "}
                                 <span className="font-bold text-info">
                                    {formatBigInt(
                                       stock.pricePerShare * stock.totalShares
                                    )}
                                 </span>
                              </p>
                              <p className="text-sm text-info">
                                 {stock.description}
                              </p>
                              <p className="text-sm text-info">
                                 Total Shares:{" "}
                                 <span className="font-bold">
                                    {stock.totalShares.toString()}
                                 </span>
                                 , Available:{" "}
                                 <span className="font-bold">
                                    {stock.availableShares.toString()}
                                 </span>
                              </p>
                           </div>

                           <div className="flex flex-col sm:items-end gap-2">
                              <input
                                 type="number"
                                 className="input input-bordered w-28"
                                 value={inputAmount.toString()}
                                 onChange={(e) => updateAmount(e.target.value)}
                              />
                              <div className="flex gap-2">
                                 <button
                                    className="btn btn-primary px-4 py-2 font-bold"
                                    onClick={() =>
                                       conn.reducers.createTransaction(
                                          stock.id,
                                          inputAmount,
                                          TransactionType.Buy as TransactionType
                                       )
                                    }
                                    disabled={
                                       currentPlayer.money <
                                       stock.pricePerShare * inputAmount
                                    }
                                 >
                                    Buy
                                 </button>
                                 <button
                                    className="btn btn-secondary px-4 py-2 font-bold"
                                    onClick={() =>
                                       conn.reducers.createTransaction(
                                          stock.id,
                                          inputAmount,
                                          TransactionType.Sell as TransactionType
                                       )
                                    }
                                    disabled={
                                       !hasStock ||
                                       playerStock!.amount < inputAmount
                                    }
                                 >
                                    Sell
                                 </button>
                              </div>
                           </div>
                        </div>

                        {hasStock && (
                           <div className="mt-3 text-sm text-info bg-base-300 p-2 rounded">
                              You own{" "}
                              <span className="font-bold">
                                 {playerStock.amount.toString()}{" "}
                                 {playerStock.amount === 1n
                                    ? "share"
                                    : "shares"}
                              </span>
                              , worth{" "}
                              <span className="font-bold">
                                 {formatBigInt(
                                    stock.pricePerShare *
                                       BigInt(playerStock.amount)
                                 )}
                              </span>
                              .
                           </div>
                        )}
                     </li>
                  );
               })}
            </ul>
         ) : (
            <p className="text-primary/50 text-center">
               No stocks available right now!
            </p>
         )}
      </div>
   );
}

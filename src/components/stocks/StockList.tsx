import { useState } from 'react';
import { useSpacetime } from '~/spacetimedb/useSpacetimeConnection';
import { usePlayerStore } from '~/stores/usePlayerStore';
import { formatBigInt } from '~/utils/formatBigInt';
import { type Stock, TransactionType } from '../../../module_bindings';

export default function StockList({ stocks }: { stocks: Stock[] }) {
  const { conn } = useSpacetime();
  const currentPlayer = usePlayerStore((s) => s.currentPlayer);
  const [amounts, setAmounts] = useState<Record<number, bigint>>({});

  if (!(conn && currentPlayer)) {
    return null;
  }

  // Calculate total portfolio value
  const portfolioValue = currentPlayer.stocks.reduce((total, s) => {
    const stock = stocks.find((stk) => stk.id === s.stockId);
    if (!stock) {
      return total;
    }
    return total + stock.pricePerShare * BigInt(s.amount);
  }, 0n);

  return (
    <div className="flex-2 flex-col items-center justify-center rounded-lg bg-base-100 p-4 shadow-lg">
      <h3 className="mb-6 text-center font-semibold text-3xl text-primary">
        Your Portfolio
      </h3>
      <p className="mb-4 text-center text-info">
        Total Portfolio Value:{' '}
        <span className="font-bold text-primary">
          {formatBigInt(portfolioValue)}
        </span>
      </p>

      {stocks.length > 0 ? (
        <ul className="h-[36rem] space-y-4 overflow-auto">
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
                className="flex flex-col rounded-md bg-base-200 p-3 shadow-sm"
                key={stock.id}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-lg text-primary">
                      {stock.name}
                    </p>
                    <p className="text-info text-sm">
                      <span className="block">
                        Price per Share:{' '}
                        <span className="font-bold text-primary">
                          {formatBigInt(stock.pricePerShare)}
                        </span>
                      </span>
                      <span className="block">
                        + Buy Fee:{' '}
                        <span className="font-bold text-primary">
                          {formatBigInt(
                            (stock.pricePerShare *
                              BigInt(currentPlayer.stockBuyFee)) /
                              1000n
                          )}
                        </span>
                      </span>
                      <span className="block">
                        + Sell Fee:{' '}
                        <span className="font-bold text-primary">
                          {formatBigInt(
                            (stock.pricePerShare *
                              BigInt(currentPlayer.stockSellFee)) /
                              1000n
                          )}
                        </span>
                      </span>
                    </p>

                    <p className="text-info text-sm">
                      Total Value:{' '}
                      <span className="font-bold text-info">
                        {formatBigInt(stock.pricePerShare * stock.totalShares)}
                      </span>
                    </p>
                    <p className="text-info text-sm">{stock.description}</p>
                    <p className="text-info text-sm">
                      Total Shares:{' '}
                      <span className="font-bold">
                        {stock.totalShares.toString()}
                      </span>
                      , Available:{' '}
                      <span className="font-bold">
                        {stock.availableShares.toString()}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:items-end">
                    <input
                      className="input input-bordered w-28"
                      onChange={(e) => updateAmount(e.target.value)}
                      type="number"
                      value={inputAmount.toString()}
                    />
                    <div className="flex gap-2">
                      <button
                        className="btn btn-primary px-4 py-2 font-bold"
                        disabled={
                          currentPlayer.money <
                          stock.pricePerShare * inputAmount
                        }
                        onClick={() =>
                          conn.reducers.createTransaction(
                            stock.id,
                            inputAmount,
                            TransactionType.Buy as TransactionType
                          )
                        }
                        type="submit"
                      >
                        Buy
                      </button>
                      <button
                        className="btn btn-secondary px-4 py-2 font-bold"
                        disabled={
                          !hasStock || playerStock?.amount < inputAmount
                        }
                        onClick={() =>
                          conn.reducers.createTransaction(
                            stock.id,
                            inputAmount,
                            TransactionType.Sell as TransactionType
                          )
                        }
                        type="submit"
                      >
                        Sell
                      </button>
                    </div>
                  </div>
                </div>

                {hasStock && (
                  <div className="mt-3 rounded bg-base-300 p-2 text-info text-sm">
                    You own{' '}
                    <span className="font-bold">
                      {playerStock.amount.toString()}{' '}
                      {playerStock.amount === 1n ? 'share' : 'shares'}
                    </span>
                    , worth{' '}
                    <span className="font-bold">
                      {formatBigInt(
                        stock.pricePerShare * BigInt(playerStock.amount)
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
        <p className="text-center text-primary/50">
          No stocks available right now!
        </p>
      )}
    </div>
  );
}

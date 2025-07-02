import { useEffect } from 'react';
import type { EventContext, Stock } from '~/../module_bindings';
import { useSpacetime } from '~/spacetimedb/useSpacetimeConnection';
import { useStocks } from '~/stores/useStockStore';

export function useStockSync() {
  const { conn } = useSpacetime();

  useEffect(() => {
    if (!conn) {
      return;
    }

    const setState = useStocks.setState;

    const updateStocks = (updater: (map: Map<number, Stock>) => void) => {
      setState((state) => {
        const newMap = new Map(state.stocks);
        updater(newMap);
        return { stocks: newMap };
      });
    };

    const onInsert = (_ctx: EventContext, upgrade: Stock) => {
      updateStocks((map) => {
        map.set(upgrade.id, upgrade);
      });
    };

    const onUpdate = (_ctx: EventContext, _old: Stock, updated: Stock) => {
      updateStocks((map) => {
        map.set(updated.id, updated);
      });
    };

    const onDelete = (_ctx: EventContext, stock: Stock) => {
      updateStocks((map) => {
        map.delete(stock.id);
      });
    };

    conn.db.stock.onInsert(onInsert);
    conn.db.stock.onUpdate(onUpdate);
    conn.db.stock.onDelete(onDelete);

    return () => {
      conn.db.stock.removeOnInsert(onInsert);
      conn.db.stock.removeOnUpdate(onUpdate);
      conn.db.stock.removeOnDelete(onDelete);
    };
  }, [conn]);
}

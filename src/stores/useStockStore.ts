import { create } from 'zustand';
import type { Stock } from '~/../module_bindings';

interface StockState {
  stocks: Map<number, Stock>;
}

export const useStocks = create<StockState>(() => ({
  stocks: new Map(),
}));

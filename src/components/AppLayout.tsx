import type { ReactNode } from 'react';
import { usePlayerSync } from '~/spacetimedb/usePlayerSync';
import {
  useSpacetime,
  useSpacetimeConnection,
} from '~/spacetimedb/useSpacetimeConnection';
import { useStockSync } from '~/spacetimedb/useStockSync';
import { useUpgradeSync } from '~/spacetimedb/useUpgradeSync';
import { usePlayerStore } from '~/stores/usePlayerStore';
import SpacetimeLoading from './SpacetimeLoading';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  useSpacetimeConnection();
  usePlayerSync();
  useUpgradeSync();
  useStockSync();

  const { connected, identity } = useSpacetime();
  const currentPlayer = usePlayerStore((s) => s.currentPlayer);

  if (!(connected && identity && currentPlayer)) {
    return <SpacetimeLoading />;
  }

  return <>{children}</>;
};

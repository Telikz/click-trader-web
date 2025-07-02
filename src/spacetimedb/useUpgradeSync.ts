import { useEffect } from 'react';
import type { EventContext, Upgrades } from '~/../module_bindings';
import { useSpacetime } from '~/spacetimedb/useSpacetimeConnection';
import { useUpgrades } from '~/stores/useUpgradeStore';

export function useUpgradeSync() {
  const { conn } = useSpacetime();

  useEffect(() => {
    if (!conn) {
      return;
    }

    const setState = useUpgrades.setState;

    const updateUpgrades = (updater: (map: Map<number, Upgrades>) => void) => {
      setState((state) => {
        const newMap = new Map(state.upgrades);
        updater(newMap);
        return { upgrades: newMap };
      });
    };

    const onInsert = (_ctx: EventContext, upgrade: Upgrades) => {
      updateUpgrades((map) => {
        map.set(upgrade.id, upgrade);
      });
    };

    const onUpdate = (
      _ctx: EventContext,
      _old: Upgrades,
      updated: Upgrades
    ) => {
      updateUpgrades((map) => {
        map.set(updated.id, updated);
      });
    };

    const onDelete = (_ctx: EventContext, upgrade: Upgrades) => {
      updateUpgrades((map) => {
        map.delete(upgrade.id);
      });
    };

    conn.db.upgrades.onInsert(onInsert);
    conn.db.upgrades.onUpdate(onUpdate);
    conn.db.upgrades.onDelete(onDelete);

    return () => {
      conn.db.upgrades.removeOnInsert(onInsert);
      conn.db.upgrades.removeOnUpdate(onUpdate);
      conn.db.upgrades.removeOnDelete(onDelete);
    };
  }, [conn]);
}

import { useEffect } from 'react';
import type { EventContext, Player } from '~/../module_bindings';
import { useSpacetime } from '~/spacetimedb/useSpacetimeConnection';
import { usePlayerStore } from '~/stores/usePlayerStore';

export function usePlayerSync() {
  const { conn, identity } = useSpacetime();
  const identityHex = identity?.toHexString();

  useEffect(() => {
    if (!(conn && identityHex)) {
      return;
    }

    const setState = usePlayerStore.setState;

    const setCurrentPlayer = (player: Player | null) => {
      setState({ currentPlayer: player });
    };

    const updatePlayers = (updater: (map: Map<string, Player>) => void) => {
      setState((state) => {
        const newMap = new Map(state.players);
        updater(newMap);
        return { players: newMap };
      });
    };

    const onInsert = (_ctx: EventContext, player: Player) => {
      if (player.identity.toHexString() === identityHex) {
        setCurrentPlayer(player);
      }

      updatePlayers((map) => {
        if (!map.has(player.identity.toHexString())) {
          map.set(player.identity.toHexString(), player);
        }
      });
    };

    const onUpdate = (_ctx: EventContext, old: Player, updated: Player) => {
      if (updated.identity.toHexString() === identityHex) {
        setCurrentPlayer(updated);
      }

      updatePlayers((map) => {
        map.delete(old.identity.toHexString());
        map.set(updated.identity.toHexString(), updated);
      });
    };

    const onDelete = (_ctx: EventContext, player: Player) => {
      if (player.identity.toHexString() === identityHex) {
        setCurrentPlayer(null);
      }

      updatePlayers((map) => {
        map.delete(player.identity.toHexString());
      });
    };

    conn.db.player.onInsert(onInsert);
    conn.db.player.onUpdate(onUpdate);
    conn.db.player.onDelete(onDelete);

    return () => {
      conn.db.player.removeOnInsert(onInsert);
      conn.db.player.removeOnUpdate(onUpdate);
      conn.db.player.removeOnDelete(onDelete);
    };
  }, [conn, identityHex]);
}

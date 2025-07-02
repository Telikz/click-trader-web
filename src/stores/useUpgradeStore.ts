import { create } from 'zustand';
import type { Upgrades } from '~/../module_bindings';
import { usePlayerStore } from '~/stores/usePlayerStore';

interface UpgradesState {
  upgrades: Map<number, Upgrades>;
}

export const useUpgrades = create<UpgradesState>(() => ({
  upgrades: new Map(),
}));

export function useLockedUpgrades() {
  const availableUpgrades = useUpgrades((s) => s.upgrades);
  const player = usePlayerStore((s) => s.currentPlayer);

  if (!player) {
    return [];
  }

  return Array.from(availableUpgrades.values()).filter(
    (upgrade) => !player.upgrades.includes(upgrade.id)
  );
}

export function useUnlockedUpgrades() {
  const availableUpgrades = useUpgrades((s) => s.upgrades);
  const player = usePlayerStore((s) => s.currentPlayer);

  if (!player) {
    return [];
  }

  return Array.from(availableUpgrades.values()).filter((upgrade) =>
    player.upgrades.includes(upgrade.id)
  );
}

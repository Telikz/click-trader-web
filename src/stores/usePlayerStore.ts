import { create } from 'zustand';
import type { Player } from '~/../module_bindings';

interface PlayerState {
  currentPlayer: Player | null;
  players: Map<string, Player>;
}

export const usePlayerStore = create<PlayerState>(() => ({
  currentPlayer: null,
  players: new Map(),
}));

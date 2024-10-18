import { values } from 'ramda';
import { create } from 'zustand';

import { Asset, UseCoins } from './coins-manager.types';

export const useCoins = create<UseCoins>((set) => ({
  coins: [],
  error: null,
  coinsMap: {},
  loading: false,
  setError: (error: string | null) => set({ error }),
  setLoading: (loading: boolean) => set({ loading }),
  setCoins: (coins: Record<string, Asset>) =>
    set({
      coinsMap: coins,
      coins: values(coins) as ReadonlyArray<Asset>,
    }),
}));

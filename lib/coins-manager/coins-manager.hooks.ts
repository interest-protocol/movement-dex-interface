import { values } from 'ramda';
import { KeyedMutator } from 'swr';
import { create } from 'zustand';

import { noop } from '@/utils';

import { Asset, UseCoins } from './coins-manager.types';

export const useCoins = create<UseCoins>((set) => ({
  coins: [],
  error: null,
  mutate: noop,
  coinsMap: {},
  loading: false,
  setError: (error: string | null) => set({ error }),
  setLoading: (loading: boolean) => set({ loading }),
  setMutate: (mutate: KeyedMutator<void>) => set({ mutate }),
  setCoins: (coins: Record<string, Asset>) =>
    set({
      coinsMap: coins,
      coins: values(coins) as ReadonlyArray<Asset>,
    }),
}));

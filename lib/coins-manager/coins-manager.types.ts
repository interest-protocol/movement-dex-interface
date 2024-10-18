import BigNumber from 'bignumber.js';

import { CoinMetadata, FAMetadata } from '@/interface';

export type AssetMetadata = CoinMetadata | FAMetadata;

export interface Asset {
  balance: BigNumber;
  metadata: AssetMetadata;
}

export interface UseCoins {
  loading: boolean;
  error: string | null;
  coins: ReadonlyArray<Asset>;
  coinsMap: Record<string, Asset>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCoins: (coins: Record<string, Asset>) => void;
}

import { CoinMetadata } from '@mysten/sui.js/client';
import BigNumber from 'bignumber.js';

export interface CoinObject extends Pick<CoinMetadata, 'symbol' | 'decimals'> {
  balance: BigNumber;
  type: `0x${string}`;
  coinObjectCount: number;
  metadata: Omit<CoinMetadata, 'symbol' | 'decimals'>;
}

export type CoinsMap = Record<string, CoinObject>;

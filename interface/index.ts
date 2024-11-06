/* eslint-disable @typescript-eslint/no-unused-vars */
import BigNumber from 'bignumber.js';

import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinData {
  type: `0x${string}`;
  decimals: number;
  symbol: string;
}

export interface PoolPageProps {
  objectId: string;
  stateId: string;
}

export enum PoolTypeEnum {
  CLAMM = 'CLAMM',
  AMM = 'AMM',
}

export interface AmmPoolCoinTypes {
  coinX: AssetMetadata;
  coinY: AssetMetadata;
  lpCoin: string;
}

export interface AmmPool {
  poolObjectId: string;
  stateId: string;
  type: string;
  coins: AmmPoolCoinTypes;
  poolType: PoolTypeEnum;
  isVolatile: boolean;
}

export interface CoinBalance {
  type: string;
  balance: bigint;
}

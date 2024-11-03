/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountAddress } from '@aptos-labs/ts-sdk';
import BigNumber from 'bignumber.js';

import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinData {
  type: `0x${string}`;
  decimals: number;
  symbol: string;
}

export interface FAMetadata {
  name: string;
  symbol: string;
  iconUri?: string;
  decimals: number;
  address: AccountAddress;
}

export interface CoinMetadata {
  name: string;
  type: string;
  symbol: string;
  iconUri?: string;
  decimals: number;
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

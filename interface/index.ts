/* eslint-disable @typescript-eslint/no-unused-vars */
import BigNumber from 'bignumber.js';

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
  srAMM = 'SR-AMM',
}

export interface AmmPoolCoinTypes {
  typeX: string;
  typeY: string;
}

export interface SrAmmPool {
  isVolatile: boolean;
  poolAddress: string;
  poolType: PoolTypeEnum;
  coins: AmmPoolCoinTypes;
}

export interface CoinBalance {
  type: string;
  balance: bigint;
}

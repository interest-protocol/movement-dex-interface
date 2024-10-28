import { AccountAddress } from '@aptos-labs/ts-sdk';
import BigNumber from 'bignumber.js';

export type BigNumberish = BigNumber | bigint | string | number;

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

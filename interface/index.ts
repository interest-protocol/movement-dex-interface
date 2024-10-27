import { AccountAddress } from '@aptos-labs/ts-sdk';
import BigNumber from 'bignumber.js';

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

export interface CoinMetadataWithType extends CoinMetadata {
  type: `0x${string}`;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountAddress } from '@aptos-labs/ts-sdk';
import BigNumber from 'bignumber.js';

export type BigNumberish = BigNumber | bigint | string | number;

export interface CoinData {
  type: `0x${string}`;
  decimals: number;
  symbol: string;
}

export interface PoolPageProps {
  address: string;
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

export interface SdkSrAmmPool {
  balances: {
    x: bigint;
    y: bigint;
  };
  metadata: {
    x: AccountAddress;
    y: AccountAddress;
  };
  supply: {
    type: `${string}::${string}::${string}`;
    maxSupply: bigint;
    supply: bigint;
  };
  faMetadata: {
    type: `${string}::${string}::${string}`;
    name: string;
    symbol: string;
    decimals: number;
    projectUri: string;
    iconUri: string;
  };
  srPool: {
    type: `${string}::${string}::${string}`;
    bidLiquidity: bigint;
    isSrMode: boolean;
    lastSlotTimestamp: bigint;
    slotBalanceX: bigint;
    slotBalanceY: bigint;
  };
}

export interface CoinBalance {
  type: string;
  balance: bigint;
}

export interface SdkSrAmmConfig {
  type: `${string}::${string}::${string}`;
  admin: AccountAddress;
  adminFee: bigint;
  delay: bigint;
  fee: bigint;
  newFaPaymentAmount: bigint;
  pendingAdmin: AccountAddress;
  slotWindow: bigint;
  start: bigint;
  treasury: AccountAddress;
}

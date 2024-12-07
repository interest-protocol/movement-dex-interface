import BigNumber from 'bignumber.js';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

import { FilterItemProps } from '../components/farm-filter/farm.types';

export enum FilterTypeEnum {
  CATEGORY = 'category',
}

export enum EarnTabEnum {
  Earn,
  MyPosition,
}

export interface EarncCardTokenInfoProps {
  coins: ReadonlyArray<AssetMetadata>;
}

export enum EarnLabelEnum {
  'staked' = 'staked',
  'unstaked' = 'unstaked',
  'rewards' = 'rewards',
}

export interface ISrEarn {
  supply: bigint;
  balanceY: bigint;
  balanceX: bigint;
  metadataY: string;
  metadataX: string;
  isSrMode: boolean;
  poolAddress: string;
  bidLiquidity: bigint;
  slotBalanceX: bigint;
  slotBalanceY: bigint;
  lastSlotTimestamp: bigint;
  metadata: {
    x: AssetMetadata;
    y: AssetMetadata;
    pool: AssetMetadata;
  };
}

export interface EarnCardProps {
  label: string;
  balance: number;
  tokenName: string;
  earnAmount: number;
  TokenIcon: FC<SVGProps>;
}

export interface IEarnForm {
  token: EarnToken;
  lpCoin: EarnToken;
  filterList: ReadonlyArray<FilterItemProps>;
}

export interface EarnTokenWithMetadata extends AssetMetadata {
  value: string;
  locked: boolean;
  valueBN: BigNumber;
}

export type EarnToken = EarnTokenWithMetadata;

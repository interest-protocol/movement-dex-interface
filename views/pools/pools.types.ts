import { AmmPool, CoinMetadata, FAMetadata } from '@/interface';

import { ISwapSettings } from '../swap/swap.types';
import { FormFilterValue } from './pool-card/pool-card.types';

export enum FilterTypeEnum {
  ALGORITHM = 'algorithm',
  POOL_TYPE = 'pool_type',
  CATEGORY = 'category',
}

export enum PoolTabEnum {
  Pools,
  MyPosition,
}

export enum PoolOption {
  Deposit,
  Withdraw,
}

export interface PoolCardListProps {
  tab: PoolTabEnum;
}

export interface PoolCardListContentProps {
  done: boolean;
  hasMore?: boolean;
  arePoolsLoading: boolean;
  pools?: ReadonlyArray<AmmPool>;
}

export interface PoolTokenWithCoinMetadata extends CoinMetadata {
  value: string;
  locked: boolean;
}
export interface PoolTokenWithFAMetadata extends FAMetadata {
  value: string;
  locked: boolean;
}

export type PoolToken = PoolTokenWithFAMetadata | PoolTokenWithCoinMetadata;
export interface PoolForm {
  error: string | null;
  lpCoin: PoolToken;
  tokenSelected?: string;
  explorerLink: string;
  isFindingPool: boolean;
  settings: ISwapSettings;
  tokenList: ReadonlyArray<PoolToken>;
  filterList: ReadonlyArray<FilterItemProps>;
  pool: AmmPool;
}

export interface FilterItemProps {
  type: FilterTypeEnum;
  value: FormFilterValue;
}

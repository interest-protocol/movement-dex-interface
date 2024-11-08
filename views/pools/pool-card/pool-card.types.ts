import { ReactNode } from 'react';

import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export enum FormFilterValue {
  'official' = 'official',
  'all' = 'all',
  'stable' = 'stable',
  'volatile' = 'volatile',
  'clamm' = 'clamm',
  'amm' = 'amm',
}

export interface PoolCardHeaderProps {
  tags?: ReadonlyArray<string>;
}

export interface PoolCardTokenInfoProps {
  loading: boolean;
  coins: ReadonlyArray<AssetMetadata>;
}

export interface PoolCardTradeProps {
  index: number;
  isInfo?: boolean;
  amount: ReactNode;
  description: string;
  tooltipInfo: string;
}

export interface PoolCardProps {
  address: string;
}

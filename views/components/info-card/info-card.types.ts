import { ReactNode } from 'react';

import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export enum FormFilterValue {
  'official' = 'official',
  'all' = 'all',
  'stable' = 'stable',
  'volatile' = 'volatile',
  'clamm' = 'clamm',
  'amm' = 'amm',
  'farm' = 'farm',
}

export interface InfoCardHeaderProps {
  tags?: ReadonlyArray<string>;
}

export interface InfoCardTokenCoinsProps {
  coins: ReadonlyArray<AssetMetadata>;
}

export interface InfoCardTradeProps {
  index: number;
  isInfo?: boolean;
  amount: ReactNode;
  description: string;
  tooltipInfo: string;
}

interface InfoCardLineProps {
  description: string;
  tooltipInfo: string;
}

export interface InfoCardProps {
  link: string;
  tags: ReadonlyArray<string>;
  infoData: ReadonlyArray<string>;
  listCoins: ReadonlyArray<AssetMetadata>;
  lines: ReadonlyArray<InfoCardLineProps>;
}

export interface InfoCardSkeletonProps {
  isPool?: boolean;
}

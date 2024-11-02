import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export interface ISwapSettings {
  slippage: string;
}

export type SwapToken = AssetMetadata & {
  value: string;
  usdPrice: number | null;
  isFetchingSwap?: boolean;
};

interface SwapTypeArgs {
  coinIn: string;
  coinOut: string;
  lpCoin: string;
}

export enum Aggregator {
  Interest = 'interest',
}

export type SwapPath = ReadonlyArray<SwapTypeArgs>;

export interface SwapForm {
  to: SwapToken;
  from: SwapToken;
  path: Array<string>;
  settings: ISwapSettings;
  lock: boolean;
  error?: string | null;
  updateSlider: object;
  explorerLink: string;
  loading: boolean;
  focus: boolean;
  swapping: boolean;
}

export interface AggregatorProps {
  url: string;
  name: string;
  key: Aggregator;
  Icon: FC<SVGProps>;
}

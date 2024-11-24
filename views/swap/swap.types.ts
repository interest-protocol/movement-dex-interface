import { InputGenerateTransactionPayloadData } from '@aptos-labs/ts-sdk';
import BigNumber from 'bignumber.js';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export interface ISwapSettings {
  slippage: string;
}

export type SwapToken = AssetMetadata & {
  value: string;
  valueBN: BigNumber;
  usdPrice: number | null;
  isFetchingSwap?: boolean;
};

export enum Aggregator {
  Interest = 'interest',
}

export type SwapPath = {
  poolId: string;
  source: string;
  srcAsset: string;
  dstAsset: string;
  srcAmount: string;
  dstAmount: string;
};

export interface SwapForm {
  origin: 'from' | 'to';
  to: SwapToken;
  from: SwapToken;
  path: ReadonlyArray<ReadonlyArray<SwapPath>>;
  payload: InputGenerateTransactionPayloadData;
  settings: ISwapSettings;
  lock: boolean;
  error?: string | null;
  updateSlider: object;
  explorerLink: string;
  executionTime: string;
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

export interface MosaicQuoteResponse {
  code: number;
  message: string;
  data: {
    srcAsset: string;
    dstAsset: string;
    srcAmount: string;
    dstAmount: string;
    feeAmount: string;
    isFeeIn: false;
    paths: ReadonlyArray<ReadonlyArray<SwapPath>>;
    tx: {
      function: `${string}::${string}::${string}`;
      typeArguments: Array<string>;
      functionArguments: {
        receiver: string;
        amounts: Array<string>;
        routeData: Array<string>;
        faAddresses: Array<string>;
        configAddresses: Array<string>;
        feeReceiver: string;
        feeBps: string;
        isFeeIn: boolean;
        minAmountOut: string;
        extraData: string;
      };
    };
  };
  requestId: string;
}

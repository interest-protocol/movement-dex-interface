import { UseFormSetValue } from 'react-hook-form';

import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export interface ICreateTokenPool {
  active: boolean;
  quoteValue?: string;
  tokenValue?: string;
  quote?: AssetMetadata & { usdPrice: number };
}

export interface ICreateTokenForm {
  name: string;
  symbol: string;
  supply: number;
  decimals: number;
  imageUrl?: string;
  projectUrl?: string;
  fixedSupply: boolean;
  explorerLink: string;
  pool: ICreateTokenPool;
}

export interface CreateTokenFormImageProps {
  setValue: UseFormSetValue<ICreateTokenForm>;
}

import { UseFormSetValue } from 'react-hook-form';

export interface ICreateTokenPool {
  active: boolean;
  quoteValue: string;
  tokenValue: string;
  quoteUsdPrice: number;
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

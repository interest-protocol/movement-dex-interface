import { UseFormSetValue } from 'react-hook-form';

export interface ICreateTokenForm {
  name: string;
  symbol: string;
  supply: number;
  decimals: number;
  imageUrl?: string;
  projectUrl?: string;
  description: string;
  fixedSupply: boolean;
}

export interface CreateTokenFormImageProps {
  setValue: UseFormSetValue<ICreateTokenForm>;
}

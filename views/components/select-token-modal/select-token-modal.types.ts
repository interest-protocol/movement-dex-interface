import { Control, UseFormSetValue } from 'react-hook-form';

import { CoinMetadata } from '@/interface';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

export interface TokenModalItemProps extends Pick<CoinMetadata, 'symbol'> {
  isFA: boolean;
  selected: boolean;
  onClick: () => void;
}

export interface SelectTokenModalProps {
  faucet?: boolean;
  simple?: boolean;
  closeModal: () => void;
  onSelect: (metadata: AssetMetadata) => void;
}

export interface SelectTokenFilterProps {
  control: Control<SearchTokenForm>;
  setValue: UseFormSetValue<SearchTokenForm>;
}

export enum TokenOrigin {
  Coin,
  FA,
  Wallet,
}

export interface SearchTokenForm {
  search: string;
  filter: TokenOrigin;
}

export interface SelectTokenModalBodyProps
  extends Pick<SelectTokenModalProps, 'faucet'> {
  control: Control<SearchTokenForm>;
  handleSelectToken: (metadata: AssetMetadata) => void;
}

export interface ModalTokenBodyProps {
  loading: boolean;
  tokens: ReadonlyArray<AssetMetadata>;
  handleSelectToken: (metadata: AssetMetadata) => void;
}

export interface ModalTokenSearchProps {
  search: string;
  handleSelectToken: (metadata: AssetMetadata) => void;
}

export interface FavoriteTokensProps {
  onSelectToken: (metadata: AssetMetadata) => void;
}

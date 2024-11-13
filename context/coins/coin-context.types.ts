import { Asset } from '@/lib/coins-manager/coins-manager.types';

export interface CoinsContextProps {
  coinsWithoutLP: ReadonlyArray<Asset>;
  isLPTokensHiden: boolean;
  handleHideLPTokens: () => void;
}

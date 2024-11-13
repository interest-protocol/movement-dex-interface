import { Asset } from '@/lib/coins-manager/coins-manager.types';

export interface CoinsContextProps {
  coinsWithoutLP: ReadonlyArray<Asset>;
  hideLPTokensActive: boolean;
  handleHideLPTokens: () => void;
}

import { CoinMetadata } from '@/interface';

import { AssetMetadata } from './coins-manager.types';

export const isCoin = (asset: AssetMetadata): asset is CoinMetadata =>
  !!(asset as CoinMetadata).type;

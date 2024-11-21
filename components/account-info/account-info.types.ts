import { AccountInfo } from '@aptos-labs/wallet-adapter-react';

export interface AvatarProps {
  isLarge?: boolean;
  account?: AccountInfo;
  withNameOrAddress?: boolean;
}

import type { useAptosWallet } from '@razorlabs/wallet-kit';

export interface AvatarProps {
  isLarge?: boolean;
  withNameOrAddress?: boolean;
  account?: ReturnType<typeof useAptosWallet>['account'];
}

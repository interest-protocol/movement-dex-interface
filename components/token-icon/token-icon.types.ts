import { Network } from '@interest-protocol/aptos-move-dex';

export interface TokenIconProps {
  url?: string;
  size?: string;
  symbol: string;
  withBg?: boolean;
  network: Network;
  rounded?: boolean;
  loaderSize?: number;
}

import type { WalletProviderProps } from './wallet/wallet.types';

export interface NetworkConfig {
  rpc?: string;
  network: string;
  faucet?: string;
  indexer?: string;
}

export interface AptosProviderProps extends WalletProviderProps {
  defaultNetwork: string;
  networks: ReadonlyArray<NetworkConfig>;
  onChangeNetwork?: (network: string) => void;
}

export interface NetworkConfig {
  rpc?: string;
  network: string;
  faucet?: string;
  indexer?: string;
}

export interface AptosProviderProps {
  defaultNetwork: string;
  networks: ReadonlyArray<NetworkConfig>;
  onChangeNetwork?: (network: string) => void;
}

export interface NetworkContext {
  network: string;
  changeNetwork: (network: string) => void;
}

export interface NetworkProviderProps {
  defaultNetwork: string;
  onChangeNetwork?: (network: string) => void;
}

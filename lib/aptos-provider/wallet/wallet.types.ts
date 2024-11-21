import type { Wallet } from '@aptos-labs/wallet-adapter-react';

export interface WalletProviderProps {
  wallets: ReadonlyArray<Wallet>;
}

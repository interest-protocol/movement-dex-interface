import { AptosWalletProvider } from '@razorlabs/wallet-kit';
import { type FC, type PropsWithChildren } from 'react';

export const WalletProvider: FC<PropsWithChildren> = ({ children }) => (
  <AptosWalletProvider autoConnect>{children}</AptosWalletProvider>
);

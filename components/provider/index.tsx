import 'react-loading-skeleton/dist/skeleton.css';

import { Wallet } from '@aptos-labs/wallet-adapter-react';
import { Network as Nt } from '@interest-protocol/aptos-move-dex';
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';
import { WalletProvider } from '@mysten/dapp-kit';
import { NightlyWallet } from '@nightlylabs/aptos-wallet-adapter-plugin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

import { RPC_URL } from '@/constants';
import { ModalProvider } from '@/context/modal';
import { NetworkProvider } from '@/context/network';
import { AptosProvider } from '@/lib/aptos-provider';

import ThemeManager from '../theme-manager';
import Web3Manager from '../web3-manager';

const queryClient = new QueryClient();

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <AptosProvider
      defaultNetwork={Nt.Porto}
      wallets={[
        MartianWallet as unknown as Wallet,
        NightlyWallet as unknown as Wallet,
      ]}
      networks={[
        {
          network: Nt.Porto,
          rpc: RPC_URL[Nt.Porto],
        },
      ]}
    >
      <QueryClientProvider client={queryClient}>
        <NetworkProvider>
          <WalletProvider autoConnect>
            <Web3Manager />
            <ModalProvider>{children}</ModalProvider>
          </WalletProvider>
        </NetworkProvider>
      </QueryClientProvider>
    </AptosProvider>
  </ThemeManager>
);

export default Provider;

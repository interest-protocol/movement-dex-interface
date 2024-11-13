import { Wallet } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@interest-protocol/aptos-sr-amm';
import { NightlyWallet } from '@nightlylabs/aptos-wallet-adapter-plugin';
import { FC, PropsWithChildren } from 'react';

import { FAUCET_URL, INDEXER_URL, RPC_URL } from '@/constants';
import { CoinsProvider } from '@/context/coins';
import { ModalProvider } from '@/context/modal';
import { AptosProvider } from '@/lib/aptos-provider';
import CoinsManager from '@/lib/coins-manager';

import ThemeManager from '../theme-manager';

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <AptosProvider
      defaultNetwork={Network.Porto}
      wallets={[NightlyWallet as unknown as Wallet]}
      networks={[
        {
          network: Network.Porto,
          rpc: RPC_URL[Network.Porto],
          faucet: FAUCET_URL[Network.Porto],
          indexer: INDEXER_URL[Network.Porto],
        },
      ]}
    >
      <CoinsManager />
      <CoinsProvider>
        <ModalProvider>{children}</ModalProvider>
      </CoinsProvider>
    </AptosProvider>
  </ThemeManager>
);

export default Provider;

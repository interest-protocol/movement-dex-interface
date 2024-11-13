import { Network } from '@interest-protocol/aptos-sr-amm';
import { FC, PropsWithChildren } from 'react';

import { FAUCET_URL, INDEXER_URL, RPC_URL } from '@/constants';
import { ModalProvider } from '@/context/modal';
import { AptosProvider } from '@/lib/aptos-provider';
import CoinsManager from '@/lib/coins-manager';

import ThemeManager from '../theme-manager';

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <AptosProvider
      defaultNetwork={Network.Porto}
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
      <ModalProvider>{children}</ModalProvider>
    </AptosProvider>
  </ThemeManager>
);

export default Provider;

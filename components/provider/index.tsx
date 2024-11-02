import 'react-loading-skeleton/dist/skeleton.css';

import { Wallet } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@interest-protocol/aptos-sr-amm';
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';
import { NightlyWallet } from '@nightlylabs/aptos-wallet-adapter-plugin';
import { FC, PropsWithChildren } from 'react';

import { RPC_URL } from '@/constants';
import { ModalProvider } from '@/context/modal';
import { AptosProvider } from '@/lib/aptos-provider';
import CoinsManager from '@/lib/coins-manager';

import ThemeManager from '../theme-manager';

const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ThemeManager>
    <AptosProvider
      defaultNetwork={Network.Porto}
      wallets={[
        MartianWallet as unknown as Wallet,
        NightlyWallet as unknown as Wallet,
      ]}
      networks={[
        {
          network: Network.Porto,
          rpc: RPC_URL[Network.Porto],
        },
      ]}
    >
      <CoinsManager />
      <ModalProvider>{children}</ModalProvider>
    </AptosProvider>
  </ThemeManager>
);

export default Provider;

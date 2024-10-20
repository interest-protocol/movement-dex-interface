import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@interest-protocol/aptos-move-dex';
import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { EXTERNAL_FAUCET_URL } from '@/constants';

import MovementNetwork from '../account-info/movement-network';
import ConnectWalletButton from './connect-wallet-button';
import Profile from './profile';

const Wallet: FC = () => {
  const { account } = useWallet();

  return (
    <Box gap="s" display="flex" alignItems="center" justifyContent="flex-end">
      <a
        href={EXTERNAL_FAUCET_URL[Network.Porto]}
        target="_blank"
        rel="noreferrer"
      >
        <Button
          bg="#FFDA34"
          color="#000000"
          variant="filled"
          px={['xs', 'xs', 's']}
          nHover={{ bg: 'warning' }}
        >
          Mint
        </Button>
      </a>
      <Box
        gap="l"
        justifyContent="flex-end"
        display={['none', 'none', 'none', 'flex']}
      >
        <MovementNetwork />
      </Box>
      {account ? (
        <>
          <a
            href="https://faucet.devnet.imola.movementlabs.xyz"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="filled" px={['xs', 'xs', 's']}>
              Mint MOVE
            </Button>
          </a>
          <Profile />
        </>
      ) : (
        <ConnectWalletButton />
      )}
    </Box>
  );
};

export default Wallet;

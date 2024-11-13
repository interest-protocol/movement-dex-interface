import { Button, Typography } from '@interest-protocol/ui-kit';
import { AptosConnectButton } from '@razorlabs/wallet-kit';
import { FC } from 'react';

const ConnectWalletButton: FC = () => (
  <AptosConnectButton style={{ width: 'auto' }}>
    <Button px={['s', 'l']} variant="filled" borderRadius="xs">
      Connect
      <Typography
        as="span"
        size="large"
        variant="label"
        display={['none', 'none', 'inline']}
      >
        {' '}
        Wallet
      </Typography>
    </Button>
  </AptosConnectButton>
);

export default ConnectWalletButton;

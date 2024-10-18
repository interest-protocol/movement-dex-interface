import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Button, Typography } from '@interest-protocol/ui-kit';
import { NightlyWalletName } from '@nightlylabs/aptos-wallet-adapter-plugin';
import { FC } from 'react';

const ConnectWalletButton: FC = () => {
  const { connect, account } = useWallet();

  return (
    <Button
      px={['s', 'l']}
      variant="filled"
      borderRadius="xs"
      disabled={!!account}
      onClick={() => connect(NightlyWalletName)}
    >
      Connect
      <Typography
        as="span"
        size="large"
        variant="label"
        display={['none', 'none', 'inline']}
      >
        {' '}
        with Nightly
      </Typography>
    </Button>
  );
};

export default ConnectWalletButton;

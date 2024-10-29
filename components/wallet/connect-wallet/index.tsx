import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { NightlyWalletName } from '@nightlylabs/aptos-wallet-adapter-plugin';
import { FC } from 'react';

import { useModal } from '@/hooks/use-modal';

const ConnectWalletButton: FC = () => {
  const { setModal, handleClose } = useModal();
  const { connect, account } = useWallet();

  const handleOpenModal = () =>
    setModal(
      <Box>
        <Button
          px={['s', 'l']}
          variant="filled"
          borderRadius="xs"
          onClick={() => connect(NightlyWalletName)}
        >
          Nightly
        </Button>
      </Box>,
      { isOpen: true, custom: true, onClose: handleClose }
    );

  return (
    <Button
      px={['s', 'l']}
      variant="filled"
      borderRadius="xs"
      disabled={!!account}
      onClick={handleOpenModal}
    >
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
  );
};

export default ConnectWalletButton;

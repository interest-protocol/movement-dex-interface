import { Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { useModal } from '@/hooks/use-modal';

import ConnectWalletModal from './connect-wallet-modal';

const ConnectWalletButton: FC = () => {
  const { setModal, handleClose } = useModal();

  const handleOpenModal = () =>
    setModal(<ConnectWalletModal handleClose={handleClose} />, {
      isOpen: true,
      custom: true,
      onClose: handleClose,
    });

  return (
    <Button
      px={['s', 'l']}
      variant="filled"
      borderRadius="xs"
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

import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { ArrowLeftSVG, TimesSVG } from '@/components/svg';

import { ConnectWalletModalProps } from './connect-wallet.types';

const ConnectWalletModal: FC<ConnectWalletModalProps> = ({ handleClose }) => {
  const { allAvailableWallets, select } = useAptosWallet();

  const handleConnect = async (name: string) => {
    await select(name);
    handleClose();
  };

  return (
    <Box
      p="2xl"
      gap="2xl"
      width="35rem"
      bg="container"
      display="flex"
      maxWidth="95vw"
      borderRadius="2xs"
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column" gap="s">
          <Typography variant="headline" size="small" color="onSurface">
            Connect a wallet
          </Typography>
          <Typography variant="label" size="medium" color="outline">
            Please select a wallet to connect to this dapp:
          </Typography>
        </Box>
        <Button
          isIcon
          m="-0.5rem"
          variant="text"
          color="outline"
          onClick={handleClose}
        >
          <TimesSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" gap="s">
        {allAvailableWallets.map(({ label, name, iconUrl }) => (
          <Button
            px="s"
            key={v4()}
            variant="tonal"
            color="onSurface"
            borderRadius="xs"
            onClick={() => handleConnect(name)}
          >
            <Box as="span" display="flex" alignItems="center" gap="s">
              <img src={iconUrl} alt={label} width="40" />
              <Typography as="span" size="large" variant="label">
                {label}
              </Typography>
            </Box>
            <Box>
              <Box
                as="span"
                rotate="180deg"
                display="inline-flex"
                transformOrigin="50% 50%"
              >
                <ArrowLeftSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
              </Box>
            </Box>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default ConnectWalletModal;

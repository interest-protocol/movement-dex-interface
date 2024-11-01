import { Network } from '@interest-protocol/aptos-move-dex';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { ArrowLeftSVG } from '@/components/svg';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';

import { PoolTitleBarProps } from './pool-title-bar.types';

const PoolTitleBar: FC<PoolTitleBarProps> = ({ onBack, centerTile }) => {
  const network = useNetwork<Network>();

  return (
    <Box
      py="m"
      px="xl"
      mb="xs"
      gap="m"
      mx="auto"
      display="flex"
      flexWrap="wrap"
      maxWidth="65rem"
      borderRadius="xs"
      alignItems="center"
      bg="container"
      mt={['5xl', '5xl', '5xl', 'xl']}
    >
      <Button
        isIcon
        mr="xs"
        variant="text"
        onClick={onBack}
        color="onSurface"
        nHover={{
          bg: 'surface',
        }}
      >
        <ArrowLeftSVG width="1.5rem" maxWidth="1.5rem" maxHeight="1.5rem" />
      </Button>
      <Typography
        size="large"
        color="onSurface"
        variant="headline"
        textAlign="center"
        ml={centerTile ? 'auto' : ''}
        fontSize={['xl', 'xl', '3xl', '5xl']}
      >
        USDT
      </Typography>

      <Box
        gap="s"
        ml="auto"
        alignItems="center"
        display={['none', 'none', 'flex', 'flex']}
      >
        {['USDT', 'MOVE'].map((item) => (
          <TokenIcon withBg key={v4()} symbol={item} network={network} />
        ))}
      </Box>
    </Box>
  );
};

export default PoolTitleBar;

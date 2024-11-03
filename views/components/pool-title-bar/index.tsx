import { Network } from '@interest-protocol/aptos-move-dex';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { ArrowLeftSVG } from '@/components/svg';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { PoolForm } from '@/views/pools/pools.types';

import { PoolTitleBarProps } from './pool-title-bar.types';

const PoolTitleBar: FC<PoolTitleBarProps> = ({ onBack, centerTile }) => {
  const network = useNetwork<Network>();
  const { control } = useFormContext<PoolForm>();

  const tokens = useWatch({
    control: control,
    name: 'tokenList',
  });

  console.log(tokens, 'Tokens');
  const name = tokens.reduce(
    (acc, token) => `${acc ? `${acc}•` : ''}${token?.symbol ?? ''}`,
    ''
  );

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
        {name}
      </Typography>

      <Box
        gap="s"
        ml="auto"
        alignItems="center"
        display={['none', 'none', 'flex', 'flex']}
      >
        {tokens.map(({ symbol }) => (
          <TokenIcon withBg key={v4()} symbol={symbol} network={network} />
        ))}
      </Box>
    </Box>
  );
};

export default PoolTitleBar;

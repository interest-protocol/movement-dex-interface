import { Network } from '@interest-protocol/aptos-move-dex';
import { Box, TokenField, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';

import { PoolFieldsProps } from './pool-field.types';

const PoolField: FC<PoolFieldsProps> = () => {
  const network = useNetwork<Network>();

  return (
    <TokenField
      placeholder="0"
      textAlign="right"
      fieldProps={{ bg: 'lowestContainer' }}
      tokenName="MOVE"
      TokenIcon={<TokenIcon withBg network={network} symbol={'USDT'} />}
      Label={
        <Box display="flex" justifyContent="flex-end">
          <Typography
            mb="xs"
            size="medium"
            variant="label"
            color="onSurface"
            textTransform="uppercase"
          >
            Balance:{' '}
            <Typography size="medium" variant="label" color="primary" as="span">
              1
            </Typography>
          </Typography>
        </Box>
      }
    />
  );
};

export default PoolField;

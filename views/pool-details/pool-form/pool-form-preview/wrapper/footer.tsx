import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import PoolCardTrade from '@/views/pools/pool-card/pool-card-trade';

import { PoolPreviewWrapperProps } from '../preview.types';

const PoolPreviewWrapperFooter: FC<PoolPreviewWrapperProps> = ({
  onSubmit,
  getValues,
}) => (
  <Box>
    <Box px="m" py="xs" bg="surface" borderRadius="1rem">
      <PoolCardTrade
        isInfo
        index={0}
        key={v4()}
        description="Slippage"
        tooltipInfo="Slippage Loss (incl. pricing)"
        amount={`${getValues('settings.slippage')}%`}
      />
      <PoolCardTrade
        isInfo
        index={0}
        key={v4()}
        description="Network Fee"
        tooltipInfo="Gas estimation"
        amount="--"
      />
    </Box>
    {onSubmit}
  </Box>
);

export default PoolPreviewWrapperFooter;

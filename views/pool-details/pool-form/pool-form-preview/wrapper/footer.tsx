import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { useModal } from '@/hooks/use-modal';
import PoolCardTrade from '@/views/pools/pool-card/pool-card-trade';

import { PoolPreviewWrapperProps } from '../preview.types';

const PoolPreviewWrapperFooter: FC<PoolPreviewWrapperProps> = ({
  onSubmit,
  isDeposit,
  getValues,
}) => {
  const { handleClose } = useModal();

  return (
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
      <Button
        my="xl"
        variant="filled"
        width="fill-available"
        onClick={async () => {
          await onSubmit();
          handleClose();
        }}
      >
        <Typography
          variant="label"
          size="large"
          textAlign="center"
          width="100%"
        >
          {`Confirm ${isDeposit ? 'Deposit' : 'Withdraw'}`}
        </Typography>
      </Button>
    </Box>
  );
};

export default PoolPreviewWrapperFooter;

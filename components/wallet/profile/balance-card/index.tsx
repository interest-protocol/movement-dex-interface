import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { BalanceCardProps } from './balance-card.types';

const BalanceCard: FC<BalanceCardProps> = ({ balance, dollarAmount }) => {
  return (
    <Box
      my="m"
      px="xl"
      gap="xs"
      width="100%"
      display="flex"
      flexDirection={['row', 'row', 'row', 'column']}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Typography size="small" variant="display">
        {balance} SUI
      </Typography>
      <Typography size="small" opacity="0.7" variant="label" color="onSurface">
        {dollarAmount} $
      </Typography>
    </Box>
  );
};

export default BalanceCard;

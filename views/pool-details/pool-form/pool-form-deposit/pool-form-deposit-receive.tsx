import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const PoolFormDepositReceive: FC = () => {
  return (
    <Box>
      <Typography variant="body" size="large" mb="m">
        You will receive (estimated):
      </Typography>
      <Box borderRadius="xs" bg="lowestContainer" py="xs">
        <Box
          py="xs"
          px="m"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body" size="large">
            ipx-v-MOVE-RUCO
          </Typography>
          <Typography variant="body" ml="m" size="large">
            1.57855
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PoolFormDepositReceive;

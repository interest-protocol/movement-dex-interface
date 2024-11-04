import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import RateDown from '@/components/svg/rate-down';

import { CoinCardProps } from '../user-info.types';

const CoinCard: FC<CoinCardProps> = ({
  coin,
  Icon,
  balance,
  usdPrice,
  percentage,
}) => {
  return (
    <Box
      p="m"
      m="3xs"
      display="flex"
      bg="surface"
      borderRadius="xs"
      height="4.625rem"
      width="23.875rem"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box gap="s" display="flex" alignItems="center">
        <Box borderRadius="s" width="2.5rem" height="2.5rem">
          <Icon maxWidth="100%" maxHeight="100%" height="100%" width="100%" />
        </Box>
        <Box
          display="flex"
          alignItems="flex-start"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography size="large" variant="label">
            {coin}
          </Typography>
          <Typography
            opacity={0.7}
            size="small"
            variant="label"
            color="onSurface"
          >
            {balance}%
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="flex-end"
        flexDirection="column"
        justifyContent="flex-start"
      >
        <Typography size="large" variant="label">
          ${usdPrice}
        </Typography>
        <Box
          gap="xs"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <RateDown
            width="1rem"
            height="1rem"
            maxHeight="100%"
            maxWidth="100%"
          />
          <Typography
            size="large"
            opacity={0.7}
            variant="label"
            color="onSurface"
          >
            ${percentage}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CoinCard;

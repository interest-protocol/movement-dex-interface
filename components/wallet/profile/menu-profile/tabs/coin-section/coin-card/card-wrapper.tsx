import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import { CardWrapperProps } from '../../../user-info.types';

const CardWrapper: FC<PropsWithChildren<CardWrapperProps>> = ({
  TokenIcon,
  symbol,
  supportingText,
  children,
}) => {
  return (
    <Box
      p="m"
      m="3xs"
      display="flex"
      bg="surface"
      borderRadius="xs"
      height="4.625rem"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box gap="s" display="flex" alignItems="center">
        {TokenIcon}
        <Box
          display="flex"
          alignItems="flex-start"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography size="large" variant="label" lineHeight="1.5rem">
            {symbol}
          </Typography>
          <Typography
            opacity={0.7}
            size="small"
            variant="label"
            color="onSurface"
            lineHeight="1rem"
          >
            {supportingText}
          </Typography>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default CardWrapper;

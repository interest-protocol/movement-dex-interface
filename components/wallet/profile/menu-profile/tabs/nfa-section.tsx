import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

const NFASection: FC = () => (
  <Box
    p="l"
    gap="s"
    display="flex"
    alignItems="center"
    flexDirection="column"
    justifyContent="center"
  >
    <Typography size="medium" variant="label">
      No NFA yet
    </Typography>
    <Typography
      size="small"
      opacity="0.7"
      variant="label"
      color="onSurface"
      textAlign="center"
    >
      Buy or transfer NFA to this wallet to get started.
    </Typography>
  </Box>
);

export default NFASection;

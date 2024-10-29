import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { AssetInfoProps } from './asset-info-types';

const AssetInfo: FC<AssetInfoProps> = ({ Icon, label }) => {
  return (
    <Box
      p="m"
      gap="s"
      display="flex"
      width="11.688rem"
      height="6.688rem"
      borderRadius="xs"
      bg="outlineVariant"
      alignItems="flex-start"
      flexDirection="column"
      justifyContent="center"
      nHover={{
        background: 'highestContainer',
        transition: '0.4s',
      }}
    >
      <Icon width="1.5rem" height="1.5rem" maxWidth="100%" maxHeight="100%" />
      <Typography size="medium" variant="body">
        {label}
      </Typography>
    </Box>
  );
};

export default AssetInfo;

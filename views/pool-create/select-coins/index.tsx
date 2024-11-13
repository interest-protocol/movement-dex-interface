import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import PoolCreateButton from '../pool-next-button';
import Input from './input';
import SelectCoinsError from './select-coins-error';
import SelectCoinsErrorManager from './select-coins-error-manager';

const SelectCoins: FC = () => (
  <>
    <Box my="xl">
      <Box
        p="2xl"
        mx="auto"
        gap="2rem"
        bg="container"
        maxWidth="33rem"
        borderRadius="xs"
      >
        <Typography variant="body" size="small" color="onSurface">
          Select Token & Deposit
        </Typography>
        <Box>
          <Box my="s" display="flex" gap="s" alignItems="center">
            <Input index={0} />
          </Box>
          <Box my="s" display="flex" gap="s" alignItems="center">
            <Input index={1} />
          </Box>
        </Box>
        <SelectCoinsErrorManager />
        <SelectCoinsError />
      </Box>
    </Box>
    <PoolCreateButton />
  </>
);

export default SelectCoins;

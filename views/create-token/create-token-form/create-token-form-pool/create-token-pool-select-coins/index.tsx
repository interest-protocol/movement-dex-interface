import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Input from './input';
import SelectCoinsError from './select-coins-error';
import SelectCoinsErrorManager from './select-coins-error-manager';

const SelectCoins: FC = () => (
  <Box>
    <Box>
      <Box my="s" display="flex" gap="s" alignItems="center">
        <Input label="quote" />
        <Input label="token" />
      </Box>
    </Box>
    <SelectCoinsErrorManager />
    <SelectCoinsError />
  </Box>
);

export default SelectCoins;

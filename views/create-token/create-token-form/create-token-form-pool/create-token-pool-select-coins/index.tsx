import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Input from './input';

const CreateTokenPoolSelectCoins: FC = () => (
  <Box my="s" gap="s" display="flex" alignItems="center" flexDirection="column">
    <Input label="quote" />
    <Input label="token" />
  </Box>
);

export default CreateTokenPoolSelectCoins;

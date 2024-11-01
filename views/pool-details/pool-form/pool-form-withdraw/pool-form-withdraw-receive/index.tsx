import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { SelectionFieldValues } from '../../pool-form.types';
import PoolFormWithdrawReceiveTokens from './pool-form-withdraw-receive-tokens';
import PoolFormWithdrawReceiveType from './pool-form-withdraw-receive-type';

const PoolFormWithdrawReceive: FC = () => {
  const pool = { poolType: 'amm' };

  const [currentSelected, setCurrentSelected] = useState<SelectionFieldValues>(
    SelectionFieldValues.None
  );

  const handleSelection = (newSelection: SelectionFieldValues) =>
    setCurrentSelected(newSelection);

  return (
    <Box display="flex" flexDirection="column" gap="m">
      {pool?.poolType !== 'amm' && (
        <Typography variant="body" size="large">
          2. Choose type
        </Typography>
      )}
      <Box
        display="flex"
        borderRadius="xs"
        overflow="hidden"
        bg="lowestContainer"
        flexDirection="column"
      >
        {pool?.poolType !== 'amm' && (
          <Box display="flex" gap="xl" pb="m" px="xl">
            <PoolFormWithdrawReceiveType
              label="One Coin"
              currentValue={currentSelected}
              type={SelectionFieldValues.OneCoin}
              handleSelect={handleSelection}
            />
            <PoolFormWithdrawReceiveType
              label="Balance"
              currentValue={currentSelected}
              type={SelectionFieldValues.Balance}
              handleSelect={handleSelection}
            />
          </Box>
        )}
        {pool?.poolType !== 'amm' &&
        currentSelected != SelectionFieldValues.None ? (
          <PoolFormWithdrawReceiveTokens type={currentSelected} />
        ) : (
          <PoolFormWithdrawReceiveTokens type={SelectionFieldValues.Balance} />
        )}
      </Box>
    </Box>
  );
};

export default PoolFormWithdrawReceive;

import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import {
  SelectTokenFilterProps,
  TokenOrigin,
} from './select-token-modal.types';

const ORIGIN_TITLE = {
  [TokenOrigin.Coin]: 'Coin',
  [TokenOrigin.FA]: 'FA',
  [TokenOrigin.Wallet]: 'Wallet',
};

const SelectTokenFilter: FC<SelectTokenFilterProps> = ({
  control,
  isOutput,
  setValue,
}) => {
  const filterSelected = useWatch({ control, name: 'filter' });

  return (
    <Box
      mt="s"
      gap="s"
      display="grid"
      flexWrap="wrap"
      gridTemplateColumns={isOutput ? '1fr 1fr' : '1fr 1fr 1fr'}
    >
      {(isOutput
        ? [TokenOrigin.FA, TokenOrigin.Wallet]
        : [TokenOrigin.Coin, TokenOrigin.FA, TokenOrigin.Wallet]
      ).map((item) => (
        <Box
          key={v4()}
          cursor="pointer"
          onClick={() => setValue('filter', item)}
        >
          <Typography variant="body" size="medium" textAlign="center" py="m">
            {ORIGIN_TITLE[item]}
          </Typography>
          {filterSelected === item && (
            <Motion layout borderBottom="2px solid" borderColor="primary" />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SelectTokenFilter;

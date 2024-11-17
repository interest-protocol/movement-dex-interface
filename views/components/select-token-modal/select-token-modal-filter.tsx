import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import {
  SelectTokenFilterProps,
  TokenOrigin,
} from './select-token-modal.types';

const ORIGIN_TITLE = {
  [TokenOrigin.Strict]: 'Strict',
  [TokenOrigin.Wallet]: 'Wallet',
};

const SelectTokenFilter: FC<SelectTokenFilterProps> = ({
  control,
  setValue,
}) => {
  const filterSelected = useWatch({ control, name: 'filter' });

  return (
    <Box
      mt="s"
      gap="s"
      display="grid"
      flexWrap="wrap"
      gridTemplateColumns="1fr 1fr"
    >
      {[TokenOrigin.Strict, TokenOrigin.Wallet].map((item) => (
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

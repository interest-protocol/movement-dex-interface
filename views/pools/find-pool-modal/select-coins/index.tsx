import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { PlusSVG } from '@/components/svg';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

import { IPoolForm } from '../../pools.types';
import SelectToken from './select-token';

const SelectCoins: FC = () => {
  const { control } = useFormContext<IPoolForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tokenList',
    rules: { maxLength: 2 },
  });

  const onRemoveSelectToken = (index: number) => {
    remove(index);
  };

  return (
    <Box my="2xs" height="73%">
      <Box px="l" mx="auto" gap="2rem">
        <Typography variant="body" size="medium" color="onSurface">
          Select pool token
        </Typography>
        <Box display="grid" gap="s" my="s">
          {fields.slice(0, 5).map(({ id }, index) => (
            <SelectToken
              key={id}
              index={index}
              canRemove={fields.length > 2}
              handleRemoveSelectToken={onRemoveSelectToken}
            />
          ))}
        </Box>
        {fields.length < 2 && (
          <Button
            mt="xl"
            mx="auto"
            variant="outline"
            color="onSurface"
            borderRadius="xs"
            borderColor="outlineVariant"
            onClick={() =>
              append({
                name: '',
                type: '',
                symbol: '',
                value: '0',
                decimals: 0,
                locked: false,
                standard: TokenStandard.FA,
              })
            }
            PrefixIcon={
              <PlusSVG maxWidth="1rem" maxHeight="1rem" width="100%" />
            }
          >
            Add Coin
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SelectCoins;

import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { SwapForm } from '../swap.types';
import Balance from './balance';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import SelectToken from './select-token';

const FromInput: FC = () => {
  const { register, setValue, control } = useFormContext<SwapForm>();

  useWatch({ control, name: 'focus' });
  const swapping = useWatch({ control, name: 'swapping' });

  return (
    <>
      <HeaderInfo label="from" />
      <Box
        py="l"
        gap="0.5rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box display="flex" justifyContent="space-between" gap="xs">
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <TextField
              width="100%"
              lineHeight="l"
              placeholder="0"
              color="onSurface"
              disabled={swapping}
              fontFamily="Satoshi"
              fieldProps={{
                width: '100%',
                borderRadius: 'xs',
              }}
              {...register(`from.value`, {
                onChange: (v: ChangeEvent<HTMLInputElement>) => {
                  setValue('updateSlider', {});
                  const value = parseInputEventToNumberString(v);
                  setValue('lock', false);
                  setValue?.(`from.value`, value);
                },
              })}
            />
          </Box>
          <SelectToken label="from" />
        </Box>
        <Box display="flex" justifyContent="space-between" color="outline">
          <AmountInDollar label="from" />
          <Balance label="from" />
        </Box>
      </Box>
    </>
  );
};

export default FromInput;

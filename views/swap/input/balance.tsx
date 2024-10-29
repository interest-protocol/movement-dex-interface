import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import SubtractBox from '@/components/svg/subtract-box';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';

import { SwapForm } from '../swap.types';
import { InputProps } from './input.types';

const Balance: FC<InputProps> = ({ label }) => {
  const { coinsMap, loading } = useCoins();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  const type = useWatch({ control, name: `${label}.type` });
  const decimals = useWatch({ control, name: `${label}.decimals` });
  const symbol = useWatch({ control, name: `${label}.symbol` });

  if (!type)
    return (
      <Box
        p="2xs"
        gap="0.5rem"
        display="flex"
        color="outline"
        alignItems="center"
      >
        <Box width="1rem" height="1rem">
          <SubtractBox
            maxHeight="100%"
            maxWidth="100%"
            width="100%"
            height="100%"
          />
        </Box>
        <Typography size="small" variant="body" fontSize="s">
          0
        </Typography>
      </Box>
    );

  const balance = FixedPointMath.toNumber(
    coinsMap[type]?.balance ?? ZERO_BIG_NUMBER,
    coinsMap[type]?.metadata.decimals ?? decimals
  );

  const handleMax = () => {
    if (label === 'to') return;

    if (isAptos(type) && balance < 1) {
      setValue('from.value', '0');
      return;
    }

    if (getValues('focus')) setValue('focus', false);

    setValue('updateSlider', {});

    setValue('from.value', String(balance - (isAptos(type) ? 1 : 0)));
  };

  return (
    <Button
      p="2xs"
      gap="0.5rem"
      color="outline"
      variant="outline"
      alignItems="center"
      onClick={handleMax}
      borderColor="transparent"
      nHover={{ bg: 'unset', borderColor: 'primary' }}
    >
      <Box width="1rem" height="1rem">
        <SubtractBox
          maxHeight="100%"
          maxWidth="100%"
          width="100%"
          height="100%"
        />
      </Box>
      <Typography size="small" variant="body" fontSize="s">
        {symbol ? `${balance} ${symbol}` : '0'}
      </Typography>
      {loading && (
        <Box
          mx="xs"
          mt="-1.2rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box position="absolute" justifySelf="flex-end">
            <ProgressIndicator variant="loading" size={12} />
          </Box>
        </Box>
      )}
    </Button>
  );
};

export default Balance;

import { Box } from '@interest-protocol/ui-kit';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';

import { SwapForm } from '../../swap.types';

const Slider = dynamic(
  import('@interest-protocol/ui-kit').then(({ Slider }) => Slider),
  { ssr: false }
);

const SwapFormFieldSlider: FC = () => {
  const { coinsMap } = useCoins();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  useWatch({ control, name: 'updateSlider' });

  const type = useWatch({ control, name: 'from.type' });
  const swapping = useWatch({ control, name: 'swapping' });

  const safeRemoval =
    type && isAptos(type)
      ? FixedPointMath.toBigNumber(1, getValues('from.decimals'))
      : ZERO_BIG_NUMBER;

  const balance = coinsMap[type]
    ? coinsMap[type].balance.minus(safeRemoval)
    : ZERO_BIG_NUMBER;

  const fromValue = getValues('from.value') ?? ZERO_BIG_NUMBER;

  const initial =
    fromValue && balance && Number(fromValue) && !balance.isZero?.()
      ? balance.gt(
          FixedPointMath.toBigNumber(
            fromValue,
            coinsMap[type].metadata.decimals
          )
        )
        ? +FixedPointMath.toBigNumber(
            Number(fromValue) * 100,
            coinsMap[type].metadata.decimals
          )
            .div(balance)
            .toFixed(0)
        : 100
      : 0;

  return (
    <Box mx="s">
      <Slider
        min={0}
        max={100}
        initial={initial}
        disabled={!balance || balance.isZero?.() || swapping}
        onChange={(value: number) => {
          setValue(
            'from.value',
            String(
              FixedPointMath.toNumber(
                balance,
                coinsMap[type].metadata.decimals
              ) *
                (value / 100)
            )
          );
          if (getValues('lock')) setValue('lock', false);
          if (getValues('focus')) setValue('focus', false);
        }}
      />
    </Box>
  );
};

export default SwapFormFieldSlider;

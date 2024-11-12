import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import { COIN_TYPE_TO_FA } from '@/constants/coin-fa';
import { useInterestDex } from '@/hooks/use-interest-dex';
import { FixedPointMath } from '@/lib';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

import { SwapForm } from '../swap.types';
import { getPath } from '../swap.utils';
import { SwapMessages } from './swap-messages';

const SwapManager: FC = () => {
  const dex = useInterestDex();
  const { control, setValue, getValues } = useFormContext<SwapForm>();

  const origin = useWatch({ control, name: 'origin' });
  const [fromValue] = useDebounce(
    useWatch({ control, name: 'from.value' }),
    800
  );
  const [toValue] = useDebounce(useWatch({ control, name: 'to.value' }), 800);

  useEffect(() => {
    setValue('error', null);

    if (!Number(fromValue)) {
      setValue(`${origin === 'from' ? 'to' : 'from'}.value`, '0');
      return;
    }

    if (!getValues(`${origin === 'from' ? 'to' : 'from'}.symbol`)) return;

    const to = getValues('to');
    const from = getValues('from');

    const tokenIn = (
      from.standard === TokenStandard.COIN
        ? COIN_TYPE_TO_FA[from.type]
        : from.type
    ).toString();
    const tokenOut = (
      to.standard === TokenStandard.COIN ? COIN_TYPE_TO_FA[to.type] : to.type
    ).toString();

    const path = getPath(tokenIn, tokenOut).map((address) =>
      address.toString()
    );

    const amount = BigInt(
      FixedPointMath.toBigNumber(
        origin == 'from' ? fromValue : toValue,
        origin == 'from' ? from.decimals : to.decimals
      ).toFixed(0)
    );

    console.log(origin, '>>>origin');
    origin === 'from'
      ? dex
          .quotePathAmountOut({
            path,
            amount,
          })
          .then(({ amountOut }) => {
            setValue('path', path);
            const tmp = String(
              FixedPointMath.toNumber(
                BigNumber(amountOut!.toString()),
                to.decimals
              )
            );
            if (tmp == '0') setValue('error', 'No Market');
            else
              setValue(
                'to.value',
                String(
                  FixedPointMath.toNumber(
                    BigNumber(amountOut!.toString()),
                    to.decimals
                  )
                )
              );
          })
          .catch((e) => {
            console.warn(e);
          })
      : dex
          .quotePathAmountIn({
            path,
            amount,
          })
          .then(({ amountIn }) => {
            setValue('path', path);
            setValue(
              'from.value',
              String(
                FixedPointMath.toNumber(
                  BigNumber(amountIn!.toString()),
                  from.decimals
                )
              )
            );
          })
          .catch((e) => {
            console.warn(e);
          });
  }, [fromValue, toValue]);

  return (
    <>
      <SwapMessages control={control} />
    </>
  );
};

export default SwapManager;

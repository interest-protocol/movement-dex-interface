import BigNumber from 'bignumber.js';
import { propOr } from 'ramda';
import { FC } from 'react';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';

import { SwapMessagesEnum } from '../swap.data';
import { SwapForm, SwapMessagesProps } from '../swap.types';

export const SwapErrorManager: FC<SwapMessagesProps> = ({ hasNoMarket }) => {
  const { control, setValue } = useFormContext<SwapForm>();
  const { coinsMap } = useCoins();
  const to = useWatch({ control: control, name: 'to' });
  const from = useWatch({ control: control, name: 'from' });
  const swapping = useWatch({ control: control, name: 'swapping' });
  const error = useWatch({ control: control, name: 'error' });

  useEffect(() => {
    const fromValue = +(propOr('0', 'value', from) as string);

    const isGreaterThanBalance = FixedPointMath.toBigNumber(
      from?.value ?? '0',
      from?.decimals ?? 0
    )
      .decimalPlaces(0, BigNumber.ROUND_DOWN)
      .gt(
        from && coinsMap[from.type]
          ? BigNumber(coinsMap[from.type].balance)
          : ZERO_BIG_NUMBER
      );

    const hasAtLeastOneMove =
      isAptos(from.type) &&
      FixedPointMath.toNumber(
        coinsMap[from.type]?.balance.minus(BigNumber(100000000)) ??
          ZERO_BIG_NUMBER,
        from.decimals
      ) < Number(fromValue);

    if (!from?.value || !to?.value) return;

    if (swapping) return;

    if (hasNoMarket) {
      setValue('error', String(SwapMessagesEnum.noMarket));
      return;
    }

    if (from?.type == to?.type) {
      setValue('error', String(SwapMessagesEnum.sameCoin));
      return;
    }

    if (hasAtLeastOneMove) {
      setValue('error', String(SwapMessagesEnum.leastOneMove));
      return;
    }

    if (isGreaterThanBalance) {
      setValue('error', String(SwapMessagesEnum.notEnoughToken));
      return;
    }

    setValue('error', null);
  }, [error, from, to, hasNoMarket]);

  return null;
};

import { Typography } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { formatDollars } from '@/utils';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

const TokenInputDollar: FC = () => {
  const { control } = useFormContext<ICreateTokenForm>();

  const value = useWatch({ control, name: 'pool.tokenValue' });
  const quoteValue = useWatch({ control, name: 'pool.quoteValue' });
  const quoteUsdPrice = useWatch({ control, name: 'pool.quoteUsdPrice' });

  const usdPrice = (Number(quoteValue) * Number(quoteUsdPrice)) / Number(value);

  const usdValue =
    usdPrice && value
      ? formatDollars(+BigNumber(value).times(usdPrice).toNumber().toFixed(3))
      : '--';

  return (
    <Typography
      size="small"
      variant="label"
      textAlign="right"
      color="onSurface"
    >
      {usdValue} USD
    </Typography>
  );
};

export default TokenInputDollar;

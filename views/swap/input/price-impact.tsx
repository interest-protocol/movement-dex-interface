import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const PriceImpact: FC = () => {
  const { control } = useFormContext();

  const toValue = useWatch({ control, name: 'to.value' });
  const fromValue = useWatch({ control, name: 'from.value' });
  const toUSDPrice = useWatch({ control, name: 'to.usdPrice' });
  const fromUSDPrice = useWatch({ control, name: 'from.usdPrice' });

  const toUSD = toUSDPrice ? +toValue * toUSDPrice : null;
  const fromUSD = fromUSDPrice ? +fromValue * fromUSDPrice : null;
  const differenceBetween = fromUSD && toUSD ? fromUSD - toUSD : null;
  const priceImpact =
    differenceBetween && fromUSD ? (differenceBetween * 100) / fromUSD : null;

  if (!priceImpact) return null;

  const STATUS =
    priceImpact < 1 ? 'success' : priceImpact < 5 ? 'warning' : 'error';

  return (
    <Typography
      px="xs"
      py="2xs"
      bg={STATUS}
      fontSize="s"
      size="small"
      variant="label"
      borderRadius="full"
      color="lowestContainer"
    >
      {priceImpact
        ? `${priceImpact > 0.1 ? priceImpact.toFixed(2) : '< 0.1'}%`
        : '--'}
    </Typography>
  );
};

export default PriceImpact;

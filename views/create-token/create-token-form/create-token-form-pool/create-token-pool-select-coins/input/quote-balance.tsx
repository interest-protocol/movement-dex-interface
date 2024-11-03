import {
  Box,
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CoinMetadata, FAMetadata } from '@/interface';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

const QuoteBalance: FC = () => {
  const { coinsMap, loading } = useCoins();
  const { control, setValue } = useFormContext<ICreateTokenForm>();

  const quote = useWatch({ control, name: 'pool.quote' });

  const id =
    (quote as CoinMetadata)?.type ?? (quote as FAMetadata)?.address.toString();

  if (!quote || !id)
    return (
      <Box
        p="2xs"
        gap="0.5rem"
        display="flex"
        color="onSurface"
        alignItems="center"
      >
        <Typography size="small" variant="body" fontSize="xs">
          Balance: 0
        </Typography>
      </Box>
    );

  const balance = FixedPointMath.toNumber(
    coinsMap[id]?.balance ?? ZERO_BIG_NUMBER,
    coinsMap[id]?.metadata.decimals ?? quote.decimals
  );

  const handleMax = () => {
    if (isAptos(id) && balance < 1) {
      setValue('pool.quoteValue', '0');
      return;
    }

    setValue('pool.quoteValue', String(balance - (isAptos(id) ? 1 : 0)));
  };

  return (
    <Button
      p="2xs"
      gap="0.5rem"
      display="flex"
      color="onSurface"
      variant="outline"
      alignItems="center"
      onClick={handleMax}
      borderColor="transparent"
      nHover={{ bg: 'unset', borderColor: 'primary' }}
      className="loading-balance"
    >
      <Typography size="small" variant="body" fontSize="xs">
        Balance: {quote.symbol ? `${balance}` : '--'}
      </Typography>
      {loading && <ProgressIndicator variant="loading" size={12} />}
    </Button>
  );
};

export default QuoteBalance;

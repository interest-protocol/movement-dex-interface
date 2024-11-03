import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CoinMetadata, FAMetadata } from '@/interface';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

const InputQuoteMaxButton: FC = () => {
  const { coinsMap } = useCoins();
  const { control, setValue } = useFormContext<ICreateTokenForm>();

  const quote = useWatch({ control, name: `pool.quote` });

  const id =
    (quote as CoinMetadata)?.type ?? (quote as FAMetadata)?.address.toString();

  const balance = FixedPointMath.toNumber(
    coinsMap[id]?.balance ?? ZERO_BIG_NUMBER,
    coinsMap[id]?.metadata.decimals ?? quote?.decimals
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
      px="xs"
      py="2xs"
      fontSize="xs"
      variant="outline"
      borderRadius="2xs"
      color="onSurface"
      onClick={handleMax}
      disabled={!quote?.symbol}
    >
      MAX
    </Button>
  );
};

export default InputQuoteMaxButton;

import { FA_ADDRESSES, Network } from '@interest-protocol/aptos-sr-amm';
import { Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { ZERO_BIG_NUMBER } from '@/utils';
import { ICreateTokenForm } from '@/views/create-token/create-token.types';

const InputQuoteMaxButton: FC = () => {
  const { coinsMap } = useCoins();
  const { setValue } = useFormContext<ICreateTokenForm>();

  const type = FA_ADDRESSES[Network.Porto].APT.toString();

  const balance = FixedPointMath.toNumber(
    coinsMap[type]?.balance ?? ZERO_BIG_NUMBER
  );

  const handleMax = () => {
    if (balance < 1) {
      setValue('pool.quoteValue', '0');
      return;
    }

    setValue('pool.quoteValue', String(balance - 1));
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
    >
      MAX
    </Button>
  );
};

export default InputQuoteMaxButton;

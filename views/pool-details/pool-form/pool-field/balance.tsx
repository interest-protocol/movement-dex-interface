import {
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { NameProps } from './pool-field.types';

const Balance: FC<NameProps> = ({ name }) => {
  const { coinsMap, loading } = useCoins();
  const { setValue, control } = useFormContext<IPoolForm>();

  const token = useWatch({ control, name });

  const balance = FixedPointMath.toNumber(
    coinsMap[token.type]?.balance ?? ZERO_BIG_NUMBER,
    token.decimals
  );

  const handleMax = () => {
    setValue(`lpCoin.locked`, false);
    setValue(`tokenList.0.locked`, false);
    setValue(`tokenList.1.locked`, false);
    setValue(`${name}.locked`, true);

    if (isAptos(token.type) && balance < 1) {
      setValue(`${name}.value`, '0');
      return;
    }

    setValue(`${name}.value`, String(balance - (isAptos(token.type) ? 1 : 0)));
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
        Balance: {balance ?? '--'}
      </Typography>
      {loading && <ProgressIndicator variant="loading" size={12} />}
    </Button>
  );
};

export default Balance;

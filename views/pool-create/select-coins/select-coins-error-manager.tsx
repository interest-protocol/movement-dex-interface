import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import pool from '@/components/svg/pool';

import { CreatePoolForm } from '../pool-create.types';

const SelectCoinsErrorManager: FC = () => {
  const { control, setValue } = useFormContext<CreatePoolForm>();

  const tokenList = useWatch({ control, name: 'tokens' });

  useEffect(() => {
    if (tokenList.length) {
      if (!tokenList?.length || !pool) return;

      setValue('error', '');
    }
  }, [tokenList]);

  return null;
};

export default SelectCoinsErrorManager;

import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ICreateTokenForm } from '../create-token.types';

const CreateTokenFormPool: FC = () => {
  const { control } = useFormContext<ICreateTokenForm>();
  const symbol = useWatch({ control, name: 'symbol' });
  const supply = useWatch({ control, name: 'supply' });
  const imageURL = useWatch({ control, name: 'imageUrl' });

  console.log({ symbol, supply, imageURL });

  return null;
};

export default CreateTokenFormPool;

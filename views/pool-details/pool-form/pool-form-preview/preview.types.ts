import { UseFormGetValues } from 'react-hook-form';
import { SWRResponse } from 'swr';

import { IPoolForm } from '@/views/pools/pools.types';

export interface FieldProps {
  getValues: UseFormGetValues<IPoolForm>;
}

export interface PoolPreviewWrapperHeaderProps {
  isDeposit?: boolean;
}

export interface PoolPreviewProps
  extends PoolPreviewWrapperHeaderProps,
    FieldProps {
  onSubmit: () => void;
}

export interface PoolPreviewWrapperProps extends PoolPreviewProps {
  fees?: SWRResponse<Array<number> | undefined>;
}

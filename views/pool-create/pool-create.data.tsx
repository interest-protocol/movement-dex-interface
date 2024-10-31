import { ReactNode } from 'react';
import { v4 } from 'uuid';

import PoolSummary from './pool-summary';
import SelectCoins from './select-coins';

export const stepTitle: ReadonlyArray<ReactNode> = [
  `Select your coin and \n initial Deposit`,
  `Select your coin and \ninitial Deposit`,
];

export const stepContent: ReadonlyArray<ReactNode> = [
  <SelectCoins key={v4()} />,
  <PoolSummary key={v4()} />,
];

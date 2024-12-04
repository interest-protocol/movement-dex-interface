import { FormFilterValue } from '../components/info-card/info-card.types';
import { FilterTypeEnum } from './earn.types';

export const LINES = [
  {
    description: 'Fee',
    tooltipInfo: 'Trade fee in percentage',
  },
  {
    description: 'Bid Liquidity',
    tooltipInfo: 'Liquidity',
  },
  {
    description: 'Volume 24h',
    tooltipInfo: 'Volume',
  },
  {
    description: 'Allocation Farm',
    tooltipInfo: 'Farm',
  },
];

export const CATEGORY = [
  {
    type: FilterTypeEnum.CATEGORY,
    value: FormFilterValue.official,
  },
  {
    type: FilterTypeEnum.CATEGORY,
    value: FormFilterValue.all,
  },
];

export const FILTERS_DATA = [
  {
    label: 'Category',
    data: CATEGORY,
    type: FilterTypeEnum.CATEGORY,
  },
];

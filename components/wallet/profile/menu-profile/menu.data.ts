import {
  ActivitySVG,
  AssetsSVG,
  AUDSVG,
  BRLSVG,
  CADSVG,
  CNYSVG,
  EURSVG,
  GBLSVG,
  INRSVG,
  JPYSVG,
  LinkSVG,
  LogoutSVG,
  USDSVG,
} from '@/components/svg';

import {
  CurrenciesMenuItemProps,
  ProfileMenuItemProps,
} from '../profile.types';
import { ProfileTabItemProps, ProfileTabsMenuEnum } from './user-info.types';

export const MENU_PROFILE_DATA: ReadonlyArray<ProfileMenuItemProps> = [
  {
    name: 'activity',
    description: 'activity',
    Icon: ActivitySVG,
    hasBorder: false,
    disabled: true,
  },
  {
    name: 'assets',
    description: 'assets',
    Icon: AssetsSVG,
    hasBorder: false,
    disabled: true,
  },
  {
    name: 'viewInExplorer',
    description: 'View in explorer',
    Icon: LinkSVG,
    hasBorder: false,
    disabled: false,
  },
  {
    name: 'disconnect',
    description: 'disconnect',
    Icon: LogoutSVG,
    hasBorder: true,
    disabled: false,
  },
];

export const SUGGESTED_CURRENCY_DATA: ReadonlyArray<CurrenciesMenuItemProps> = [
  {
    name: 'euro',
    symbol: 'EUR',
    Icon: EURSVG,
  },
  {
    name: 'dollar',
    symbol: 'USD',
    Icon: USDSVG,
  },
];

export const ALL_CURRENCIES_DATA: ReadonlyArray<CurrenciesMenuItemProps> = [
  {
    name: 'australian Dollar',
    symbol: 'AUD',
    Icon: AUDSVG,
  },
  {
    name: 'real',
    symbol: 'BRL',
    Icon: BRLSVG,
  },
  {
    name: 'Canadian Dollar',
    symbol: 'CAD',
    Icon: CADSVG,
  },
  {
    name: 'Yuan',
    symbol: 'CNY',
    Icon: CNYSVG,
  },
  {
    name: 'libra',
    symbol: 'GBP',
    Icon: GBLSVG,
  },
  {
    name: 'indian Rupee',
    symbol: 'INR',
    Icon: INRSVG,
  },
  {
    name: 'japanese Yen',
    symbol: 'JPY',
    Icon: JPYSVG,
  },
];

export const PROFILE_TAB: ReadonlyArray<ProfileTabItemProps> = [
  {
    name: 'coin',
    value: ProfileTabsMenuEnum.coin,
  },
];

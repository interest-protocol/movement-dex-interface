import { ActivitySVG, AssetsSVG, LinkSVG, LogoutSVG } from '@/components/svg';

import { ProfileMenuItemProps } from '../profile.types';
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

export const PROFILE_TAB: ReadonlyArray<ProfileTabItemProps> = [
  {
    name: 'coin',
    value: ProfileTabsMenuEnum.coin,
  },
  {
    name: 'nfa',
    value: ProfileTabsMenuEnum.nfa,
  },
];

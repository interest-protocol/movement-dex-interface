import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface UserInfoProps {
  handleSettings: () => void;
}

export interface SettingMenuProps {
  handleToggleProfile: () => void;
  handleCurrency: () => void;
}

export interface MenuCurrencyProps {
  handleBack: () => void;
}

export enum ProfileTabsMenuEnum {
  coin,
  nfa,
}

export interface ProfileTabItemProps {
  name: string;
  value: ProfileTabsMenuEnum;
}

export interface CoinCardProps {
  Icon: FC<SVGProps>;
  coin: string;
  balance: string;
  usdPrice: number;
  percentage: number;
}

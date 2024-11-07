import { ReactNode } from 'react';

import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

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

export interface VerifiedCoinCardProps extends UnverifiedCoinCardProps {
  apy: number;
}

export interface UnverifiedCoinCardProps {
  token: AssetMetadata;
}

export interface CardWrapperProps {
  symbol: string;
  TokenIcon: ReactNode;
  supportingText: string;
}

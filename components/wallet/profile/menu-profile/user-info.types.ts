export interface UserInfoProps {
  handleSettings: () => void;
}

export interface SettingMenuProps {
  isProfileOpen?: boolean;
  handleToggleProfile: () => void;
  handleCurrency: () => void;
}

export interface MenuCurrencyProps {
  handleBack: () => void;
}

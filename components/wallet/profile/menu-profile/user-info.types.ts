export interface UserInfoProps {
  handleSettings: () => void;
}

export interface SettingMenuProps {
  handleToggleProfile: () => void;
}

export enum ProfileTabsMenuEnum {
  coin,
  nfa,
}

export interface ProfileTabItemProps {
  name: string;
  value: ProfileTabsMenuEnum;
}

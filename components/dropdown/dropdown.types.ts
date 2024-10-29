export interface FilterItemProps {
  label: string;
  value: string;
}
export interface DropdownProps {
  menuItems: string[];
  defaultValue: string | number;
  onSelect: (value: string) => void;
}

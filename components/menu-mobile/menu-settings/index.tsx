import { not } from 'ramda';
import { FC, useState } from 'react';

import MenuSettingsListHeaderMobile from './header';

const MenuSettingsList: FC = () => {
  const [toggle, setToggle] = useState(false);

  const closeDropdownSettingsMenu = () => setToggle(not);

  return (
    <>
      <MenuSettingsListHeaderMobile
        isOpen={toggle}
        handleButton={closeDropdownSettingsMenu}
      />
    </>
  );
};

export default MenuSettingsList;

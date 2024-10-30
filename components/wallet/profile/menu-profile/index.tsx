//import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Box, Motion } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useState } from 'react';

import { wrapperVariants } from '@/constants/wrapper-variants';
import { useIsFirstRender } from '@/hooks';

import MenuButton from '../../menu-button';
import { MenuProfileProps } from '../profile.types';
import HomeProfile from './home-profile';
import SettingProfile from './setting-profile';
import UserInfo from './user-info';

const MenuProfile: FC<MenuProfileProps> = ({ isOpen, handleCloseProfile }) => {
  //const network = useNetwork<Network>();
  const firstRender = useIsFirstRender();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleToggleProfile = () => setIsSettingsOpen(not);

  const handleSettings = () => {
    setIsSettingsOpen(true);
  };

  return (
    <Motion
      right="0"
      zIndex={1}
      bg="container"
      display="flex"
      borderRadius="2xs"
      border="1px"
      borderStyle="solid"
      borderColor="outline"
      overflow="hidden"
      flexDirection="column"
      variants={wrapperVariants}
      textTransform="capitalize"
      top={['0', '0', '0', '3rem']}
      justifyContent="space-between"
      p={['xl', 'xl', 'xl', 'unset']}
      animate={isOpen ? 'open' : 'closed'}
      pb={['7rem', '7rem', '7rem', 'unset']}
      pointerEvents={isOpen ? 'auto' : 'none'}
      height={['100vh', '100vh', '100vh', '85vh']}
      width={['100vw', '100vw', '100vw', '26.875rem']}
      position={['fixed', 'fixed', 'fixed', 'absolute']}
      initial={isOpen || firstRender ? 'closed' : 'open'}
      color="onSurface"
    >
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Box
          pb="l"
          flexDirection="row-reverse"
          display={['flex', 'flex', 'flex', 'none']}
        >
          <MenuButton handleClose={handleCloseProfile} />
        </Box>
        <UserInfo handleSettings={handleSettings} />
        {isSettingsOpen ? (
          <SettingProfile
            isProfileOpen={isProfileOpen}
            handleToggleProfile={handleToggleProfile}
          />
        ) : (
          <HomeProfile />
        )}
      </Box>
    </Motion>
  );
};

export default MenuProfile;

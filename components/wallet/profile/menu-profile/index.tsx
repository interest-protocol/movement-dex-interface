import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Motion, Theme, useTheme } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { EXPLORER_URL } from '@/constants';
import { wrapperVariants } from '@/constants/wrapper-variants';
import { useIsFirstRender } from '@/hooks';
import useEventListener from '@/hooks/use-event-listener';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';

import MenuButton from '../../menu-button';
import { MenuProfileProps } from '../profile.types';
import { MENU_PROFILE_DATA } from './menu.data';
import MenuProfileItem from './profile-item';
import UserInfo from './user-info';

const MenuProfile: FC<MenuProfileProps> = ({ isOpen, handleCloseProfile }) => {
  const network = useNetwork<Network>();
  const firstRender = useIsFirstRender();
  const { breakpoints } = useTheme() as Theme;
  const [isDesktop, setIsDesktop] = useState(false);
  const { account: currentAccount, disconnect } = useWallet();

  const account = currentAccount?.address || '';

  const handleAction: Record<string, () => void | Promise<void>> = {
    disconnect: () => {
      handleCloseProfile();
      disconnect();
    },
    viewInExplorer: () => {
      window.open(`${EXPLORER_URL[network](`account/${account}`)}`, '_blank');
    },
  };

  const handleSetDesktopView = () =>
    setIsDesktop(window.matchMedia(`(min-width: ${breakpoints[2]})`).matches);

  useEventListener('resize', handleSetDesktopView, true);

  return (
    <Motion
      right="0"
      zIndex={1}
      bg="container"
      display="flex"
      borderRadius="s"
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
      height={['100vh', '100vh', '100vh', 'unset']}
      width={['100vw', '100vw', '100vw', '14.5rem']}
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
        <UserInfo />
        {MENU_PROFILE_DATA.slice(0, !isDesktop ? -1 : undefined).map(
          (profileItem) => (
            <MenuProfileItem
              {...profileItem}
              handleAction={handleAction}
              key={v4()}
            />
          )
        )}
      </Box>
      {!isDesktop &&
        MENU_PROFILE_DATA.slice(-1).map((profileItem) => (
          <MenuProfileItem
            {...profileItem}
            handleAction={handleAction}
            key={v4()}
          />
        ))}
    </Motion>
  );
};

export default MenuProfile;

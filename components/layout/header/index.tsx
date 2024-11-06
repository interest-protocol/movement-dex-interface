import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC, useCallback, useState } from 'react';
import { v4 } from 'uuid';

import MenuMobile from '@/components/menu-mobile';
import Wallet from '@/components/wallet';
import useEventListener from '@/hooks/use-event-listener';

import LogoWrapper from './logo-wrapper';
import { MENU_ITEMS } from './menu.data';

const Header: FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleSetDesktop = useCallback(() => {
    const mediaIsMobile = !window.matchMedia('(min-width: 65em)').matches;
    setIsMobile(mediaIsMobile);
  }, []);

  useEventListener('resize', handleSetDesktop, true);
  return (
    <Box
      display="flex"
      alignItems="center"
      py={isMobile ? '' : 's'}
      px={isMobile ? '' : '2xl'}
      justifyContent="space-between"
    >
      <LogoWrapper />
      {!isMobile && (
        <Box
          display="flex"
          gap="2xl"
          justifyContent="center"
          alignItems="center"
        >
          {MENU_ITEMS.map(({ name, path }) => {
            return (
              <Link
                key={v4()}
                href={path}
                target="_self"
                style={{
                  cursor: 'pointer',
                }}
              >
                <Typography
                  size="large"
                  variant="label"
                  color="onSurface"
                  nHover={{
                    opacity: 0.7,
                  }}
                >
                  {name}
                </Typography>
              </Link>
            );
          })}
        </Box>
      )}
      <Box
        top="0"
        gap="xs"
        left="0"
        right="0"
        zIndex="1"
        position="relative"
        alignItems="center"
        justifyContent="flex-end"
        gridTemplateColumns="1fr 1fr"
        display={['none', 'none', 'none', 'flex']}
      >
        <Wallet />
      </Box>
      <Box
        py="m"
        top="0"
        gap="xs"
        zIndex={3}
        position="relative"
        alignItems="center"
        px={['m', 'l', 'l', 'xl']}
        gridTemplateColumns="1fr 1fr 1fr"
        display={['flex', 'flex', 'flex', 'none']}
        boxShadow="0 1.5rem 2.875rem -0.625rem rgba(13, 16, 23, 0.16)"
      >
        <Wallet />
        <MenuMobile />
      </Box>
    </Box>
  );
};

export default Header;

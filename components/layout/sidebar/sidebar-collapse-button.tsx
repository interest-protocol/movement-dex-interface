import { Box, Motion, Theme, useTheme } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { ChevronLeftSVG } from '@/components/svg';
import { LOCAL_STORAGE_VERSION } from '@/constants';

import { SidebarCollapseButtonProps } from './sidebar.types';

const SidebarCollapseButton: FC<SidebarCollapseButtonProps> = ({
  isCollapsed,
  setIsCollapsed,
}) => {
  const { colors } = useTheme() as Theme;

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);

    window.localStorage.setItem(
      `${LOCAL_STORAGE_VERSION}-movement-menu-collapse`,
      String(!isCollapsed)
    );
  };

  return (
    <Motion
      my="s"
      gap="m"
      mx="2xs"
      display="flex"
      transition={{ duration: 0.5 }}
      animation={isCollapsed ? 'collapsed' : 'unCollapsed'}
      variants={{
        collapsed: { width: '2.5rem' },
        unCollapsed: { width: '100%' },
      }}
    >
      <Box
        display="flex"
        minWidth="2.5rem"
        minHeight="2.5rem"
        cursor="pointer"
        borderRadius="xs"
        color="onSurface"
        border="1px solid"
        position="relative"
        alignItems="center"
        justifyContent="center"
        onClick={handleCollapse}
        borderColor="outlineVariant"
        nHover={{
          transition: 'all 300ms ease-in-out',
          backgroundColor: `${colors.primary}14`,
        }}
      >
        <Motion
          display="flex"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          transform={!isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'}
        >
          <ChevronLeftSVG
            width="100%"
            height="100%"
            maxWidth="0.625rem"
            maxHeight="0.625rem"
          />
        </Motion>
      </Box>
    </Motion>
  );
};

export default SidebarCollapseButton;

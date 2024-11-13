import { Box } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';

import { LogoSVG } from '@/components/svg';
import { Routes, RoutesEnum } from '@/constants';

const LogoWrapper: FC = () => (
  <Box>
    <Link href={Routes[RoutesEnum.Swap]}>
      <Box
        display="flex"
        color="onSurface"
        width="12.5rem"
        height="4.125rem"
        alignItems="center"
        justifyContent="center"
      >
        <LogoSVG width="100%" maxWidth="100%" maxHeight="100%" />
      </Box>
    </Link>
  </Box>
);

export default LogoWrapper;

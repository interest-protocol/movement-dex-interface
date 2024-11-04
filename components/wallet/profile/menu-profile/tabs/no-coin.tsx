import { Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { CoinSVG } from '@/components/svg';

const NoCoin: FC = () => {
  return (
    <>
      <CoinSVG
        width="6.765rem"
        height="7.476rem"
        maxHeight="100%"
        maxWidth="100%"
      />
      <Typography size="medium" variant="label">
        No coins yet
      </Typography>
      <Typography
        size="small"
        opacity="0.7"
        variant="label"
        color="onSurface"
        textAlign="center"
      >
        Buy or transfer coins to this wallet to get started.
      </Typography>
    </>
  );
};

export default NoCoin;

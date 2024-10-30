import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { CoinSVG } from '@/components/svg';

import BalanceCard from '../balance-card';

const HomeProfile: FC = () => {
  const [tabItem, setTabItem] = useState('Coin');
  const selectTabs = (item: string) => {
    setTabItem(item);
  };
  return (
    <>
      <BalanceCard />
      <Box display="flex" gap="xs" p="xl"></Box>
      <Box
        my="m"
        px="xl"
        gap="xs"
        width="100%"
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        {['Coin', 'NFT', 'NFA'].map((item) => (
          <Box
            key={v4()}
            p="0.5rem"
            mr="0.1rem"
            cursor="pointer"
            onClick={() => selectTabs(item)}
          >
            <Typography
              size="small"
              variant="label"
              color={tabItem === item ? 'onSurface' : ''}
              opacity={tabItem !== item ? '0.7' : 1}
            >
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
      {tabItem === 'Coin' ? (
        <Box
          p="l"
          gap="s"
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
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
        </Box>
      ) : tabItem === 'NFT' ? (
        <Box
          p="l"
          gap="s"
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography size="medium" variant="label">
            No NFTs yet
          </Typography>
          <Typography
            size="small"
            opacity="0.7"
            variant="label"
            color="onSurface"
            textAlign="center"
          >
            Buy or transfer NFTs to this wallet to get started.
          </Typography>
        </Box>
      ) : (
        <Box
          p="l"
          gap="s"
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography size="medium" variant="label">
            No NFA yet
          </Typography>
          <Typography
            size="small"
            opacity="0.7"
            variant="label"
            color="onSurface"
            textAlign="center"
          >
            Buy or transfer NFA to this wallet to get started.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default HomeProfile;

import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import BalanceCard from '../balance-card';
import { PROFILE_TAB } from './menu.data';
import CoinSection from './tabs/coin-section';
import NFASection from './tabs/nfa-section';
import { ProfileTabsMenuEnum } from './user-info.types';

const HomeProfile: FC = () => {
  const [tabItem, setTabItem] = useState<ProfileTabsMenuEnum>(
    ProfileTabsMenuEnum.coin
  );
  const selectTabs = (item: ProfileTabsMenuEnum) => {
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
        {PROFILE_TAB.map((tab) => (
          <Box
            key={v4()}
            p="0.5rem"
            mr="0.1rem"
            cursor="pointer"
            onClick={() => selectTabs(tab.value)}
          >
            <Typography
              size="small"
              variant="label"
              color={tabItem === tab.value ? 'onSurface' : ''}
              opacity={tabItem !== tab.value ? '0.7' : 1}
            >
              {tab.name}
            </Typography>
          </Box>
        ))}
      </Box>
      {tabItem == ProfileTabsMenuEnum.coin ? <CoinSection /> : <NFASection />}
    </>
  );
};

export default HomeProfile;

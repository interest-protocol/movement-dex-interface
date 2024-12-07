import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { TOKENS } from '@/constants/coin-fa';
import { AssetMetadata } from '@/lib/coins-manager/coins-manager.types';

import FarmFilter from '../components/farm-filter';
import InfoCard from '../components/info-card';
import { FormFilterValue } from '../components/info-card/info-card.types';
import { FILTERS_DATA, LINES } from './earn.data';
import { EarnTabEnum } from './earn.types';
import Header from './header';

const Earn: FC = () => {
  const [tab, setTab] = useState<EarnTabEnum>(EarnTabEnum.Earn);
  return (
    <Layout>
      <Box py="xl">
        <Header setTab={setTab} currentTab={tab} />
      </Box>
      <Box
        px="s"
        gap="2xs"
        display="flex"
        bg="container"
        maxWidth="100%"
        maxHeight="100%"
        borderRadius="xs"
        minHeight="30rem"
        color="onSurface"
        flexDirection="column"
        py={['s', 's', 's', '2xl']}
      >
        <FarmFilter filterData={FILTERS_DATA} />
        <Box
          gap="xs"
          borderRadius="xs"
          p={['s', 's', 's', 'l']}
          display={'grid'}
          gridTemplateColumns={[
            '1fr',
            '1fr',
            '1fr 1fr',
            '1fr 1fr',
            '1fr 1fr 1fr',
          ]}
        >
          {[1, 2, 3].map((index) => {
            return (
              <InfoCard
                key={v4()}
                lines={LINES}
                tags={['FARM', FormFilterValue['volatile']]}
                listCoins={[
                  TOKENS[0] as AssetMetadata,
                  TOKENS[1] as AssetMetadata,
                ]}
                link={`${Routes[RoutesEnum.EarnDetails]}?address=${index}`}
                infoData={['0.3%', `N/A`, `N/A`, `N/A`]}
              />
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export default Earn;

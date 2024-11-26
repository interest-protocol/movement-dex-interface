import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { DefaultTokenSVG } from '@/components/svg';

import { EarnLabelEnum, EarnTabEnum } from './earn.types';
import EarnCard from './earn-card';
import EarnCardWrapper from './earn-card-wrapper';
import EarnFilter from './earn-filter';
import Header from './header';

const Earn: FC = () => {
  const [tab, setTab] = useState<EarnTabEnum>(EarnTabEnum.Earn);
  const [label, setLabel] = useState<EarnLabelEnum>(EarnLabelEnum.staked);

  console.log('SetLabel >>', setLabel);

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
        <EarnFilter />
        <Typography variant="title" size="large" p="m">
          {tab == EarnTabEnum.Earn ? 'Earn' : 'My Position'}
        </Typography>
        <EarnCardWrapper>
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <EarnCard
                label={label}
                tokenName="LP token"
                key={v4()}
                balance={item}
                TokenIcon={DefaultTokenSVG}
                earnAmount={12.00009}
              />
            );
          })}
        </EarnCardWrapper>
      </Box>
    </Layout>
  );
};

export default Earn;

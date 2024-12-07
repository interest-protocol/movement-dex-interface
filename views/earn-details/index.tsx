import { Box, Button } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import { TOKENS } from '@/constants/coin-fa';
import { parseToMetadata } from '@/utils';
import { MetadataSources } from '@/utils/coin/coin.types';
import EarnTitleBar from '@/views/components/earn-title-bar';

import EarnCard from './earn-details-card';

const EarnDetails = () => {
  const { push } = useRouter();
  const loading = false;
  return (
    <Layout>
      <EarnTitleBar
        loading={loading}
        onBack={() => push(Routes[RoutesEnum.Earn])}
      />
      <Box
        gap="xs"
        display="grid"
        borderRadius="xs"
        py={['s', 's', 's', 'l']}
        gridTemplateColumns={[
          '1fr',
          '1fr',
          '1fr 1fr',
          '1fr 1fr 1fr',
          '1fr 1fr 1fr',
        ]}
      >
        <EarnCard
          key={v4()}
          token={parseToMetadata(TOKENS[0] as MetadataSources)}
          label="Staked"
          secondaryButton={
            <Button
              color="primary"
              variant="outline"
              borderRadius="2xs"
              borderStyle="1px solid"
              borderColor="outlineVariant"
            >
              Reset
            </Button>
          }
          primaryButton={
            <Button borderRadius="2xs" variant="filled">
              Add
            </Button>
          }
        />
        <EarnCard
          key={v4()}
          token={parseToMetadata(TOKENS[0] as MetadataSources)}
          label="Unstaked"
          secondaryButton={
            <Button
              color="primary"
              variant="outline"
              borderRadius="2xs"
              borderStyle="1px solid"
              borderColor="outlineVariant"
            >
              Reset
            </Button>
          }
          primaryButton={
            <Button borderRadius="2xs" variant="filled">
              remove
            </Button>
          }
        />
        <EarnCard
          key={v4()}
          token={parseToMetadata(TOKENS[2] as MetadataSources)}
          label="Rewards"
          primaryButton={
            <Button borderRadius="2xs" mt="3rem" variant="filled">
              Harvest
            </Button>
          }
          isRewards
        />
      </Box>
    </Layout>
  );
};

export default EarnDetails;

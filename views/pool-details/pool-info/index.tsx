import { Box } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { PoolDetailsTabOption } from '../pool-details.types';
import DetailTabs from './components/detail-tabs';
import PoolInfoDetail from './pool-info-detail';

const PoolInfo: FC = () => {
  const [poolDetailsView, setPoolDetailsView] = useState<PoolDetailsTabOption>(
    PoolDetailsTabOption.Detail
  );

  const handleTabChange = (index: PoolDetailsTabOption) =>
    setPoolDetailsView(index);

  return (
    <Box color="onSurface" borderRadius="xs" bg="container">
      <DetailTabs
        items={['Pool Detail']}
        onChangeTab={handleTabChange}
        defaultTabIndex={poolDetailsView}
      />
      {poolDetailsView === PoolDetailsTabOption.Detail && <PoolInfoDetail />}
    </Box>
  );
};

export default PoolInfo;

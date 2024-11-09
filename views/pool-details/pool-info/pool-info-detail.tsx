import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import { FixedPointMath } from '@/lib';

import { usePoolDetails } from '../pool-details.context';
import Accordion from './components/accordion';
import { PoolDetailAccordionItemStandardProps } from './components/accordion/accordion.types';
import ItemStandard from './components/accordion/item-standard';
import { POOL_INFORMATION, POOL_STATISTICS } from './pool-info.data';

const PoolDetail = () => {
  const { query } = useRouter();
  const { pool, config } = usePoolDetails();

  const infoData = [(query.address as string) ?? 'N/A', 'SR-AMM', 'Volatile'];

  const statsData = [
    pool
      ? FixedPointMath.toNumber(
          BigNumber(String(pool?.bidLiquidity ?? 0)),
          pool?.metadata.decimals
        )
      : 'N/A',
    config
      ? `${FixedPointMath.toNumber(BigNumber(String(config?.fee)), 9) * 100}%`
      : 'N/A',
  ];

  return (
    <Box>
      <Accordion title={POOL_INFORMATION.title}>
        {(
          POOL_INFORMATION.data as Array<PoolDetailAccordionItemStandardProps>
        ).map(({ label, popupInfo, isCopyClipBoard }, index) => (
          <ItemStandard
            key={v4()}
            label={label}
            loading={false}
            popupInfo={popupInfo}
            content={infoData[index]}
            isCopyClipBoard={isCopyClipBoard}
          />
        ))}
      </Accordion>
      <Accordion title={POOL_STATISTICS.title} noBorder>
        {(
          POOL_STATISTICS.data as Array<PoolDetailAccordionItemStandardProps>
        ).map(({ label, popupInfo, isCopyClipBoard }, index) => (
          <ItemStandard
            key={v4()}
            label={label}
            loading={false}
            popupInfo={popupInfo}
            content={statsData[index]}
            isCopyClipBoard={isCopyClipBoard}
          />
        ))}
      </Accordion>
    </Box>
  );
};

export default PoolDetail;

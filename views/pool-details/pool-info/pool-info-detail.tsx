import { Box } from '@interest-protocol/ui-kit';
import { v4 } from 'uuid';

import Accordion from './components/accordion';
import { PoolDetailAccordionItemStandardProps } from './components/accordion/accordion.types';
import ItemStandard from './components/accordion/item-standard';
import { POOL_INFORMATION, POOL_STATISTICS } from './pool-info.data';

const PoolDetail = () => {
  const infoData = [
    '0x2caf59fa9032c9ed216f1fcb70422fa74e1c3ee45f86c06638b998b18ae01ad9',
    'AMM',
    'Volatile',
  ];

  const statsData = [100, 999];

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

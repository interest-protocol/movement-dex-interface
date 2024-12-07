import { Box } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { InfoCardProps } from './info-card.types';
import InfoCardHeader from './info-card-header';
import InfoCardCoins from './info-card-icons';
import InfoCardTrade from './info-card-trade';

const InfoCard: FC<InfoCardProps> = ({
  link,
  tags,
  lines,
  listCoins,
  infoData,
}) => {
  return (
    <Link href={link}>
      <Box
        p="m"
        flex="1"
        gap="xs"
        height="100%"
        display="flex"
        borderRadius="xs"
        bg="lowestContainer"
        flexDirection="column"
        border="0.063rem solid"
        borderColor="outlineVariant"
        justifyContent="space-between"
        transition="all 300ms ease-in-out"
        nHover={{
          cursor: 'pointer',
          borderColor: '#76767A',
          boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
          '.arrow-wrapper': { opacity: 1 },
        }}
      >
        <InfoCardHeader tags={tags} />
        <InfoCardCoins coins={listCoins} />
        <Box px="m" py="xs" bg="surface" borderRadius="1rem">
          {lines.map((line, index) => (
            <InfoCardTrade
              {...line}
              key={v4()}
              index={index}
              amount={infoData[index] ?? 'N/A'}
            />
          ))}
        </Box>
      </Box>
    </Link>
  );
};

export default InfoCard;

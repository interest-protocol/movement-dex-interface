import { Box } from '@interest-protocol/ui-kit';
import { FC, useEffect, useState } from 'react';

import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import { getCoinMetadata } from '@/utils';

import FetchingToken from './fetching-token';
import NotFound from './not-found';
import { ModalTokenSearchProps } from './select-token-modal.types';
import TokenModalItem from './token-modal-item';

const ModalTokenSearch: FC<ModalTokenSearchProps> = ({
  search,
  handleSelectToken,
}) => {
  const client = useAptosClient();

  const [isLoading, setIsLoading] = useState(false);
  const [tokenMetadata, setTokenMetadata] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!search) return;

    const fetchMetadata = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const data = await getCoinMetadata(search, client);

        setTokenMetadata(data);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [search]);

  if (isLoading) return <FetchingToken />;
  if (error || !tokenMetadata) return <NotFound />;

  return (
    <Box p="m">
      <TokenModalItem
        key={search}
        isFA={false}
        selected={false}
        symbol={tokenMetadata.symbol}
        onClick={() => handleSelectToken(tokenMetadata)}
      />
    </Box>
  );
};

export default ModalTokenSearch;

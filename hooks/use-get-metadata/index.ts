import {
  AccountAddress,
  Aptos,
  GetFungibleAssetMetadataResponse,
} from '@aptos-labs/ts-sdk';
import { useEffect, useState } from 'react';

import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';

export const getRegistry = async (client: Aptos, moduleAddress: string) => {
  const registry = await client.view<[[{ inner: string }]]>({
    payload: {
      function: `${AccountAddress.from(
        moduleAddress
      )}::launchpad::get_registry`,
    },
  });
  return registry[0];
};

const getObjects = async (registry: [{ inner: string }], client: Aptos) => {
  const objects = await Promise.all(
    registry.map(async (register: { inner: string }) => {
      const formattedRegistry = AccountAddress.from(register.inner).toString();
      const object = await client.getObjectDataByObjectAddress({
        objectAddress: formattedRegistry,
      });

      return object.owner_address;
    })
  );
  return objects;
};

const getMetadata = async (objects: ReadonlyArray<string>, client: Aptos) =>
  Promise.all(
    objects.map(async (object: string) => {
      const formattedObjectAddress = AccountAddress.from(object).toString();

      const metadata = await client.getFungibleAssetMetadata({
        options: {
          where: { creator_address: { _eq: `${formattedObjectAddress}` } },
        },
      });
      return metadata[0];
    })
  );

export function useGetAssetMetadata(moduleAddress: string) {
  const client = useAptosClient();
  const [fas, setFAs] = useState<GetFungibleAssetMetadataResponse>([]);

  useEffect(() => {
    getRegistry(client, moduleAddress).then((registry) => {
      getObjects(registry, client).then((objects) => {
        getMetadata(objects, client).then((metadatas) => {
          setFAs(metadatas);
        });
      });
    });
  }, []);

  return fas;
}

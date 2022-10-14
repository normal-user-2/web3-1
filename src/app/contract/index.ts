import { UseMutationOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BigNumber, ethers } from 'ethers';
import { useEffect, useMemo } from 'react';
import { useAccount, useConnect, useSigner } from 'wagmi';

import { baseQuery } from 'app/api';

import abi from './abi.json';
import { EverclubContract } from './everclubContract';

export const everclubInterface = new ethers.utils.Interface(abi);

export const useContractAddress = () =>
  useQuery(
    ['api', 'contract_address'],
    async () => {
      const { address }: { address: string } = (await baseQuery('user/contract_address')).data;
      return address;
    },
    {
      staleTime: Infinity,
    },
  );

const useEverclubContract = (): EverclubContract | undefined => {
  const { data: address } = useContractAddress();
  const { data: signer } = useSigner();

  return useMemo(() => {
    if (address != null && signer != null) {
      return new ethers.Contract(address, everclubInterface, signer) as unknown as EverclubContract;
    }
  }, [address, signer]);
};

export const useLoadAccount = ({ enabled }: { enabled?: boolean }) => {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  useEffect(() => {
    if (!isConnected && enabled) {
      connect({ connector: connectors[0], chainId: +import.meta.env.VITE_CHAIN_ID });
    }
  }, [isConnected, connect, connectors, enabled]);
};

export const useGetPlatformsAmountQuery = () => {
  const contract = useEverclubContract();

  return useQuery(
    ['contract', 'platformsAmount'],
    async () => {
      if (!contract) {
        return;
      }
      const result = await Promise.all([contract.START_PLATFORM(), contract.LAST_PLATFORM()]);
      return {
        from: result[0],
        to: result[1],
      } as const;
    },
    {
      retry: false,
      staleTime: Infinity,
      enabled: contract != null,
    },
  );
};

export const useBuyPriceQuery = (level: number) => {
  const contract = useEverclubContract();

  const result = useQuery(
    ['contract', 'buyPrice', String(level)],
    async () => {
      if (!contract) {
        return;
      }
      return contract.platformPricesUnActive(level);
    },
    {
      retry: false,
      staleTime: Infinity,
      enabled: contract != null,
    },
  );

  return { price: result.data, ...result } as const;
};

export const useReactivatePriceQuery = (level: number) => {
  const contract = useEverclubContract();

  const result = useQuery(
    ['contract', 'reactivatePrice', String(level)],
    async () => {
      if (!contract) {
        return;
      }
      return contract.platformPricesActive(level);
    },
    {
      retry: false,
      staleTime: Infinity,
      enabled: contract != null,
    },
  );

  return { price: result.data, ...result } as const;
};

export const useLoginQuery = () => {
  const { address } = useAccount();
  const contract = useEverclubContract();

  const result = useQuery(
    ['contract', 'userExists', address ?? ''],
    async () => {
      if (!contract || !address) {
        return;
      }
      return contract.userExists(address);
    },
    {
      staleTime: 10 * 60 * 1000,
      enabled: address != null && contract != null,
    },
  );

  return { isExist: result.data, ...result } as const;
};

export const useRegisterPriceQuery = () => {
  // register is the same as buying first platform
  return useBuyPriceQuery(1);
};

export const useRegisterMutation = (options?: UseMutationOptions<void, Error, string>) => {
  const queryClient = useQueryClient();
  const contract = useEverclubContract();
  const { address } = useAccount();
  const { data: registerPrice } = useRegisterPriceQuery();
  return useMutation(async (referralAddress: string) => {
    if (contract == null) {
      throw new Error('Wallet is not connected');
    }
    if (registerPrice == null) {
      throw new Error("Register price hasn't been queried");
    }
    const tx = await contract.registrationExt(referralAddress, { value: registerPrice }).catch((error) => {
      if (error.code === 'ACTION_REJECTED') {
        throw new Error();
      }
      if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
        // reverted tx
        throw new Error(error.reason.replace(/execution reverted: /g, ''));
      }
      const rpcMessage = error.data?.message;
      if (rpcMessage != null) {
        const matched = rpcMessage.match(/^err: (.*?):/);
        throw new Error(matched?.[1] ?? rpcMessage);
      }
      throw error;
    });
    await tx?.wait();
    queryClient.invalidateQueries(['contract', 'userExists', address]);
  }, options);
};

export const useGetUserQuery = (address?: string) => {
  const contract = useEverclubContract();
  const result = useQuery(
    ['contract', 'user', address ?? ''],
    async () => {
      if (!contract || !address) {
        return;
      }

      const response = await contract.users(address);
      const userData = {
        id: response[0],
        referrer: response[1],
        childrenAmount: response[2],
        exists: response[3],
      };
      if (!userData.exists) {
        throw new Error('No such user');
      }
      return userData;
    },
    {
      retry: false,
      staleTime: Infinity,
      enabled: contract != null && address != null,
    },
  );

  return { user: result.data, ...result } as const;
};

export const useIdToAddressQuery = (contractId?: number) => {
  const contract = useEverclubContract();

  const result = useQuery(
    ['contract', 'idToAddress', String(contractId)],
    async () => {
      if (!contract || !contractId) {
        return;
      }

      const address = await contract.addressIds(contractId);
      if (address === ethers.constants.AddressZero) {
        throw new Error('No such referrer');
      }
      return address;
    },
    {
      retry: false,
      staleTime: Infinity,
      enabled: contract != null && contractId != null,
    },
  );

  return { address: result.data, ...result } as const;
};

export const useBuyPlatformMutation = (
  level: number,
  options?: Omit<UseMutationOptions<void, unknown, BigNumber, unknown>, 'mutationKey' | 'mutationFn'>,
) => {
  const queryClient = useQueryClient();
  const contract = useEverclubContract();
  const { address } = useAccount();
  return useMutation(
    ['contract', 'buyPlatform', String(level)],
    async (price: BigNumber) => {
      if (contract == null) {
        throw new Error('Wallet is not connected');
      }
      const tx = await contract.buyNewLevel(level, { value: price }).catch((error) => {
        if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
          // reverted tx
          throw new Error(error.reason.replace(/execution reverted: /g, ''));
        }
        const rpcMessage = error.data?.message;
        if (rpcMessage != null) {
          const matched = rpcMessage.match(/^err: (.*?):/);
          throw new Error(matched?.[1] ?? rpcMessage);
        }
        throw error;
      });
      await tx?.wait();
      queryClient.invalidateQueries(['contract', 'platform', address, String(level)]);
      queryClient.invalidateQueries(['api', 'user', 'platforms']);
    },
    options,
  );
};

export const useReactivatePlatformMutation = (
  level: number,
  options?: Omit<UseMutationOptions<void, unknown, BigNumber, unknown>, 'mutationFn' | 'mutationKey'>,
) => {
  const contract = useEverclubContract();
  const queryClient = useQueryClient();
  const { address } = useAccount();
  return useMutation(
    ['contract', 'reactivatePlatform', String(level)],
    async (price: BigNumber) => {
      if (contract == null) {
        throw new Error('Wallet is not connected');
      }
      const tx = await contract.reactivatePlatform(level, { value: price }).catch((error) => {
        if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
          // reverted tx
          throw new Error(error.reason.replace(/execution reverted: /g, ''));
        }
        const rpcMessage = error.data?.message;
        if (rpcMessage != null) {
          const matched = rpcMessage.match(/^err: (.*?):/);
          throw new Error(matched?.[1] ?? rpcMessage);
        }
        throw error;
      });
      await tx?.wait();
      queryClient.invalidateQueries(['contract', 'platform', address, String(level)]);
      queryClient.invalidateQueries(['api', 'user', 'platforms']);
    },
    options,
  );
};

export const useGetPlatformQuery = (level: number, address?: string) => {
  const contract = useEverclubContract();

  const result = useQuery(
    ['contract', 'platform', address, String(level)],
    async () => {
      if (!contract || !address) {
        return;
      }
      const [owned, platformMembersCount] = await Promise.all([
        contract.userActivePlatform(address, level),
        contract.userPlatformMembersCount(address, level),
      ]);
      const membersCount = platformMembersCount.toNumber();
      return {
        owned,
        readyToReactivate: membersCount === 3,
        membersCount,
      };
    },
    {
      retry: false,
      staleTime: 1 * 60 * 1000,
      enabled: contract != null && address != null,
    },
  );

  return { platform: result.data, ...result } as const;
};

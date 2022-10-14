import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const baseQuery = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/',
});

type Decimal = string;

interface Wallet {
  id: number;
  user_id: number;
  contract_user_id: number;
  coin: string;
  address: string;
  balance: number;
  referral_link: string;
  amount_transfers: Decimal;
  profit_referrals: Decimal;
  profit_reinvest: Decimal;
}

interface Badge {
  name: string;
  level: number;
}

export interface User {
  id: number;
  contract_user_id: number;
  this_referral: number | null;
  referrals_count: number;
  created_at: string;
  updated_at: string;

  wallet: Wallet;
  statuses: Badge[];

  subscribers?: User[];
}

interface Platform {
  id: number;
  wallet_id: number;
  platform_level_id: number;
  platform_level: string;
  active: 1 | 0;
  activated: boolean;
  subscribers: number[];
  reactivations: number;
  total_subscribers_platform_level: number;
}

export const useGetBNBPrice = () => {
  return useQuery<number>(
    ['binance', 'BNBUSDT'],
    async () => {
      const response = await axios('https://www.binance.com/api/v3/ticker/price?symbol=BNBUSDT');
      return Number(response.data.price);
    },
    {
      staleTime: 5 * 60 * 1000,
    },
  );
};

export const useGetUser = (address?: string) => {
  return useQuery<User>(
    ['api', 'user', address],
    async () => {
      const response = await baseQuery(`user/wallet/${address}`);
      return response.data.data;
    },
    {
      staleTime: 3 * 60 * 1000,
      enabled: address != null,
    },
  );
};

export const useGetReferrals = (walletId?: number) => {
  return useQuery<User[]>(
    ['api', 'user', 'referrals', walletId],
    async () => {
      const response = await baseQuery('/service/cabinet/partners', {
        params: {
          contract_user_id: walletId,
        },
      });
      return response.data.data.subscribers;
    },
    {
      staleTime: 3 * 60 * 1000,
      enabled: walletId != null,
    },
  );
};

interface Statistic {
  all_count: number;
  users_invited_last_24_hour: number;
  all_bnb: number;
}

export const useGetStatistic = () => {
  return useQuery<Statistic>(
    ['api', 'statistic'],
    async () => {
      const response = await baseQuery('/service/cabinet/info');
      return response.data;
    },
    {
      staleTime: 20 * 60 * 1000,
    },
  );
};

export const useGetPlatforms = (walletId?: number) => {
  return useQuery<Platform[]>(
    ['api', 'user', 'platforms', walletId],
    async () => {
      const response = await baseQuery(`/service/platforms/wallets/${walletId}`);
      return response.data.data;
    },
    {
      staleTime: 1 * 60 * 1000,
      enabled: walletId != null,
    },
  );
};

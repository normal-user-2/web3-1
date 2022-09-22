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
  user_name: string;
  avatar: string;
  blocked_faq: boolean;
  language: 'en' | 'ru' | 'sp';
  this_referral: number | null;
  referrals_count: number;
  created_at: string;
  updated_at: string;

  wallet: Wallet;
  statuses: Badge[];
}
interface Platform {
  id: number;
  wallet_id: number;
  platform_level_id: number;
  platform_level: string;
  active: boolean;
  activated: boolean;
  subscribers: number[];
  reactivations: number;
  total_subscribers_platform_level: number;
}

export const useGetBNBPrice = () => {
  return useQuery<number, unknown, number>(
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
  return useQuery<User, unknown, User>(
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

//     getReferrals: builder.query<User, { walletId: number }>({
//       query: ({ walletId }) => ({
//         url: '/service/cabinet/partners',
//         params: {
//           contract_user_id: walletId,
//         },
//       }),
//       transformResponse: (response: { data: User }) => response.data,
//     }),

//     getStatistic: builder.query<{ all_count: number; users_invited_last_24_hour: number; all_trx: number }, void>({
//       query: () => '/service/cabinet/info',
//     }),

//     getPlatformStatus: builder.query<Platform[], { walletId: number }>({
//       query: ({ walletId }) => `service/platforms/wallets/${walletId}`,
//       transformResponse: (response: {
//         data: Array<
//           Omit<Platform, 'active'> & {
//             active: 1 | 0;
//           }
//         >;
//       }) =>
//         response.data.map((platform) => ({
//           ...platform,
//           active: Boolean(platform.active),
//         })),
//     }),
//   }),
// });

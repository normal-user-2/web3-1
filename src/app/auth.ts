import { useLocalStorage } from 'usehooks-ts';

export const useActiveWallet = () => {
  return useLocalStorage<string | undefined>('activeWallet', undefined);
};

export const useReferralId = () => {
  return useLocalStorage<number | undefined>('referrerId', undefined);
};

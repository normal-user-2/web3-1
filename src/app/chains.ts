import { configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, provider } = configureChains(
  [
    {
      id: 97,
      name: 'Binance Smart Chain Testnet',
      network: 'BSC Test',
      nativeCurrency: {
        name: 'tBNB',
        symbol: 'tBNB',
        decimals: 18,
      },
      rpcUrls: {
        default: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      },
      blockExplorers: {
        default: {
          name: 'bscscan',
          url: 'https://testnet.bscscan.com',
        },
      },
    },
    {
      id: 56,
      name: 'Binance Smart Chain',
      network: 'BSC',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: {
        default: 'https://bsc-dataseed1.binance.org',
      },
      blockExplorers: {
        default: {
          name: 'bscscan',
          url: 'https://bscscan.com',
        },
      },
    },
  ],
  [publicProvider()],
);

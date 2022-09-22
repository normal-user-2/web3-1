import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { Pages } from 'pages';

import { theme } from 'theme';

import './i18n';

const queryClient = new QueryClient();

const { chains, provider } = configureChains(
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

const client = createClient({
  queryClient,
  provider,
  connectors: [
    new MetaMaskConnector({
      chains,
    }),
  ],
});

export const App: FC = () => (
  <WagmiConfig client={client}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Pages />
        <ReactQueryDevtools />
      </ThemeProvider>
    </BrowserRouter>
  </WagmiConfig>
);

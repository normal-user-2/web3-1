import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig, createClient } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { Pages } from 'pages';

import { theme } from 'theme';

import { chains, provider } from './chains';
import './i18n';

const queryClient = new QueryClient();

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
        <SnackbarProvider maxSnack={3}>
          <Pages />
        </SnackbarProvider>
        <ReactQueryDevtools />
      </ThemeProvider>
    </BrowserRouter>
  </WagmiConfig>
);

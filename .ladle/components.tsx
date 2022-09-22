import type { GlobalProvider } from '@ladle/react';

import { Box, CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '../src/theme';

export const Provider: GlobalProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          height: '100%',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

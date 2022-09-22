import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Box, CircularProgress, Container } from '@mui/material';

import { useActiveWallet } from 'app/auth';

import { Referral } from './Auth/Referral';
import { Footer } from './layout/Footer';
import { Header } from './layout/Header';

const Auth = lazy(() => import('./Auth'));
const Dashboard = lazy(() => import('./Dashboard'));
const Landing = lazy(() => import('./Landing'));

const Loader = () => {
  return (
    <Box
      sx={{
        zIndex: 10000,
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
        background: '#1E2B49',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export const Pages = () => {
  const [wallet] = useActiveWallet();
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Routes>
        <Route index element={wallet == null ? <Landing /> : <Navigate to='dashboard' replace />} />
        <Route
          path='*'
          element={
            <Container
              sx={{
                pt: 3,
                pb: 8,
                flexGrow: 1,
              }}
              maxWidth='xl'
            >
              <Routes>
                {/* TODO: Add react lazy for code-splitting */}
                {/* <Route path='academy' element={<Academy />} /> */}
                {/* <Route path='academy/lesson' element={<Lesson />} /> */}
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='login' element={<Auth />} />
                <Route path='r/:id' element={<Referral />} />
              </Routes>
            </Container>
          }
        />
      </Routes>

      <Footer />
    </Suspense>
  );
};

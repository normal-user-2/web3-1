import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { NavLink, Route, Link as RouterLink, Routes } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/HomeRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import WorkIcon from '@mui/icons-material/WorkRounded';
import { AppBar, Box, Button, Container, MenuItem, Select, Toolbar, styled } from '@mui/material';

import { ReactComponent as LogoCube } from 'assets/LogoCube.svg';
import { ReactComponent as LogoNameIcon } from 'assets/LogoName.svg';

import { useActiveWallet } from 'app/auth';

import { DocumentLink } from 'components/DocumentLink';

import { getNeonFilter } from 'theme';

const LogoName = styled(LogoNameIcon)``;

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  marginBlock: 2,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  textDecoration: 'none',
  '&.active': {
    color: theme.palette.primary.main,
    ...getNeonFilter(theme.palette.primary.main),
  },
}));

export const Header: FC = () => {
  const [activeWallet, setActiveWallet] = useActiveWallet();
  const { t, i18n } = useTranslation('shared');
  const languageSelector = (
    <Select value={i18n.language.slice(0, 2)} onChange={(event) => i18n.changeLanguage(event.target.value)}>
      <MenuItem value='en'>En</MenuItem>
      <MenuItem value='ru'>Ru</MenuItem>
    </Select>
  );

  const logo = (
    <Box
      sx={{
        display: 'flex',
        mr: 1,
        gap: 2,
        alignItems: 'center',
      }}
      component={RouterLink}
      to={activeWallet ? '/dashboard' : '/'}
    >
      <LogoCube />
      <LogoName
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      />
    </Box>
  );

  return (
    <AppBar sx={{ pt: 3, px: { xs: 1, sm: 3 } }}>
      <Container
        maxWidth='xl'
        sx={{
          px: { xs: 0, sm: 2 },
        }}
      >
        <Toolbar
          sx={{
            gap: 2,
          }}
          disableGutters
        >
          {logo}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              gap: 2,
              justifyContent: 'flex-end',
              alignItems: 'center',
              '& svg': {
                color: 'primary.main',
              },
            }}
          >
            <Routes>
              <Route
                path='/dashboard/*'
                element={
                  <Box
                    sx={{
                      display: {
                        xs: 'block',
                        sm: 'flex',
                      },
                      gap: 2,
                    }}
                  >
                    <StyledNavLink to='/dashboard' end>
                      <HomeIcon color='primary' />
                      <Trans t={t} i18nKey='header.dashboard' />
                    </StyledNavLink>
                    <StyledNavLink to='/dashboard/partners'>
                      <WorkIcon color='primary' />
                      <Trans t={t} i18nKey='header.partners' />
                    </StyledNavLink>
                    <StyledNavLink to='/login' onClick={() => setActiveWallet(undefined)}>
                      <LogoutIcon /> <Trans t={t} i18nKey='header.logout' />
                    </StyledNavLink>
                  </Box>
                }
              />
              <Route
                path='/'
                element={
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexGrow: 1,
                    }}
                  >
                    <div />
                    <Box
                      sx={{
                        display: {
                          xs: 'block',
                          sm: 'flex',
                        },
                        gap: 2,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        maxWidth: 400,
                        flexGrow: 1,
                      }}
                    >
                      <DocumentLink name='white_paper'>White paper</DocumentLink>
                      <DocumentLink name='manifest'>Manifest</DocumentLink>
                      <DocumentLink name='roadmap'>Roadmap</DocumentLink>
                    </Box>
                    <Button component={RouterLink} to='/login' variant='contained'>
                      <Trans t={t} i18nKey='header.openAppButton' />
                    </Button>
                  </Box>
                }
              />
              <Route path='*' element={null} />
            </Routes>
            {languageSelector}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { SocialIcon, keyFor } from 'react-social-icons';
import { colorFor } from 'react-social-icons/build/networks';
import { useNetwork } from 'wagmi';

import { Box, Container, Skeleton, Stack, Typography, css, styled } from '@mui/material';

import { ReactComponent as LogoCube } from 'assets/LogoCube.svg';
import { ReactComponent as LogoNameIcon } from 'assets/LogoName.svg';

import { useContractAddress } from 'app/contract';

import { DocumentLink } from 'components/DocumentLink';

import { formatAddress } from 'helpers/format';

const socialLinks = [
  'https://twitter.com/EverClub_L2E',
  'https://t.me/everclub_platform',
  'https://www.facebook.com/EverClub-100754289330865',
  'https://www.instagram.com/everclub_platform/',
  'https://www.youtube.com/c/EverClub',
  'https://vk.com/everclubplatform',
];

const SocialLink = styled(SocialIcon, {
  shouldForwardProp: (prop) => prop !== 'hoverColor',
})<{ hoverColor: string }>(
  ({ hoverColor }) => css`
    filter: drop-shadow(0px 10px 20px #749df359);

    border: 2px solid white;
    border-radius: 10px;
    opacity: 0.7;

    &:hover {
      filter: drop-shadow(0px 10px 20px ${hoverColor});
      .social-svg-icon {
        fill: ${hoverColor} !important;
      }
      opacity: 1;
      border-color: ${hoverColor};
    }
  `,
);

export const Footer: FC = () => {
  const { t } = useTranslation('shared');
  const { data: contractAddress } = useContractAddress();
  const { chains } = useNetwork();
  const blockscanURL = chains.find(({ id }) => id === +import.meta.env.VITE_CHAIN_ID)?.blockExplorers?.default.url;

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        width: '100%',
      }}
    >
      <Container
        sx={{
          py: 4,
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 3,

          gridTemplateColumns: {
            xs: 'unset',
            md: `repeat(3, 1fr)`,
          },
        }}
      >
        <Stack justifyContent='space-between' alignItems='flex-start' gap={2}>
          <Stack direction='row' alignItems='center' gap={1}>
            <LogoCube fill='#BEC6D8' height={45} />
            <LogoNameIcon height={18} />
          </Stack>
          <Typography color='text.light'>Copyright {new Date().getFullYear()} ©EVERCLUB</Typography>
        </Stack>

        <Stack gap={1} alignItems='flex-start'>
          <Stack direction='row' gap={4}>
            <Stack gap={1}>
              <DocumentLink name='white_paper'>White paper</DocumentLink>
              <DocumentLink name='manifest'>Manifest</DocumentLink>
              <DocumentLink name='roadmap'>Roadmap</DocumentLink>
              <DocumentLink name='lite_paper'>Lite Paper</DocumentLink>
            </Stack>
            <Stack gap={1}>
              <DocumentLink name='revenue_structure'>Revenue structure</DocumentLink>
              <DocumentLink name='presentation'>Presentation</DocumentLink>
              <DocumentLink name='manual'>Manual</DocumentLink>
              <DocumentLink href='/docs/india.pdf'>India</DocumentLink>
            </Stack>
          </Stack>
          <Typography variant='caption' color='text.light'>
            <Trans t={t} i18nKey='footer.allDocumentsInSocial' />
          </Typography>
        </Stack>

        <Stack gap={2} justifyContent='space-between'>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography variant='subtitle1' color='text.light' lineHeight='1' display='inline'>
              Smart contract
            </Typography>
            {contractAddress == null ? (
              <Skeleton width={150} />
            ) : (
              <Typography
                component='a'
                href={`${blockscanURL}/address/${contractAddress}`}
                target='_blank'
                variant='body2'
                color='text.primary'
                lineHeight='1'
                display='inline'
              >
                BSC {formatAddress(contractAddress)}
              </Typography>
            )}
          </Stack>

          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: {
                lg: 'space-between',
                xs: 'center',
              },
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {socialLinks.map((url) => (
              <SocialLink
                key={url}
                url={url}
                fgColor='white'
                bgColor='transparent'
                hoverColor={colorFor(keyFor(url))}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

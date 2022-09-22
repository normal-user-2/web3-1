import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Stack, Typography } from '@mui/material';

import { Video } from 'components/Video';

export const InfoBlock: FC = () => {
  const { t } = useTranslation('app');

  const metamaskInstruction = (
    <Stack
      gap={1}
      sx={{
        fontWeight: 400,
        fontSize: 14,
        color: 'text.light',
      }}
    >
      <Typography fontSize={18}>
        <Trans t={t} i18nKey='auth.instructions.metamask.whyMetamask' />
      </Typography>
      <Divider />
      <Video videoId='r6i4vYq1Eow' />
      <Typography color='text.primary'>
        <Trans t={t} i18nKey='auth.instructions.metamask.platforms' />
      </Typography>
      <Stack
        component='ol'
        sx={{
          m: 0,
          pl: 3,
          gap: 1,
        }}
      >
        <li>
          <Trans t={t} i18nKey='auth.instructions.metamask.steps.0'>
            <a href='https://metamask.io/download' target='_blank' rel='noreferrer'>
              metamask.io/download
            </a>
          </Trans>
        </li>
        {(t('auth.instructions.metamask.steps', { returnObjects: true }) as string[]).slice(1).map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </Stack>
    </Stack>
  );

  return (
    <Stack display='flex' flexDirection='column' gap={4}>
      <Stack alignItems='center'>
        <Typography
          textAlign='center'
          fontWeight={300}
          fontSize={30}
          letterSpacing='0.3em'
          textTransform='uppercase'
          marginY={3}
        >
          Instruction
        </Typography>
        <Divider sx={{ borderColor: 'primary.main', width: 28, mx: 'auto' }} />
      </Stack>
      <Stack gap={1}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Trans t={t} i18nKey='auth.instructions.metamask.title' />
          </AccordionSummary>
          <AccordionDetails>{metamaskInstruction}</AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Trans t={t} i18nKey='auth.instructions.buyBNB.title' />
          </AccordionSummary>
          <AccordionDetails>
            <Stack
              component='ol'
              sx={{
                m: 0,
                pl: 3,
                gap: 1,
              }}
            >
              <li>
                <Trans t={t} i18nKey='auth.instructions.buyBNB.steps.0'>
                  <a href='https://www.bestchange.com/' target='_blank' rel='noreferrer'>
                    bestchange.com
                  </a>
                </Trans>
              </li>
              {(t('auth.instructions.buyBNB.steps', { returnObjects: true }) as string[])
                .slice(1)
                .map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Stack>

      <Stack alignItems='center'>
        <Typography
          textAlign='center'
          fontWeight={300}
          fontSize={30}
          letterSpacing='0.3em'
          textTransform='uppercase'
          marginY={3}
        >
          FAQ
        </Typography>
        <Divider sx={{ borderColor: 'primary.main', width: 28, mx: 'auto' }} />
      </Stack>

      <Stack gap={1}>
        {(t('auth.FAQ', { returnObjects: true }) as { title: string; description: string }[]).map(
          ({ title, description }, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>{title}</AccordionSummary>
              <AccordionDetails>{description}</AccordionDetails>
            </Accordion>
          ),
        )}
      </Stack>
    </Stack>
  );
};

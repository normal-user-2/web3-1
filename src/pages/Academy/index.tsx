import { FC } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography, css, styled } from '@mui/material';

import { LockIcon } from 'components/LockIcon';
import { Video } from 'components/Video';

const GradientBorderBox = styled(Box)(({ theme }) => {
  const bg = theme.palette.background.default;
  return css`
    padding: ${theme.spacing(1)};
    border-radius: 2rem;
    border: 4px solid transparent;
    background: linear-gradient(${bg}, ${bg}) padding-box, linear-gradient(84deg, #f80cff, #0795e7) border-box;
  `;
});

const Block: FC = () => {
  return (
    <GradientBorderBox
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          py: 0.5,
          width: '11rem',
          position: 'absolute',
          top: '-4px',
          left: 0,
          right: 0,
          mx: 'auto',
          background: 'linear-gradient(84deg, #F80CFF, #0795E7)',
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem',
          boxShadow: '0px 10px 20px rgba(135, 76, 244, 0.35)',
          textAlign: 'center',
        }}
      >
        Level 1
      </Box>
      <LockIcon locked={false} />
      Pros and cons of investing in cryptocurrencies
    </GradientBorderBox>
  );
};

export const Academy: FC = () => {
  const level = (
    <Accordion disableGutters TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Level 1-3</AccordionSummary>
      <AccordionDetails
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gridAutoRows: 'minmax(170px, 1fr)',
        }}
      >
        <Block />
        <Block />
        <Block />
        <Block />
      </AccordionDetails>
    </Accordion>
  );
  return (
    <Stack gap={4}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack
          sx={{
            flexDirection: {
              sx: 'column',
              md: 'row',
            },
            gap: 1,
            alignItems: 'flex-start',
            textTransform: 'uppercase',
          }}
        >
          <Typography variant='h2' lineHeight={1}>
            Academy
          </Typography>
          <Typography variant='subtitle2' lineHeight={1.3}>
            Ever
            <Box component='span' sx={{ color: 'primary.main' }}>
              Learn
            </Box>
          </Typography>
        </Stack>
        <Box sx={{ height: 25, width: 25, bgcolor: 'primary.main' }} />
      </Stack>
      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: {
            xs: 2,
            md: 4,
          },
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Video videoId='jfKfPfyJRdk' />
        <Typography color='text.secondary' maxWidth='55rem'>
          Is the flagship of the ecosystem, offering platform users exclusive access to educational programs, courses
          and training products. With hundreds of tutorials in multiple areas of online business, "learn and earn"
          concept providing rewards for successful learning and integration with other services of the EverGame
          ecosystem, EverLearn is poised to become the top online education product
        </Typography>
      </Stack>
      <Stack
        sx={{
          flexDirection: {
            xs: 'column',
            md: 'row-reverse',
          },
          gap: {
            xs: 2,
            md: 5,
          },
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Video videoId='jfKfPfyJRdk' />
        <Box maxWidth='55rem'>
          <Typography variant='h3' mb={1}>
            FREE COURSE
          </Typography>
          <Typography color='text.secondary'>
            Is the flagship of the ecosystem, offering platform users exclusive access to educational programs, courses
            and training products. With hundreds of tutorials in multiple areas of online business, "learn and earn"
            concept providing rewards for successful learning and integration with other services of the EverGame
            ecosystem, EverLearn is poised to become the top online education product
          </Typography>
        </Box>
      </Stack>
      <Stack gap={2}>
        {level}
        {level}
        {level}
      </Stack>
    </Stack>
  );
};

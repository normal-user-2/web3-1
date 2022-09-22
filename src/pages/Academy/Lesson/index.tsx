import { FC, useState } from 'react';

import PdfIcon from '@mui/icons-material/PictureAsPdfRounded';
import EyeIcon from '@mui/icons-material/VisibilityRounded';
import { Button, Paper, Stack, Tab, Tabs, Typography, styled } from '@mui/material';

import { Video } from 'components/Video';

import { getNeonFilter } from 'theme';

const Row = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const VideoTabs: FC = () => {
  const [tab, setTab] = useState<number>(1);
  return (
    <>
      <Tabs value={tab} onChange={(_, value) => setTab(value)}>
        <Tab value={1} label='Video 1' />
        <Tab value={2} label='Video 2' />
      </Tabs>
      {tab === 1 && <Video videoId='2g811Eo7K8U' />}
      {tab === 2 && <Video videoId='jfKfPfyJRdk' />}
    </>
  );
};

export const Lesson: FC = () => {
  return (
    <Stack gap={4}>
      <Row>
        <Typography variant='h2' textTransform='uppercase'>
          Smart trading
        </Typography>
      </Row>
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
          p: 2,
        }}
      >
        <Row gap={2}>
          <Typography>#Tags</Typography>
          <Typography>#Tags</Typography>
          <Typography>#Tags</Typography>
          <Typography>#Tags</Typography>
        </Row>
        <Row gap={1}>
          <EyeIcon sx={(theme) => getNeonFilter(theme.palette.primary.main)} />
          <Typography>106465</Typography>
        </Row>
      </Paper>
      <Typography color='text.secondary'>
        The rate of change in today's IT, internet marketing, FinTech, & GameFi industries is incredible. What appeared
        extraordinary yesterday is already a reality, and what seemed fantastic yesterday will be routine tomorrow. The
        multiplicity of marketing platforms, investment platforms, cryptocurrencies, and blockchain initiatives is
        extremely difficult for the typical person to understand.
      </Typography>
      <Typography color='text.secondary'>
        That is why EverClub has chosen to develop a DEMO course that will introduce you to the fundamentals and
        breakthroughs of the IT and Blockchain industries, as well as practical examples and real-world applications. To
        begin, consider the following scenario, which will probably certainly appear in future investment textbooks:
        what are the dangers of the cryptocurrency market, illustrated by the tragic history of Terra (LUNA)?
      </Typography>
      <VideoTabs />
      <Button startIcon={<PdfIcon />} variant='contained' size='large' sx={{ width: 'fit-content', mx: 'auto' }}>
        Download Pdf
      </Button>
    </Stack>
  );
};

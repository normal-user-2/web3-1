import { FC } from 'react';
import { SocialIcon } from 'react-social-icons';

import { Box, Button, useTheme } from '@mui/material';

const TelegramIcon = () => {
  const { palette } = useTheme();

  return (
    <SocialIcon
      network='telegram'
      bgColor='transparent'
      fgColor={palette.primary.main}
      style={{
        width: '1.7em',
        height: '1.7em',
      }}
    />
  );
};

interface Props {
  telegramTag: string;
}

export const HelpBotButton: FC<Props> = ({ telegramTag }) => {
  return (
    <Button
      sx={{
        width: 'fit-content',
      }}
      variant='contained'
      color='info'
      size='large'
      startIcon={<TelegramIcon />}
      href={`https://t.me/${telegramTag}`}
      target='_blank'
    >
      Telegram
      <Box color='white' ml={1}>
        @{telegramTag}
      </Box>
    </Button>
  );
};

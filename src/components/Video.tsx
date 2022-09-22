import { FC } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useElementSize } from 'usehooks-ts';

import { Box, SxProps } from '@mui/material';

interface Props {
  videoId: string;
  sx?: SxProps;
}

export const Video: FC<Props> = ({ videoId, sx }) => {
  const [boxRef, { width }] = useElementSize();
  const innerWidth = width - 16;
  const height = Math.round((innerWidth / 16) * 9);
  const opts: YouTubeProps['opts'] = {
    width: innerWidth,
    height,
    playerVars: {
      modestbranding: 1,
      rel: 0,
      widget_referrer: import.meta.url,
    },
  };

  return (
    <Box
      sx={[
        {
          display: 'grid',
          placeItems: 'center',
          width: '100%',
          border: '8px solid',
          borderColor: 'background.default',
          borderRadius: '2rem',
          overflow: 'hidden',
          '& iframe': {
            display: 'block',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      ref={boxRef}
    >
      <YouTube videoId={videoId} opts={opts} />
    </Box>
  );
};

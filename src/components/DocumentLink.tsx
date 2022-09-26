import { useTranslation } from 'react-i18next';

import FileIcon from '@mui/icons-material/InsertDriveFileRounded';
import { Link } from '@mui/material';

import { FCC } from 'helpers/types';

type Props =
  | {
      name: string;
      href?: undefined;
    }
  | {
      name?: undefined;
      href: string;
    };

export const DocumentLink: FCC<Props> = ({ children, name, href }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language.slice(0, 2);
  return (
    <Link
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        lineHeight: 1,
      }}
      href={href != null ? href : `/docs/${name}_${lang}.pdf`}
      rel='noopener'
      target='_blank'
      underline='none'
      color='text.primary'
    >
      <FileIcon color='primary' fontSize='small' sx={{ pb: '2px' }} /> {children}
    </Link>
  );
};

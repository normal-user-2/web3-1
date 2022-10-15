/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable jsx-a11y/alt-text */
import { FC, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/CloseRounded';
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { useGetBNBPrice, useGetStatistic } from 'app/api';

import './styles/main.scss';
import './styles/media.scss';

const formatterRegex = /(\d)(?=(\d{3})+(?!\d))/g;
const formatNumber = (e: number) => {
  return Math.ceil(e).toString().replace(formatterRegex, '$1 ');
};

export const Landing: FC = () => {
  const { t, i18n } = useTranslation('landing');
  const lang = i18n.language.slice(0, 2);
  const { data } = useGetStatistic();
  const { data: BNBPrice } = useGetBNBPrice();

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <main className='landing-scope'>
      <section className='about' id='about'>
        <div className='container'>
          <h1>
            <Trans t={t} i18nKey='about.title' />
          </h1>
          <p>
            <Trans t={t} i18nKey='about.benefits' />
          </p>
          <div className='main_links'>
            <Link to='/login'>
              <img src='./assets/images/main/reg-bsc-en.svg' />
            </Link>
            <a href='https://www.youtube.com/c/EverClub' target='_blank' rel='noreferrer'>
              <img src='./assets/images/main/video-en.svg' />
            </a>
          </div>
          <div className='section_cool'>
            <div>
              <p>
                <Trans t={t} i18nKey='stats.totalParticipants' />
              </p>
              {data == null ? <Skeleton /> : <span>{formatNumber(data.all_count)}</span>}
            </div>
            <div className='bord'>
              <img src='./assets/images/main/line.svg' />
            </div>
            <div>
              <p>
                <Trans t={t} i18nKey='stats.joinLast24hours' />
              </p>
              {data == null ? <Skeleton /> : <span>+{formatNumber(data.users_invited_last_24_hour)}</span>}
            </div>
            <div className='bord'>
              <img src='./assets/images/main/line.svg' />
            </div>
            <div>
              <p>
                <Trans t={t} i18nKey='stats.alreadyEarned' />
              </p>
              {data == null || BNBPrice == null ? (
                <Skeleton />
              ) : (
                <span>${formatNumber(data.all_bnb * 1e-18 * BNBPrice)}</span>
              )}
            </div>
          </div>
          <div className='mouse'>
            <a href='#mission'>
              <img src='/assets/images/main/mouse.svg' />
            </a>
          </div>
        </div>
      </section>

      <section className='mission' id='mission'>
        <div className='mission_container'>
          <div className='mission-text'>
            <Typography variant='h4' textTransform='uppercase' letterSpacing='0.3em'>
              <Trans t={t} i18nKey='mission.title' />
            </Typography>
            <div>
              <img src='/assets/images/mission/mission-line.svg' />
            </div>
            <p>
              <Trans t={t} i18nKey='mission.explanation' />
            </p>
            <Typography textTransform='uppercase' component='span'>
              <Trans t={t} i18nKey='mission.title' />
            </Typography>
          </div>
          <div className='people'>
            <img src='./assets/images/mission/people.svg' />
          </div>
        </div>
      </section>

      <section className='video-work' id='video-work'>
        <div className='video-work_logo'>
          <img className='logo_des' src='./assets/images/video-work/logo.svg' alt='logo' />
        </div>
        <div className='info'>
          <a href='https://www.youtube.com/watch?v=ehjpx1Uc24w' target='_blank' rel='noreferrer'>
            <div className='video-work_button'></div>
          </a>

          <span>
            <Trans t={t} i18nKey='video.howEverClubWork' />
          </span>

          <p>
            <Trans t={t} i18nKey='video.about' />
          </p>
        </div>
      </section>

      <section className='results'>
        <div className='results__container'>
          <div className='result-img__left'>
            <img className='result-img__left_first' src='./assets/images/result/people_column.jpg' />
            <img className='result-img__left_second' src='./assets/images/result/people_row.jpg' />
          </div>
          <div className='result__content'>
            <h2>
              <Trans t={t} i18nKey='results.title' />
            </h2>

            <div className='result__items'>
              {[
                {
                  id: 17,
                  people: 158,
                  usd: '78 075$',
                  bnb: '175 BNB',
                  date: '10.05.2022',
                },
                {
                  id: 78,
                  people: 254,
                  usd: '99 929$',
                  bnb: '241 BNB',
                  date: '28.06.2022',
                },
              ].map(({ id, people, usd, bnb, date }) => (
                <div className='result__item' key={id}>
                  <div className='result__item-header'>
                    <img src='./assets/images/result/binance.svg' alt='' />
                    <div className='text__wrapper'>
                      <span className='result__item-id style_text'>ID {id}</span>
                      <span className='result__item-people style_text'>{people}</span>
                    </div>
                  </div>

                  <ul className='result__item-blog style_color'>
                    <li>
                      <span>Balance USD</span>
                      <p className='style_color'>{usd}</p>
                    </li>
                    <li>
                      <span>Balance BNB</span>
                      <p className='style_color'>{bnb}</p>
                    </li>
                    <li>
                      <span>Date of registration</span>
                      <p className='style_color'>{date}</p>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <Link className='result-btn' to='/login'>
              <p>
                <Trans t={t} i18nKey='results.startButton' />
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className='education'>
        <div className='education_container'>
          <div className='platform'>
            <div className='platform_head'>
              <div className='platform_name'>
                <Typography variant='h1' textTransform='uppercase'>
                  <Trans t={t} i18nKey='education.title' />
                </Typography>
                <img className='edu_line' src='/assets/images/education/line.svg' />
              </div>
            </div>
            <div className='education_choice'>
              <Link to='/login'>
                <img src={`/assets/images/education/introduction${lang === 'ru' ? '_ru' : ''}.png`} />
              </Link>
              <Link to='/login'>
                <img src={`/assets/images/education/instruments${lang === 'ru' ? '_ru' : ''}.png`} />
              </Link>
              <Link to='/login'>
                <img src={`/assets/images/education/cycles${lang === 'ru' ? '_ru' : ''}.png`} />
              </Link>
            </div>
          </div>

          <div className='courses'>
            <div className='platform_head'>
              <div className='platform_name'>
                <Typography variant='h1' textTransform='uppercase'>
                  <Trans t={t} i18nKey='education.courses.title' />
                </Typography>
                <img className='edu_line' src='/assets/images/education/line.svg' />
              </div>
            </div>
            <div className='education_choice' id='cons'>
              {[0, 1, 2, 3].map((key) => (
                <div className='item' key={key}>
                  <div className='item_content'>
                    <span>
                      <Trans t={t} i18nKey={`education.courses.content.${key}.title`} />
                    </span>
                    <img className='edu_line' src='/assets/images/education/line.svg' />
                    {/* <p>
                      <Trans t={t} i18nKey={`education.courses.content.${key}.description`} />
                    </p> */}
                    <Link to='/login'>
                      <div className='item_button'>
                        <p>
                          <Trans t={t} i18nKey='education.courses.passCourseButton' />
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='biography'>
        <div className='biography_container'>
          <div className='biography-text'>
            <Typography variant='h1' textTransform='uppercase'>
              <Trans t={t} i18nKey='founder.quote.title' />
            </Typography>
            <img className='biography_line' src='/assets/images/education/line.svg' />
            <span>
              <Trans t={t} i18nKey='founder.quote.text' />
            </span>
            <Button variant='outlined' color='inherit' sx={{ width: 'fit-content' }} onClick={openModal}>
              <Trans t={t} i18nKey='founder.viewBiographyButton' />
            </Button>
            <div className='biography_logo'>
              <img src='/assets/images/biography/logo-en.svg' />
            </div>
          </div>

          <div className='owner-photo'>
            <img src='/assets/images/biography/owner.svg' />
          </div>
        </div>
      </section>

      <section className='news'>
        <div className='news_container'>
          <div className='news_header'>
            <div className='news_name'>
              <Typography variant='h1' textTransform='uppercase'>
                <Trans t={t} i18nKey='news.title' />
              </Typography>
              <img className='news_line' src='/assets/images/education/line.svg' />
            </div>
          </div>

          <div className='mass-media'>
            <div className='brands'>
              <img src='/assets/images/news/rbk.svg' />
              <img src='/assets/images/news/lenta.svg' />
              <img src='/assets/images/news/forbes.svg' />
              <img src='/assets/images/news/Tech.svg' />
            </div>
          </div>
        </div>
      </section>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        sx={{
          '& .MuiDialog-paper': {
            py: 4,
            px: 2,
            borderRadius: 0,
            background:
              'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/assets/images/biography/bg.png) center/cover no-repeat',
            height: {
              xs: 'unset',
              sm: 500,
            },
            maxHeight: '100vh',
          },
        }}
      >
        <Container maxWidth='md'>
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 0,
              mb: 2,
            }}
          >
            <Stack>
              <Typography fontWeight='300' fontSize='30' textTransform='uppercase' letterSpacing='0.3em'>
                <Trans t={t} i18nKey='founder.biography.title' />
              </Typography>
              <img className='biography_line' src='/assets/images/education/line.svg' />
            </Stack>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        </Container>
        <Container maxWidth='md' sx={{ overflow: 'overlay' }}>
          <DialogContent sx={{ p: 0 }}>
            {(t('founder.biography.paragraphs', { returnObjects: true }) as string[]).map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </DialogContent>
        </Container>
      </Dialog>
    </main>
  );
};

export default Landing;

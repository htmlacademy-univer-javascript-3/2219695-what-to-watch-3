import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {MainPageProps} from './pages/main/main-page.props.ts';
import {smallFilmsCards} from './mocks/small-films.ts';
import {filmsCards} from './mocks/films.ts';
import {FilmPageProps} from './pages/film/film-page.props.ts';
import {PlayerPageProps} from './pages/player/player-page.props.ts';
import {ReviewPageProps} from './pages/review/review-page.props.ts';

const mainPageProps: MainPageProps = {
  promoFilmCardProps: {
    name: 'The Grand Budapest Hotel',
    genre: 'Drama',
    date: '2014'
  },
  smallFilmsCards,
};

const filmPageProps: FilmPageProps = {
  filmsCards
};

const playerPageProps: PlayerPageProps = {
  filmsCards
};

const reviewPageProps: ReviewPageProps = {
  filmsCards
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      mainPageProps={mainPageProps}
      filmPageProps={filmPageProps}
      playerPageProps={playerPageProps}
      reviewPageProps={reviewPageProps}
    />
  </React.StrictMode>
);

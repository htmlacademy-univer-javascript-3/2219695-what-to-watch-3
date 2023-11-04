import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {smallFilmsCards} from './mocks/small-films.ts';
import {filmsCards} from './mocks/films.ts';
import {FilmPageProps} from './pages/film/film-page.tsx';
import {MainPageProps} from './pages/main/main-page.tsx';
import {PlayerPageProps} from './pages/player/player-page.tsx';
import {ReviewPageProps} from './pages/review/review-page.tsx';
import {Provider} from 'react-redux';
import {store} from './store';

const mainPageProps: MainPageProps = {
  promoFilmCardProps: {
    id: '123',
    name: 'The Grand Budapest Hotel',
    genre: 'Drama',
    date: '2014'
  },
  smallFilmsCards,
};

const filmPageProps: FilmPageProps = {
  filmsCards,
  smallFilmsCards
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
    <Provider store={store}>
      <App
        mainPageProps={mainPageProps}
        filmPageProps={filmPageProps}
        playerPageProps={playerPageProps}
        reviewPageProps={reviewPageProps}
      />
    </Provider>
  </React.StrictMode>
);

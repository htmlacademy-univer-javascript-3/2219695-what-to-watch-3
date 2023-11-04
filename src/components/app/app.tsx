import MainPage, {MainPageProps} from '../../pages/main/main-page.tsx';
import {JSX} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthStatus} from './const.ts';
import LoginPage from '../../pages/login/login-page.tsx';
import FilmPage, {FilmPageProps} from '../../pages/film/film-page.tsx';
import ReviewPage, {ReviewPageProps} from '../../pages/review/review-page.tsx';
import PlayerPage, {PlayerPageProps} from '../../pages/player/player-page.tsx';
import NotFoundPage from '../../pages/not-found/not-found-page.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import MyListPage from '../../pages/my-list/my-list-page.tsx';
import {HelmetProvider} from 'react-helmet-async';

export type AppProps = {
  mainPageProps: MainPageProps;
  filmPageProps: FilmPageProps;
  playerPageProps: PlayerPageProps;
  reviewPageProps: ReviewPageProps;
}

export default function App({mainPageProps, filmPageProps, playerPageProps, reviewPageProps}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage promoFilmCardProps={mainPageProps.promoFilmCardProps}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage/>}
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authStatus={AuthStatus.Auth}>
                <MyListPage/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Film}
            element={<FilmPage filmsCards={filmPageProps.filmsCards}/>}
          />
          <Route
            path={AppRoute.AddReview}
            element={<ReviewPage filmsCards={reviewPageProps.filmsCards}/>}
          />
          <Route
            path={AppRoute.Player}
            element={<PlayerPage filmsCards={playerPageProps.filmsCards}/>}
          />
          <Route
            path={'*'}
            element={<NotFoundPage/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

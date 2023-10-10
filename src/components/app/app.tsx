import MainPage from '../../pages/main/main-page.tsx';
import React from 'react';
import {MainPageProps} from '../../pages/main/main-page.props.ts';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthStatus} from './const.ts';
import LoginPage from '../../pages/login/login-page.tsx';
import FilmPage from '../../pages/film/film-page.tsx';
import ReviewPage from '../../pages/review/review-page.tsx';
import PlayerPage from '../../pages/player/player-page.tsx';
import NotFoundPage from '../../pages/not-found/not-found-page.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import MyListPage from '../../pages/my-list/my-list-page.tsx';
import {HelmetProvider} from 'react-helmet-async';

export default function App({filmCardProps, smallFilmsCards}: MainPageProps): React.JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage filmCardProps={filmCardProps} smallFilmsCards={smallFilmsCards}/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage/>}
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authStatus={AuthStatus.NoAuth}>
                <MyListPage/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Film}
            element={<FilmPage/>}
          />
          <Route
            path={AppRoute.AddReview}
            element={<ReviewPage/>}
          />
          <Route
            path={AppRoute.Player}
            element={<PlayerPage/>}
          />
          <Route
            path={AppRoute.NotFound}
            element={<NotFoundPage/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

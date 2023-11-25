import MainPage from '../../pages/main/main-page.tsx';
import {JSX} from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from './const.ts';
import LoginPage from '../../pages/login/login-page.tsx';
import FilmPage from '../../pages/film/film-page.tsx';
import ReviewPage from '../../pages/review/review-page.tsx';
import PlayerPage from '../../pages/player/player-page.tsx';
import NotFoundPage from '../../pages/not-found/not-found-page.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import MyListPage from '../../pages/my-list/my-list-page.tsx';
import {HelmetProvider} from 'react-helmet-async';
import {useAppSelector} from '../../hooks';
import LoadingPage from '../../pages/loading/loading-page.tsx';
import HistoryRouter from '../history-route/history-route.tsx';
import browserHistory from '../../browser-history.ts';
import {getAuthCheckedStatus, getAuthStatus} from '../../store/user-process/user-process.selectors.ts';
import {getFilmsDataLoadingStatus} from '../../store/wtw-data/wtw-data.selectors.ts';

export default function App(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isFilmsDataLoading = useAppSelector(getFilmsDataLoadingStatus);

  if (!isAuthChecked || isFilmsDataLoading) {
    return (
      <LoadingPage/>
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainPage/>}
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage/>}
          />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authStatus={authStatus}>
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
            path={'*'}
            element={<NotFoundPage/>}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

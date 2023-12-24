import MainPage from '../../pages/main/main-page.tsx';
import {JSX, useEffect} from 'react';
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
import {useAppDispatch, useAppSelector} from '../../hooks';
import LoadingPage from '../../pages/loading/loading-page.tsx';
import {getAuthCheckedStatus, getAuthStatus} from '../../store/user-process/user-process.selectors.ts';
import {
  getFavourites,
  getFilmsDataLoadingStatus
} from '../../store/wtw-data/wtw-data.selectors.ts';
import {fetchFavouritesAction} from '../../store/api-actions.ts';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isFilmsDataLoading = useAppSelector(getFilmsDataLoadingStatus);
  const favourites = useAppSelector(getFavourites);

  useEffect(() => {
    dispatch(fetchFavouritesAction());
  }, [dispatch]);


  if (!isAuthChecked || isFilmsDataLoading) {
    return (
      <LoadingPage/>
    );
  }

  return (
    <HelmetProvider>
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
              <MyListPage favourites={favourites}/>
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
    </HelmetProvider>
  );
}

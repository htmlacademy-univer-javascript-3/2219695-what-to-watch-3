import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {SmallFilm} from '../types/small-film.ts';
import {APIRoute, AppRoute, AuthStatus} from '../components/app/const.ts';
import {
  addReview,
  loadDetailsFilm,
  loadFilms,
  loadReviews, loadSimilarFilms,
  redirectToRoute,
  requireAuth,
  setFilmsDataLoadingStatus
} from './action.ts';
import {AuthData} from '../types/auth-data.ts';
import {UserData} from '../types/user-data.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {Film} from '../types/film.ts';
import {ReviewData} from '../types/reviewData.ts';
import {AddReviewData} from '../types/add-review-data.ts';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoadingStatus(true));
    const {data} = await api.get<SmallFilm[]>(APIRoute.Films);
    dispatch(setFilmsDataLoadingStatus(false));
    dispatch(loadFilms(data));
  },
);

export const fetchDetailsFilmAction = createAsyncThunk<void, {filmId: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchDetailsFilm',
  async ({filmId}, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    dispatch(loadDetailsFilm(data));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, {filmId: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async ({filmId}, {dispatch, extra: api}) => {
    const {data} = await api.get<ReviewData[]>(`${APIRoute.COMMENTS}/${filmId}`);
    dispatch(loadReviews(data));
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<void, {filmId: string}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async ({filmId}, {dispatch, extra: api}) => {
    const {data} = await api.get<SmallFilm[]>(`${APIRoute.Films}/${filmId}/similar`);
    dispatch(loadSimilarFilms(data));
  },
);

export const addReviewAction = createAsyncThunk<void, AddReviewData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/addReview',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<ReviewData>(`${APIRoute.COMMENTS}/${filmId}`, {comment, rating});
    dispatch(addReview(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuth(AuthStatus.Auth));
    } catch {
      dispatch(requireAuth(AuthStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuth(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuth(AuthStatus.NoAuth));
  },
);

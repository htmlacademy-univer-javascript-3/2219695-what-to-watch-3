import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {SmallFilm} from '../types/small-film.ts';
import {APIRoute} from '../components/app/const.ts';
import {redirectToRoute} from './action.ts';
import {AuthData} from '../types/auth-data.ts';
import {UserData} from '../types/user-data.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {Film} from '../types/film.ts';
import {ReviewData} from '../types/reviewData.ts';
import {AddReviewData} from '../types/add-review-data.ts';
import {PromoFilm} from '../types/promo-film.ts';
import {removePromoFilm} from './wtw-data/wtw-data.slice.ts';

export const fetchFilmsAction = createAsyncThunk<SmallFilm[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<SmallFilm[]>(APIRoute.Films);
    return data;
  },
);

export const fetchDetailsFilmAction = createAsyncThunk<Film, {filmId: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchDetailsFilm',
  async ({filmId}, {extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<ReviewData[], {filmId: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async ({filmId}, {extra: api}) => {
    const {data} = await api.get<ReviewData[]>(`${APIRoute.COMMENTS}/${filmId}`);
    return data;
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<SmallFilm[], {filmId: string}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/fetchSimilarFilms',
  async ({filmId}, {extra: api}) => {
    const {data} = await api.get<SmallFilm[]>(`${APIRoute.Films}/${filmId}/similar`);
    return data;
  },
);

export const fetchPromoFilmAction = createAsyncThunk<PromoFilm, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPromoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoFilm>(APIRoute.PROMO);
    return data;
  },
);

export const addReviewAction = createAsyncThunk<ReviewData, AddReviewData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/addReview',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<ReviewData>(`${APIRoute.COMMENTS}/${filmId}`, {comment, rating});
    dispatch(redirectToRoute(`/films/${filmId}`));
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
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
    dispatch(fetchPromoFilmAction());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch,extra: api}) => {
    await api.delete(APIRoute.Logout);
    dispatch(removePromoFilm());
    dropToken();
  },
);

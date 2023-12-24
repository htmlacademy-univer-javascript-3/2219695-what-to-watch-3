import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.ts';
import {AxiosInstance} from 'axios';
import {SmallFilm} from '../types/small-film.ts';
import {APIRoute, AppRoute} from '../components/app/const.ts';
import {redirectToRoute} from './action.ts';
import {AuthData} from '../types/auth-data.ts';
import {UserData} from '../types/user-data.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {Film} from '../types/film.ts';
import {ReviewData} from '../types/reviewData.ts';
import {AddReviewData} from '../types/add-review-data.ts';
import {PromoFilm} from '../types/promo-film.ts';
import {ChangeFavouriteStatusData} from '../types/change-favourite-status-data.ts';

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

export const fetchDetailsFilmAction = createAsyncThunk<Film, {filmId: string; isPromo?: boolean}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchDetailsFilm',
  async ({filmId, isPromo = false}, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    if (isPromo) {
      dispatch(redirectToRoute(`/player/${filmId}`));
    }
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

export const fetchFavouritesAction = createAsyncThunk<SmallFilm[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavourites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<SmallFilm[]>(APIRoute.FAVORITE);
    return data;
  },
);

export const fetchChangeFavouriteStatusAction = createAsyncThunk<Film, ChangeFavouriteStatusData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchChangeFavouriteStatus',
  async ({filmId, status}, {dispatch, extra: api}) => {
    const {data} = await api.post<Film>(`${APIRoute.FAVORITE}/${filmId}/${status}`);
    dispatch(fetchFavouritesAction());
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

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
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
    dispatch(redirectToRoute(AppRoute.Main));
    dropToken();
  },
);

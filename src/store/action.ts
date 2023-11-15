import {createAction} from '@reduxjs/toolkit';
import {Genre} from '../types/genre.ts';
import {SmallFilm} from '../types/small-film.ts';
import {AppRoute, AuthStatus} from '../components/app/const.ts';
import {Film} from '../types/film.ts';
import {ReviewData} from '../types/reviewData.ts';

export const setGenre = createAction<Genre>('genre/setGenre');
export const loadFilms = createAction<SmallFilm[]>('data/loadFilms');
export const loadDetailsFilm = createAction<Film>('data/loadDetailsFilm');
export const loadReviews = createAction<ReviewData[]>('data/loadReviews');
export const loadSimilarFilms = createAction<SmallFilm[]>('data/loadSimilarFilms');
export const requireAuth = createAction<AuthStatus>('user/requireAuth');
export const setFilmsDataLoadingStatus = createAction<boolean>('data/setFilmsDataLoadingStatus');
export const redirectToRoute = createAction<AppRoute>('wtw/redirectToRoute');

export const addReview = createAction<ReviewData>('data/addReview');

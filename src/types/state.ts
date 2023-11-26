import {store} from '../store';
import {AuthStatus} from '../components/app/const.ts';
import {Genre} from './genre.ts';
import {SmallFilm} from './small-film.ts';
import {Film} from './film.ts';
import {ReviewData} from './reviewData.ts';
import {PromoFilm} from './promo-film.ts';

export type UserProcess = {
  authStatus: AuthStatus;
};

export type WtwProcess = {
  genre: Genre;
};

export type WtwData = {
  films: SmallFilm[];
  isFilmsDataLoading: boolean;
  detailsFilm: Film | undefined;
  isDetailsFilmDataLoading: boolean;
  reviews: ReviewData[];
  isReviewsDataLoading: boolean;
  similarFilms: SmallFilm[];
  isSimilarFilmsDataLoading: boolean;
  promoFilm: PromoFilm | undefined;
  isPromoFilmDataLoading: boolean;
  favourites: SmallFilm[];
  isFavouritesDataLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

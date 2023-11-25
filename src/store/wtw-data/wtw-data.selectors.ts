import {State} from '../../types/state.ts';
import {SmallFilm} from '../../types/small-film.ts';
import {NameSpace} from '../../components/app/const.ts';
import {Film} from '../../types/film.ts';
import {ReviewData} from '../../types/reviewData.ts';
import {Genre} from '../../types/genre.ts';
import {PromoFilm} from '../../types/promo-film.ts';

export const getFilms = (state: State): SmallFilm[] => state[NameSpace.Data].films;
export const getFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isFilmsDataLoading;
export const getDetailsFilm = (state: State): Film | undefined => state[NameSpace.Data].detailsFilm;
export const getDetailsFilmDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isDetailsFilmDataLoading;
export const getReviews = (state: State): ReviewData[] => state[NameSpace.Data].reviews;
export const getReviewsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isReviewsDataLoading;
export const getSimilarFilms = (state: State): SmallFilm[] => state[NameSpace.Data].similarFilms;
export const getSimilarFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isSimilarFilmsDataLoading;

export const getPromoFilm = (state: State): PromoFilm | undefined => state[NameSpace.Data].promoFilm;
export const getPromoFilmDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isPromoFilmDataLoading;
export const getGenres = (state: State) => ['All genres', ...new Set(state[NameSpace.Data].films.map((film) => film.genre))] as Genre[];

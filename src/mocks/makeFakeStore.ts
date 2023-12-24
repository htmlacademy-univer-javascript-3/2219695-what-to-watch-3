import {AuthStatus} from '../components/app/const.ts';
import {State} from '../types/state.ts';

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: {
    authStatus: AuthStatus.NoAuth,
    avatarUrl: ''
  },
  DATA: {
    films: [],
    isFilmsDataLoading: false,
    detailsFilm: undefined,
    isDetailsFilmDataLoading: false,
    reviews: [],
    isReviewsDataLoading: false,
    similarFilms: [],
    isSimilarFilmsDataLoading: false,
    promoFilm: undefined,
    isPromoFilmDataLoading: false,
    favourites: [],
    isFavouritesDataLoading: false,
  },
  WTW: {
    genre: 'All genres',
  },
  ...initialState ?? {},
});

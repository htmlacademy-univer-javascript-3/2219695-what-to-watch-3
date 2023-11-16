import {createReducer} from '@reduxjs/toolkit';
import {
  addReview,
  loadDetailsFilm,
  loadFilms,
  loadReviews,
  loadSimilarFilms,
  requireAuth,
  setFilmsDataLoadingStatus,
  setGenre
} from './action.ts';
import {SmallFilm} from '../types/small-film.ts';
import {Genre} from '../types/genre.ts';
import {AuthStatus} from '../components/app/const.ts';
import {Film} from '../types/film.ts';
import {ReviewData} from '../types/reviewData.ts';

type InitialState = {
  genre: Genre;
  films: SmallFilm[];
  authStatus: AuthStatus;
  isFilmsDataLoading: boolean;
  detailsFilm: Film | undefined;
  reviews: ReviewData[];
  similarFilms: SmallFilm[];
}

const initialState: InitialState = {
  genre: 'All genres',
  films: [],
  authStatus: AuthStatus.Unknown,
  isFilmsDataLoading: false,
  detailsFilm: undefined,
  reviews: [],
  similarFilms: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(loadDetailsFilm, (state, action) => {
      state.detailsFilm = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(requireAuth, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(addReview, (state, action) => {
      state.reviews.push(action.payload);
    });
});

export {reducer};

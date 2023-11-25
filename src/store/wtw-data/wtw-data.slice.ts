import {WtwData} from '../../types/state.ts';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../components/app/const.ts';
import {
  addReviewAction,
  fetchDetailsFilmAction,
  fetchFilmsAction, fetchPromoFilmAction,
  fetchReviewsAction,
  fetchSimilarFilmsAction
} from '../api-actions.ts';

const initialState: WtwData = {
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
};

export const wtwData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    removePromoFilm: (state) => {
      state.promoFilm = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsDataLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isFilmsDataLoading = false;
      })
      .addCase(fetchDetailsFilmAction.pending, (state) => {
        state.isDetailsFilmDataLoading = true;
      })
      .addCase(fetchDetailsFilmAction.fulfilled, (state, action) => {
        state.detailsFilm = action.payload;
        state.isDetailsFilmDataLoading = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsDataLoading = false;
      })
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isSimilarFilmsDataLoading = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isSimilarFilmsDataLoading = false;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isPromoFilmDataLoading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isPromoFilmDataLoading = false;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  }
});

export const {removePromoFilm} = wtwData.actions;

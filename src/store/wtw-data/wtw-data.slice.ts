import {WtwData} from '../../types/state.ts';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../components/app/const.ts';
import {
  addReviewAction, fetchChangeFavouriteStatusAction,
  fetchDetailsFilmAction, fetchFavouritesAction,
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
  favourites: [],
  isFavouritesDataLoading: false,
};

export const wtwData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
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
      .addCase(fetchFavouritesAction.pending, (state) => {
        state.isFavouritesDataLoading = true;
      })
      .addCase(fetchFavouritesAction.fulfilled, (state, action) => {
        state.favourites = action.payload;
        state.isFavouritesDataLoading = false;
      })
      .addCase(fetchChangeFavouriteStatusAction.fulfilled, (state, action) => {
        const film = action.payload;
        if (state.detailsFilm) {
          state.detailsFilm.isFavorite = !state.detailsFilm.isFavorite;
        }
        if (!film.isFavorite) {
          state.favourites.filter((favourite) => favourite.id !== film.id);
        }
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  }
});

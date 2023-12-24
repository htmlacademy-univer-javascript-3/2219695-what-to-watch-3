import {describe, expect, it} from 'vitest';
import {wtwData} from './wtw-data.slice.ts';
import {
  addReviewAction,
  fetchChangeFavouriteStatusAction,
  fetchDetailsFilmAction, fetchFavouritesAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchReviewsAction,
  fetchSimilarFilmsAction
} from '../api-actions.ts';
import {smallFilms} from '../../mocks/smallFilms.ts';
import {film} from '../../mocks/film.ts';
import {mockReviews} from '../../mocks/mockReviews.ts';
import {Film} from '../../types/film.ts';
import {ReviewData} from '../../types/reviewData.ts';

describe('WtwData Slice', () => {
  const defaultState = {
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

  describe('Default slice behavior', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = {type: ''};
      const expectedState = defaultState;

      const result = wtwData.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const emptyAction = {type: ''};
      const expectedState = defaultState;

      const result = wtwData.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('Films', () => {
    it('should set "isFilmsDataLoading" to "true" with "fetchFilmsAction.pending"', () => {
      const expectedState = {...defaultState, isFilmsDataLoading: true};

      const result = wtwData.reducer(undefined, fetchFilmsAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "films" to array with films, "isFilmsDataLoading" to "false" with "fetchFilmsAction.fulfilled"', () => {
      const expectedState = {...defaultState, films: smallFilms};

      const result = wtwData.reducer(undefined, fetchFilmsAction.fulfilled(smallFilms, '', undefined));

      expect(result).toEqual(expectedState);
    });
  });

  describe('DetailsFilm', () => {
    it('should set "isDetailsFilmDataLoading" to "true" with "fetchDetailsFilmAction.pending"', () => {
      const expectedState = {...defaultState, isDetailsFilmDataLoading: true};

      const result = wtwData.reducer(undefined, fetchDetailsFilmAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "detailsFilm" to detailsFilm, "isDetailsFilmDataLoading" to "false" with "fetchDetailsFilmAction.fulfilled"', () => {
      const expectedState = {...defaultState, detailsFilm: film};

      const result = wtwData.reducer(undefined, fetchDetailsFilmAction.fulfilled(film, '', {filmId: '1'}));

      expect(result).toEqual(expectedState);
    });
  });

  describe('Reviews', () => {
    it('should set "isReviewsDataLoading" to "true" with "fetchReviewsAction.pending"', () => {
      const expectedState = {...defaultState, isReviewsDataLoading: true};

      const result = wtwData.reducer(undefined, fetchReviewsAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "reviews" to array with reviews, "isReviewsDataLoading" to "false" with "fetchReviewsAction.fulfilled"', () => {
      const expectedState = {...defaultState, reviews: mockReviews};

      const result = wtwData.reducer(undefined, fetchReviewsAction.fulfilled(mockReviews, '', {filmId: '1'}));

      expect(result).toEqual(expectedState);
    });
  });

  describe('SimilarFilms', () => {
    it('should set "isSimilarFilmsDataLoading" to "true" with "fetchSimilarFilmsAction.pending"', () => {
      const expectedState = {...defaultState, isSimilarFilmsDataLoading: true};

      const result = wtwData.reducer(undefined, fetchSimilarFilmsAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "similarFilms" to array with similarFilms, "isSimilarFilmsDataLoading" to "false" with "fetchSimilarFilmsAction.fulfilled"', () => {
      const expectedState = {...defaultState, similarFilms: smallFilms};

      const result = wtwData.reducer(undefined, fetchSimilarFilmsAction.fulfilled(smallFilms, '', {filmId: '1'}));

      expect(result).toEqual(expectedState);
    });
  });

  describe('PromoFilm', () => {
    it('should set "isPromoFilmDataLoading" to "true" with "fetchPromoFilmAction.pending"', () => {
      const expectedState = {...defaultState, isPromoFilmDataLoading: true};

      const result = wtwData.reducer(undefined, fetchPromoFilmAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "promoFilm" to promoFilm, "isPromoFilmDataLoading" to "false" with "fetchPromoFilmAction.fulfilled"', () => {
      const expectedState = {...defaultState, promoFilm: film};

      const result = wtwData.reducer(undefined, fetchPromoFilmAction.fulfilled(film, '', undefined));

      expect(result).toEqual(expectedState);
    });
  });

  describe('Favourites', () => {
    it('should set "isFavouritesDataLoading" to "true" with "fetchFavouritesAction.pending"', () => {
      const expectedState = {...defaultState, isFavouritesDataLoading: true};

      const result = wtwData.reducer(undefined, fetchFavouritesAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "favourites" to array with favourites, "isFavouritesDataLoading" to "false" with "fetchFavouritesAction.fulfilled"', () => {
      const expectedState = {...defaultState, favourites: smallFilms};

      const result = wtwData.reducer(undefined, fetchFavouritesAction.fulfilled(smallFilms, '', undefined));

      expect(result).toEqual(expectedState);
    });
  });

  describe('ChangeFavouriteStatus', () => {
    it('should set "detailsFilm.isFavorite" change status with "fetchChangeFavouriteStatusAction.fulfilled"', () => {
      const filmWithChangeStatus: Film = {...film, isFavorite: true};
      const initialState = {...defaultState, detailsFilm: film};
      const expectedState = {...defaultState, detailsFilm: filmWithChangeStatus};

      const result = wtwData.reducer(initialState, fetchChangeFavouriteStatusAction.fulfilled(filmWithChangeStatus, '', {filmId: '1', status: 1}));

      expect(result).toEqual(expectedState);
    });
  });

  describe('addReview', () => {
    it('should add review in reviews with "addReviewAction.fulfilled"', () => {
      const newReview: ReviewData = {
        id: '3',
        date: '123',
        user: 'TestName3',
        comment: 'TestComment3',
        rating: 5
      };
      const initialState = {...defaultState, reviews: mockReviews};
      const expectedState = {...defaultState, reviews: [...mockReviews, newReview]};

      const result = wtwData.reducer(initialState, addReviewAction.fulfilled(newReview, '', {filmId: '1', comment: 'TestComment3', rating: 5}));

      expect(result).toEqual(expectedState);
    });
  });
});

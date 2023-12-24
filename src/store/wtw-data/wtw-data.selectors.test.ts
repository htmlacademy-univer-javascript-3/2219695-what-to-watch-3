import {describe, expect} from 'vitest';
import {NameSpace} from '../../components/app/const.ts';
import {smallFilms} from '../../mocks/smallFilms.ts';
import {film} from '../../mocks/film.ts';
import {mockReviews} from '../../mocks/mockReviews.ts';
import {mockPromoFilm} from '../../mocks/mockPromoFilm.ts';
import {
  getDetailsFilm,
  getDetailsFilmDataLoadingStatus, getFavourites, getFavouritesDataLoadingStatus,
  getFilms,
  getFilmsDataLoadingStatus, getGenres,
  getPromoFilm, getPromoFilmDataLoadingStatus,
  getReviews,
  getReviewsDataLoadingStatus,
  getSimilarFilms,
  getSimilarFilmsDataLoadingStatus
} from './wtw-data.selectors.ts';
import {mockGenres} from '../../mocks/mockGenres.ts';

describe('WtwData selectors', () => {
  const state = {
    [NameSpace.Data]: {
      films: smallFilms,
      isFilmsDataLoading: true,
      detailsFilm: film,
      isDetailsFilmDataLoading: true,
      reviews: mockReviews,
      isReviewsDataLoading: true,
      similarFilms: smallFilms,
      isSimilarFilmsDataLoading: true,
      promoFilm: mockPromoFilm,
      isPromoFilmDataLoading: true,
      favourites: smallFilms,
      isFavouritesDataLoading: true
    }
  };

  describe('Films', () => {
    it('should return films from state', () => {
      const {films} = state[NameSpace.Data];

      const result = getFilms(state);

      expect(result).toEqual(films);
    });

    it('should return films data loading status', () => {
      const {isFilmsDataLoading} = state[NameSpace.Data];

      const result = getFilmsDataLoadingStatus(state);

      expect(result).toBe(isFilmsDataLoading);
    });
  });

  describe('DetailsFilm', () => {
    it('should return detailsFilm from state', () => {
      const {detailsFilm} = state[NameSpace.Data];

      const result = getDetailsFilm(state);

      expect(result).toEqual(detailsFilm);
    });

    it('should return detailsFilm data loading status', () => {
      const {isDetailsFilmDataLoading} = state[NameSpace.Data];

      const result = getDetailsFilmDataLoadingStatus(state);

      expect(result).toBe(isDetailsFilmDataLoading);
    });
  });

  describe('Reviews', () => {
    it('should return reviews from state', () => {
      const {reviews} = state[NameSpace.Data];

      const result = getReviews(state);

      expect(result).toEqual(reviews);
    });

    it('should return reviews data loading status', () => {
      const {isReviewsDataLoading} = state[NameSpace.Data];

      const result = getReviewsDataLoadingStatus(state);

      expect(result).toBe(isReviewsDataLoading);
    });
  });

  describe('SimilarFilms', () => {
    it('should return similarFilms from state', () => {
      const {similarFilms} = state[NameSpace.Data];

      const result = getSimilarFilms(state);

      expect(result).toEqual(similarFilms);
    });

    it('should return similarFilms data loading status', () => {
      const {isSimilarFilmsDataLoading} = state[NameSpace.Data];

      const result = getSimilarFilmsDataLoadingStatus(state);

      expect(result).toBe(isSimilarFilmsDataLoading);
    });
  });

  describe('PromoFilm', () => {
    it('should return promoFilm from state', () => {
      const {promoFilm} = state[NameSpace.Data];

      const result = getPromoFilm(state);

      expect(result).toEqual(promoFilm);
    });

    it('should return promoFilm data loading status', () => {
      const {isPromoFilmDataLoading} = state[NameSpace.Data];

      const result = getPromoFilmDataLoadingStatus(state);

      expect(result).toBe(isPromoFilmDataLoading);
    });
  });

  describe('Favourites', () => {
    it('should return favourites from state', () => {
      const {favourites} = state[NameSpace.Data];

      const result = getFavourites(state);

      expect(result).toEqual(favourites);
    });

    it('should return favourites data loading status', () => {
      const {isFavouritesDataLoading} = state[NameSpace.Data];

      const result = getFavouritesDataLoadingStatus(state);

      expect(result).toBe(isFavouritesDataLoading);
    });
  });

  describe('Genres', () => {
    it('should return genres from state', () => {
      const genres = mockGenres;

      const result = getGenres(state);

      expect(result).toEqual(genres);
    });
  });
});

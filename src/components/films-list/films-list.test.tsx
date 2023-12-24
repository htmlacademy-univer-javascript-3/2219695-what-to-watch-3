import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import {expect} from 'vitest';
import FilmsList from './films-list.tsx';
import {makeFakeStore} from '../../utils/makeFakeStore.ts';
import {AuthStatus} from '../app/const.ts';
import {smallFilms} from '../../mocks/smallFilms.ts';

describe('FilmsList', () => {
  const defaultDATA = {
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

  it('should render correctly with genre = "All genres", filmId = "undefined"', () => {
    const {withStoreComponent} = withStore(<FilmsList />, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, films: smallFilms}
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('allGenresFilmsContainer')).toBeInTheDocument();
  });

  it('should render correctly with genre = "All genres", filmId = "1"', () => {
    const {withStoreComponent} = withStore(<FilmsList filmId={'1'}/>, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, films: smallFilms}
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('similarFilmsContainer')).toBeInTheDocument();
  });

  it('should render correctly with genre = "Comedy", filmId = "undefined"', () => {
    const {withStoreComponent} = withStore(<FilmsList genre={'Comedy'}/>, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, films: smallFilms}
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('filmsByGenreContainer')).toBeInTheDocument();
  });
});

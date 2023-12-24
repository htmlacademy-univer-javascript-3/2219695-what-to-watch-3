import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {AppRoute, AuthStatus} from '../app/const.ts';
import {makeFakeStore} from '../../mocks/makeFakeStore.ts';
import {mockPromoFilm} from '../../mocks/mockPromoFilm.ts';
import {createMemoryHistory} from 'history';
import MyListButton from './my-list-button.tsx';
import {film} from '../../mocks/film.ts';

describe('MyListButton', () => {
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

  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.Main);
  });

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<MyListButton/>, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, detailsFilm: film}
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render correctly with isPromo = "true"', () => {
    const {withStoreComponent} = withStore(<MyListButton isPromo/>, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, promoFilm: mockPromoFilm}
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });
});

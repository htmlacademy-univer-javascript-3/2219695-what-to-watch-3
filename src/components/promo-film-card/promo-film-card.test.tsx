import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {AppRoute, AuthStatus} from '../app/const.ts';
import {makeFakeStore} from '../../utils/makeFakeStore.ts';
import PromoFilmCard from './promo-film-card.tsx';
import {mockPromoFilm} from '../../mocks/mockPromoFilm.ts';
import {createMemoryHistory} from 'history';

describe('PromoFilmCard', () => {
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
    const {withStoreComponent} = withStore(<PromoFilmCard/>, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, promoFilm: mockPromoFilm}
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockPromoFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockPromoFilm.released)).toBeInTheDocument();
    expect(screen.getByText(mockPromoFilm.genre)).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });
});

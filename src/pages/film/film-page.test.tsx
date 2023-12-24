import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {makeFakeStore} from '../../mocks/makeFakeStore.ts';
import {createMemoryHistory} from 'history';
import FilmPage from './film-page.tsx';
import {AppRoute, AuthStatus} from '../../components/app/const.ts';
import {film} from '../../mocks/film.ts';

describe('Film page', () => {
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
    mockHistory.push(AppRoute.Film);
  });

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<FilmPage/>, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, detailsFilm: film}
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('WTW')).toBeInTheDocument();
    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.released)).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});

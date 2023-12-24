import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {AppRoute, AuthStatus} from '../app/const.ts';
import {makeFakeStore} from '../../utils/makeFakeStore.ts';
import PromoFilmCard from './promo-film-card.tsx';
import {mockPromoFilm} from '../../mocks/mockPromoFilm.ts';
import {smallFilms} from '../../mocks/smallFilms.ts';
import {createMemoryHistory} from 'history';

describe('PromoFilmCard', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.Main);
  });

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(
      <PromoFilmCard
        id={mockPromoFilm.id}
        name={mockPromoFilm.name}
        genre={mockPromoFilm.genre}
        backgroundImage={mockPromoFilm.backgroundImage}
        released={mockPromoFilm.released}
        posterImage={mockPromoFilm.posterImage}
        favourites={smallFilms}
      />, makeFakeStore({
        USER: {authStatus: AuthStatus.Auth, avatarUrl: ''}
      })
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(mockPromoFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockPromoFilm.released)).toBeInTheDocument();
    expect(screen.getByText(mockPromoFilm.genre)).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('should render button "My list" with authStatus = "Auth"', () => {
    const {withStoreComponent} = withStore(
      <PromoFilmCard
        id={mockPromoFilm.id}
        name={mockPromoFilm.name}
        genre={mockPromoFilm.genre}
        backgroundImage={mockPromoFilm.backgroundImage}
        released={mockPromoFilm.released}
        posterImage={mockPromoFilm.posterImage}
        favourites={smallFilms}
      />, makeFakeStore({
        USER: {authStatus: AuthStatus.Auth, avatarUrl: ''}
      })
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should not render button "My list" with authStatus = "NoAuth"', () => {
    const {withStoreComponent} = withStore(
      <PromoFilmCard
        id={mockPromoFilm.id}
        name={mockPromoFilm.name}
        genre={mockPromoFilm.genre}
        backgroundImage={mockPromoFilm.backgroundImage}
        released={mockPromoFilm.released}
        posterImage={mockPromoFilm.posterImage}
        favourites={smallFilms}
      />, makeFakeStore({
        USER: {authStatus: AuthStatus.NoAuth, avatarUrl: ''}
      })
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.queryByText('My list')).not.toBeInTheDocument();
  });
});

import {render, screen} from '@testing-library/react';
import {MemoryHistory, createMemoryHistory} from 'history';
import App from './app';
import {withHistory, withStore} from '../../utils/mock-component';
import {makeFakeStore} from '../../utils/makeFakeStore.ts';
import {AppRoute, AuthStatus} from './const.ts';
import {film} from '../../mocks/film.ts';
import {expect} from 'vitest';
import {mockReviews} from '../../mocks/mockReviews.ts';

describe('Application Routing', () => {
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

  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId('mainPageContainer')).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByText('Email address')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('should render "MyListPage" when user navigate to "/my-list"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''}
    }));
    mockHistory.push(AppRoute.MyList);

    render(withStoreComponent);

    expect(screen.getByTestId('userCatalog')).toBeInTheDocument();
  });

  it('should render "FilmPage" when user navigate to "/films/:id"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, detailsFilm: film}
    }));
    mockHistory.push('/films/1');

    render(withStoreComponent);

    expect(screen.getByTestId('filmCardContainer')).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('should render "ReviewPage" when user navigate to "/films/:id/review"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, detailsFilm: film, reviews: mockReviews}
    }));
    mockHistory.push('/films/1/review');

    render(withStoreComponent);

    expect(screen.getByTestId('reviewContainer')).toBeInTheDocument();
  });

  it('should render "PlayerPage" when user navigate to "/player/:id"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, detailsFilm: film}
    }));
    mockHistory.push('/player/:id');

    render(withStoreComponent);

    expect(screen.getByTestId('playerContainer')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByTestId('logo-test')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Упссс... Похоже, что такого фильма ещё не сняли.')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});

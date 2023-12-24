import {describe, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {makeFakeStore} from '../../mocks/makeFakeStore.ts';
import userEvent from '@testing-library/user-event';
import PlayerPage from './player-page.tsx';
import {AuthStatus} from '../../components/app/const.ts';
import {film} from '../../mocks/film.ts';
import {mockPromoFilm} from '../../mocks/mockPromoFilm.ts';

describe('Player page', () => {
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

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<PlayerPage/>, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, detailsFilm: film, promoFilm: mockPromoFilm}
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getByText('Transpotting')).toBeInTheDocument();
    expect(screen.getByText('Full screen')).toBeInTheDocument();
  });

  it('should play video when user click play button', async () => {
    const {withStoreComponent} = withStore(<PlayerPage/>, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, detailsFilm: film, promoFilm: mockPromoFilm}
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    HTMLVideoElement.prototype.play = vi.fn();
    await userEvent.click(
      screen.getByTestId('playButton')
    );

    expect(HTMLVideoElement.prototype.play).toBeCalledTimes(1);
    expect(screen.getByTestId('pauseButton')).toBeInTheDocument();
    expect(screen.queryByTestId('playButton')).not.toBeInTheDocument();
  });

  it('should pause video when user click pause button', async () => {
    const {withStoreComponent} = withStore(<PlayerPage/>, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, detailsFilm: film, promoFilm: mockPromoFilm}
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    HTMLVideoElement.prototype.play = vi.fn();
    HTMLVideoElement.prototype.pause = vi.fn();

    await userEvent.click(
      screen.getByTestId('playButton')
    );
    await userEvent.click(
      screen.getByTestId('pauseButton')
    );

    expect(HTMLVideoElement.prototype.pause).toBeCalledTimes(1);
    expect(screen.getByTestId('playButton')).toBeInTheDocument();
    expect(screen.queryByTestId('pauseButton')).not.toBeInTheDocument();
  });

  it('should full screen video when user click fullScreen button', async () => {
    const {withStoreComponent} = withStore(<PlayerPage/>, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, detailsFilm: film, promoFilm: mockPromoFilm}
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    HTMLVideoElement.prototype.requestFullscreen = vi.fn();
    await userEvent.click(
      screen.getByTestId('fullScreenButton')
    );

    expect(HTMLVideoElement.prototype.requestFullscreen).toBeCalledTimes(1);
  });
});

import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {makeFakeStore} from '../../utils/makeFakeStore.ts';
import {AuthStatus} from '../../components/app/const.ts';
import {film} from '../../mocks/film.ts';
import ReviewPage from './review-page.tsx';

describe('Review page', () => {
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
    const {withStoreComponent} = withStore(<ReviewPage/>, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''},
      DATA: {...defaultDATA, detailsFilm: film}
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('WTW')).toBeInTheDocument();
    expect(screen.getByTestId('reviewPageContainer')).toBeInTheDocument();
  });
});

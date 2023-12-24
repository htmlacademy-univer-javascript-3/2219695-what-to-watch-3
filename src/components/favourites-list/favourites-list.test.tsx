import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import FavouritesList from './favourites-list.tsx';
import {smallFilms} from '../../mocks/smallFilms.ts';
import {expect} from 'vitest';

describe('FavouriteList', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<FavouritesList favourites={smallFilms}/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('favouritesContainer')).toBeInTheDocument();
  });
});

import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import {expect} from 'vitest';
import {makeFakeStore} from '../../mocks/makeFakeStore.ts';
import GenresList from './genres-list.tsx';
import {mockGenres} from '../../mocks/mockGenres.ts';
import userEvent from '@testing-library/user-event';
import {extractActionsTypes} from '../../mocks/extractActionsTypes.ts';
import {setGenre} from '../../store/wtw-process/wtw-process.slice.ts';

describe('GenresList', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<GenresList genres={mockGenres}/>, makeFakeStore({
      WTW: {genre: 'All genres'}
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('genreCatalog')).toBeInTheDocument();
    expect(screen.getAllByTestId('genreItem').length).toBe(mockGenres.length);
  });

  it('should set genre "Comedy" with user click genre item = "Comedy"', async () => {
    const {withStoreComponent, mockStore} = withStore(<GenresList genres={mockGenres}/>, makeFakeStore({
      WTW: {genre: 'All genres'}
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.click(
      screen.getAllByTestId('genreItemLink')[1],
    );

    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      setGenre.type
    ]);
  });
});

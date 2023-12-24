import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../utils/mock-component.tsx';
import {makeFakeStore} from '../../utils/makeFakeStore.ts';
import {smallFilms} from '../../mocks/smallFilms.ts';
import {AuthStatus} from '../../components/app/const.ts';
import MyListPage from './my-list-page.tsx';

describe('MyList page', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(
      <MyListPage favourites={smallFilms}/>, makeFakeStore({
        USER: {authStatus: AuthStatus.Auth, avatarUrl: ''}
      }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('myListPageContainer')).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});

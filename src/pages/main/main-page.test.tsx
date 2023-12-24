import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {makeFakeStore} from '../../mocks/makeFakeStore.ts';
import MainPage from './main-page.tsx';
import {AuthStatus} from '../../components/app/const.ts';

describe('Main page', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(
      <MainPage/>, makeFakeStore({
        USER: {authStatus: AuthStatus.Auth, avatarUrl: ''}
      }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('mainPageContainer')).toBeInTheDocument();
  });
});

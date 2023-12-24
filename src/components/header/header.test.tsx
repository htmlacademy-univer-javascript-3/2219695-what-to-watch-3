import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import {expect} from 'vitest';
import {makeFakeStore} from '../../mocks/makeFakeStore.ts';
import Header from './header.tsx';
import {AppRoute, AuthStatus} from '../app/const.ts';
import {Route, Routes} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';

describe('Header', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.Main);
  });

  it('should render correctly with authStatus = "Auth"', () => {
    const {withStoreComponent} = withStore(<Header/>, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''}
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('testLogo')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should render correctly with authStatus = "NoAuth"', () => {
    const {withStoreComponent} = withStore(<Header/>, makeFakeStore({
      USER: {authStatus: AuthStatus.NoAuth, avatarUrl: ''}
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('testLogo')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should redirect to login route when user click "Sign in"', async () => {
    const expectedText = 'login page';
    const mockLoginRouteComponent = <span>{expectedText}</span>;
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Main} element={<Header />} />
        <Route path={AppRoute.Login} element={mockLoginRouteComponent} />
      </Routes>,
      mockHistory
    );
    const {withStoreComponent} = withStore(componentWithHistory, makeFakeStore({
      USER: {authStatus: AuthStatus.NoAuth, avatarUrl: ''}
    }));

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId('loginLink'));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

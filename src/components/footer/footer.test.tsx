import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import Footer from './footer.tsx';
import {createMemoryHistory} from 'history';
import {AppRoute, AuthStatus} from '../app/const.ts';
import {Route, Routes} from 'react-router-dom';
import {makeFakeStore} from '../../mocks/makeFakeStore.ts';
import userEvent from '@testing-library/user-event';


describe('Footer', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.MyList);
  });

  it('should render correctly', () => {
    render(withHistory(<Footer/>));

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
  });

  it('should redirect to main route when user click logo', async () => {
    const expectedText = 'main page';
    const mockMainRouteComponent = <span>{expectedText}</span>;
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.MyList} element={<Footer/>} />
        <Route path={AppRoute.Main} element={mockMainRouteComponent} />
      </Routes>,
      mockHistory
    );
    const {withStoreComponent} = withStore(componentWithHistory, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''}
    }));

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId('logoLink'));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

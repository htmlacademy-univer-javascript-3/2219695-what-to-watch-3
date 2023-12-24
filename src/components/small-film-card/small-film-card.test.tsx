import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {AppRoute, AuthStatus} from '../app/const.ts';
import {Route, Routes} from 'react-router-dom';
import {makeFakeStore} from '../../mocks/makeFakeStore.ts';
import userEvent from '@testing-library/user-event';
import {smallFilms} from '../../mocks/smallFilms.ts';
import {createMemoryHistory} from 'history';
import SmallFilmCard from './small-film-card.tsx';

describe('SmallFilmCard', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.Main);
  });

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(
      <SmallFilmCard
        id={smallFilms[0].id}
        name={smallFilms[0].name}
        previewImage={smallFilms[0].previewImage}
        previewVideoLink={smallFilms[0].previewVideoLink}
        isActiveCard={smallFilms[0].id}
      />, makeFakeStore({
        USER: {authStatus: AuthStatus.Auth, avatarUrl: ''}
      })
    );

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(smallFilms[0].name)).toBeInTheDocument();
  });

  it('should redirect to film route when user click card', async () => {
    const expectedText = 'film page';
    const mockFilmRouteComponent = <span>{expectedText}</span>;
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Main} element={
          <SmallFilmCard
            id={smallFilms[0].id}
            name={smallFilms[0].name}
            previewImage={smallFilms[0].previewImage}
            previewVideoLink={smallFilms[0].previewVideoLink}
            isActiveCard={smallFilms[0].id}
          />
        }
        />
        <Route path={AppRoute.Film} element={mockFilmRouteComponent} />
      </Routes>,
      mockHistory
    );
    const {withStoreComponent} = withStore(componentWithHistory, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''}
    }));

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId('filmCard'));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

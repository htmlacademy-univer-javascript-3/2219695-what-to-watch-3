import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {AuthStatus} from '../app/const.ts';
import {makeFakeStore} from '../../mocks/makeFakeStore.ts';
import ReviewForm from './review-form.tsx';
import userEvent from '@testing-library/user-event';

describe('ReviewForm', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<ReviewForm filmId={'1'}/>, makeFakeStore({
      USER: {authStatus: AuthStatus.Auth, avatarUrl: ''}
    }));

    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId('reviewForm')).toBeInTheDocument();
    expect(screen.getByText('Post')).toBeInTheDocument();
  });

  it('should render correctly when user enter comment', async () => {
    const { withStoreComponent } = withStore(<ReviewForm filmId={'1'}/>, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId('commentField'),
      'testComment',
    );

    expect(screen.getByDisplayValue('testComment')).toBeInTheDocument();
  });
});

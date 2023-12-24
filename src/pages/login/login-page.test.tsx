import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {withHistory, withStore} from '../../utils/mock-component';
import LoginPage from './login-page.tsx';

describe('Login page', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<LoginPage />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Email address')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const { withStoreComponent } = withStore(<LoginPage />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId('loginElement'),
      'test@mail.ru',
    );
    await userEvent.type(
      screen.getByTestId('passwordElement'),
      '123Ab',
    );

    expect(screen.getByDisplayValue('test@mail.ru')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123Ab')).toBeInTheDocument();
  });
});

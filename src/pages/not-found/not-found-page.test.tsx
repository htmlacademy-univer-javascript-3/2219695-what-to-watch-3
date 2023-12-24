import {describe, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import {withHistory} from '../../utils/mock-component.tsx';
import NotFoundPage from './not-found-page.tsx';

describe('Not Found Page', () => {
  it('should render correctly', () => {
    render(withHistory(<NotFoundPage/>));

    expect(screen.getByTestId('logo-test')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Упссс... Похоже, что такого фильма ещё не сняли.')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});

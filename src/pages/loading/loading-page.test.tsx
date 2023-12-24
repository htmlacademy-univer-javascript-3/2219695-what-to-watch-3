import {render, screen} from '@testing-library/react';
import LoadingPage from './loading-page.tsx';

describe('Loading page', () => {
  it('should render correct', () => {
    const expectedText = /Loading/i;

    render(<LoadingPage />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

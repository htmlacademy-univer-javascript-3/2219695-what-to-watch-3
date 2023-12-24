import {render, screen} from '@testing-library/react';
import ShowMoreButton from './show-more-button.tsx';

describe('ShowMoreButton', () => {
  it('should render correct', () => {
    render(<ShowMoreButton />);

    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });
});

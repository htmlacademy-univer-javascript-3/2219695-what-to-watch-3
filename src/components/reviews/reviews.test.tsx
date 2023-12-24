import {render, screen} from '@testing-library/react';
import Reviews from './reviews.tsx';
import {mockReviews} from '../../mocks/mockReviews.ts';

describe('Reviews', () => {
  it('should render correct', () => {
    render(<Reviews reviews={mockReviews} />);

    expect(screen.getByTestId('reviews-container')).toBeInTheDocument();
    expect(screen.getByText(mockReviews[0].comment)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[1].comment)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[2].comment)).toBeInTheDocument();
  });
});

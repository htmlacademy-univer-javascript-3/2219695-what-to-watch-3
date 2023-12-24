import {render, screen} from '@testing-library/react';
import Review from './review.tsx';
import {expect} from 'vitest';
import {mockReviews} from '../../mocks/mockReviews.ts';
import {getDate} from '../../utils/getDate.ts';

describe('Review', () => {
  it('should render correct', () => {
    render(
      <Review
        date={mockReviews[0].date}
        user={mockReviews[0].user}
        comment={mockReviews[0].comment}
        rating={mockReviews[0].rating}
      />
    );

    expect(screen.getByText(getDate(mockReviews[0].date))).toBeInTheDocument();
    expect(screen.getByText(mockReviews[0].user)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[0].comment)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[0].rating)).toBeInTheDocument();
  });
});
